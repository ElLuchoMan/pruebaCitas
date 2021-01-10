import { UsuarioService } from './../../shared/service/usuario.service';
import { UiService } from '@core/service/ui.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from '@feature/usuario/shared/model/usuario';

@Component({
  selector: 'app-guardar-usuario',
  templateUrl: './guardar-usuario.component.html',
  styleUrls: []
})
export class GuardarUsuarioComponent implements OnInit, OnDestroy {
  private curId!: number;
  private subscripciones: Subscription[] = [];
  usuarioForm!: FormGroup;
  isUpdate = false;
  isWaiting = false;

  constructor(private activatedRoute: ActivatedRoute, private uiService: UiService, private service: UsuarioService) { }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.subscripciones.push(this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      if (id && id !== '0') {
        this.obtenerPorID(parseInt(id, 10));
      }
    }));
    this.subscripciones.push(this.uiService.loadingState.subscribe(state => this.isWaiting = state));
  }

  iniciarFormulario(): void {
    this.usuarioForm = new FormGroup({
      idPersona: new FormControl({ value: '', disabled: true }),
      identificacion: new FormControl('', [Validators.required, Validators.pattern('\\d{7,10}')]),
      nombre: new FormControl('', [Validators.required]),
      apellido1: new FormControl('', [Validators.required]),
      apellido2: new FormControl('', [Validators.pattern('[A-Za-z]*')]),
      telefonoContacto: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern('([3]\\d{9})|(\\d{7})')]),
	  facultad: new FormControl ('',[Validators.required]),
	  proyectoCurricular: new FormControl ('',[Validators.required]),
	});
    this.usuarioForm.markAsTouched();
  }

  private obtenerPorID(id: number): void {
    this.service.consultarPorId(id)
      .then(res => this.setForm(res))
      .catch(err => this.service.mostrarError(err)
      );
  }

  private setForm(usuario: Usuario): void {
    this.curId = usuario.idUsuario;
    this.isUpdate = true;
    this.usuarioForm.setValue({
      idPersona: usuario.idUsuario,
      identificacion: usuario.identificacion,
      nombre: usuario.nombre,
      apellido1: usuario.apellido1,
      apellido2: usuario.apellido2,
      telefonoContacto: usuario.telefonoContacto,
	  facultad: usuario.facultad,
	  proyectoCurricular: usuario.proyectoCurricular,
    });
  }

  goBack(): void {
    const data = {
      title: '¿Cancelar progreso?',
      message: 'Si vuelves perderás los avances del formulario de ingreso',
      confirm: 'Sí, deseo regresar'
    };
    const dialogRef = this.uiService.mostrarConfirmDialog(data);
    this.subscripciones.push(dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.service.volverAListar();
      }
    }));
  }

  onSubmit(): void {
    if (this.curId && this.curId !== 0) {
      this.service.modificar(this.usuarioForm.value, this.curId);
    } else {
      this.service.crear(this.usuarioForm.value);
    }
  }

  ngOnDestroy(): void {
    if (this.subscripciones) { this.subscripciones.forEach(sub => sub.unsubscribe()); }
  }

}
