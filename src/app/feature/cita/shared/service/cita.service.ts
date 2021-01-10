import { TipoCita } from '@feature/tipo-cita/shared/model/tipo-cita';
import { ComandoCita } from './../model/comando-cita';
import { Observable } from 'rxjs';
import { UiService } from '@core/service/ui.service';
import { TipoCitaService } from '@feature/tipo-cita/shared/service/tipo-cita.service';
import { EspecialistaService } from '@feature/especialista/shared/service/especialista.service';
import { AppConstants as Constant } from '@shared/app.constants';
import { HttpService } from '@core/service/http.service';
import { Injectable } from '@angular/core';
import { Cita } from '../model/cita';
import { Especialista } from '@feature/especialista/shared/model/especialista';

@Injectable()
export class CitaService {

  private comandoPath = Constant.PATH_CITA + '/asignar';
  private consultaPath = 'consulta/' + Constant.PATH_CITA;

  constructor(
    private httpService: HttpService,
    private especialistaService: EspecialistaService,
    private tipoCitaService: TipoCitaService,
    private uiService: UiService
  ) { }

  consultar(): Observable<Cita[]> {
    return this.httpService.getRequest<Cita[]>(this.consultaPath);
  }

  asignar(data: ComandoCita): void {
    this.uiService
      .configurarSnackBar(this.httpService.postRequest(this.comandoPath, data), 'Se ha asignado cita con éxito')
      .subscribe((exito) => {
        if (exito) {
          this.volverAListar();
        }
      });
  }


  obtenerMedicos(): Observable<Especialista[]> {
    return this.especialistaService.consultar();
  }

  obtenerTiposCitas(): Observable<TipoCita[]> {
    return this.tipoCitaService.consultar();
  }

  mostrarError(err: any): void {
    const message = err.error ? err.error.mensaje : 'No se han podido obtener datos';
    this.uiService.mostrarError({
      title: '¡Error!',
      message: 'No se han encontrado datos',
      confirm: 'Ok',
    });
    this.volverAListar();
  }

  volverAListar(): void {
    this.uiService.volverAListar('citas');
  }

}
