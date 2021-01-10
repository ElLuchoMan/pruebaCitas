import { TipoCita } from '@feature/tipo-cita/shared/model/tipo-cita';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UiService } from '@core/service/ui.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CitaService } from '@feature/cita/shared/service/cita.service';
import { Subscription } from 'rxjs';
import { Especialista } from '@feature/especialista/shared/model/especialista';
import { Moment } from 'moment';

@Component({
  selector: 'app-asignar-cita',
  templateUrl: './asignar-cita.component.html',
  styleUrls: ['./asignar-cita.component.css'],

  
})
export class AsignarCitaComponent implements OnInit, OnDestroy {

  private subscripciones: Subscription[] = [];
  citaForm!: FormGroup;
  isWaiting = false;
  minDate = new Date();
  

  // variables para los listados de objetos
  especialista: Especialista[] = [];
  tiposCita: TipoCita[] = [];

  constructor(
    private uiService: UiService,
    private service: CitaService
  ) {}

  ngOnInit(): void {
    this.iniciarFormulario();
    this.obtenerTiposCita();
    this.obtenerEspecialistas();
    this.subscripciones.push(
    this.uiService.loadingState.subscribe((state) => (this.isWaiting = state)));
   
  
  }//Limitar la semana
  semana = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  }

  iniciarFormulario(): void {
    this.citaForm = new FormGroup({
      codigoCita: new FormControl({ value: '', disabled: true }),
      fechaCita: new FormControl('', [Validators.required]),
      horaCita: new FormControl('', [Validators.required]),
      idEspecialista: new FormControl('', [Validators.required]),
      idTipoCita: new FormControl('', [Validators.required]),
    });
    this.citaForm.markAsTouched();
  }

  private obtenerTiposCita(): void {
    this.subscripciones.push(this.service.obtenerTiposCitas().subscribe(list => this.tiposCita = list));
  }
  private obtenerEspecialistas(): void {
    this.subscripciones.push(this.service.obtenerMedicos().subscribe(list => this.especialista = list));
  }

  goBack(): void {
    const data = {
      title: '¿Cancelar progreso?',
      message: 'Si vuelves perderás los avances',
      confirm: 'Sí, deseo regresar',
    };
    const dialogRef = this.uiService.mostrarConfirmDialog(data);
    this.subscripciones.push(
      dialogRef.afterClosed().subscribe((resultado) => {
        if (resultado) {
          this.service.volverAListar();
        }
      })
    );
  }

  onSubmit(): void {
    const cita = this.citaForm.value;
    const fechaCita: Moment = cita.fechaCita;
    let hora: string = cita.horaCita;
    hora = hora.split(':',1)[0];
    fechaCita.add(parseInt(hora, 10), 'hours');
    this.service.asignar(cita);
  }

  ngOnDestroy(): void {
    if (this.subscripciones) {
      this.subscripciones.forEach((sub) => sub.unsubscribe());
    }
  }
}
