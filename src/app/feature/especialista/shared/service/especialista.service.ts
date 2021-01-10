import { Especialista } from './../model/especialista';
import { Observable } from 'rxjs';
import { UiService } from '@core/service/ui.service';
import { HttpService } from '@core/service/http.service';
import { AppConstants as Constant } from '@shared/app.constants';
import { Injectable } from '@angular/core';

@Injectable()
export class EspecialistaService {

  private comandoPath = 'operador/' + Constant.PATH_ESPECIALISTA;
  private consultaPath = 'consulta/' + Constant.PATH_ESPECIALISTA;


  constructor(private httpService: HttpService, private uiService: UiService) { }

  consultar(): Observable<Especialista[]> {
    return this.httpService.getRequest<Especialista[]>(this.consultaPath);
  }

  consultarPorId(id: number): Promise<Especialista> {
    return this.httpService
      .getRequest<Especialista>(`${this.consultaPath}/${id}`)
      .toPromise();
  }

  crear(data: Especialista): void {
    this.uiService
      .configurarSnackBar(this.httpService.postRequest(this.comandoPath, data), 'Se ha creado especialista con éxito')
      .subscribe((exito) => {
        if (exito) {
          this.volverAListar();
        }
      });
  }

  modificar(data: Especialista, idEspecialista: number): void {
    this.uiService
      .configurarSnackBar(
        this.httpService.putRequest(`${this.comandoPath}/${idEspecialista}`, data), 'Se ha modificado especialista con éxito'
      ).subscribe((exito) => {
        if (exito) {
          this.volverAListar();
        }
      });
  }

  mostrarError(err: any): void {
    const message = err.error ? err.error.mensaje : 'No se han podido obtener datos';
    this.uiService.mostrarError({
      title: '¡Error!',
      message:'No se han encontrado datos',
      confirm: 'Ok',
    });
    this.volverAListar();
  }

  volverAListar(): void {
    this.uiService.volverAListar('especialistas');
  }
}
