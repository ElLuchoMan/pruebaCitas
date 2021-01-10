import { TipoCita } from './../../shared/model/tipo-cita';
import { TipoCitaService } from '@feature/tipo-cita/shared/service/tipo-cita.service';
import { UiService } from '@core/service/ui.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-guardar-tipo-cita',
  templateUrl: './guardar-tipo-cita.component.html',
  styleUrls: []
})
export class GuardarTipoCitaComponent implements OnInit, OnDestroy {

  private curId!: number;
  private subscripciones: Subscription[] = [];
  tipoForm!: FormGroup;
  isUpdate = false;
  isWaiting = false;

  constructor(private activatedRoute: ActivatedRoute, private uiService: UiService, private service: TipoCitaService) { }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.subscripciones.push(this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      if (id && id !== '0') {
        this.obtenerTipo(parseInt(id, 10));
      }
    }));
    this.subscripciones.push(this.uiService.loadingState.subscribe(state => this.isWaiting = state));
  }

  iniciarFormulario(): void {
    this.tipoForm = new FormGroup({
      idTipoCita: new FormControl({ value: '', disabled: true }),
      nombre: new FormControl('', [Validators.required]),
      sede: new FormControl('',[Validators.required]),
      descripcionBreve: new FormControl('', [Validators.maxLength(255)]),
    });
    this.tipoForm.markAsTouched();
  }

  private obtenerTipo(id: number): void {
    this.service.consultarPorId(id)
      .then(res => this.setForm(res))
      .catch(err => this.service.mostrarError(err)
      );
  }

  private setForm(tipo: TipoCita): void {
    this.curId = tipo.idTipoCita;
    this.isUpdate = true;
    this.tipoForm.setValue({
      idTipoCita: tipo.idTipoCita,
      nombre: tipo.nombre,
      sede: tipo.sede,
      descripcionBreve: tipo.descripcionBreve,
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
      this.service.modificar(this.tipoForm.value, this.curId);
    } else {
      this.service.crear(this.tipoForm.value);
    }
  }

  ngOnDestroy(): void {
    if (this.subscripciones) { this.subscripciones.forEach(sub => sub.unsubscribe()); }
  }

}
