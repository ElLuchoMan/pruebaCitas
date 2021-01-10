import { UiService } from '@core/service/ui.service';
import { HttpService } from '@core/service/http.service';
import { Injectable } from '@angular/core';
import { AppConstants as Constant } from '@shared/app.constants';
import { TipoCita } from '../model/tipo-cita';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TipoCitaService {


  private comandoPath = 'operador/' + Constant.PATH_TIPO_CITA;
  private consultaPath = 'consulta/' + Constant.PATH_TIPO_CITA;

  constructor(
    private httpService: HttpService,
    private uiService: UiService, private http: HttpClient
  ) { 


  }

  consultar(): Observable<TipoCita[]> {
    return this.httpService.getRequest<TipoCita[]>(this.consultaPath);
  }

  consultarPorId(id: number): Promise<TipoCita> {
    return this.httpService
      .getRequest<TipoCita>(`${this.consultaPath}/${id}`)
      .toPromise();
  }

  crear(data: TipoCita): void {
    this.uiService
      .configurarSnackBar(this.httpService.postRequest(this.comandoPath, data), 'Se ha creado tipo de cita con éxito')
      .subscribe((exito) => {
        if (exito) {
          this.volverAListar();
        }
      });
  }

  modificar(data: TipoCita, idTipo: number): void {
    this.uiService
      .configurarSnackBar(
        this.httpService.putRequest(`${this.comandoPath}/${idTipo}`, data), 'Se ha modificado tipo de cita con éxito'
      ).subscribe((exito) => {
        if (exito) {
          this.volverAListar();
        }
      });
  }

  eliminar(id: string): Observable<boolean> {
    return new Observable((observer) => {
      const data = {
        title: 'Estás seguro de eliminar el Tipo de Cita?',
        message: 'Esta acción es irreversible. \n¿Estás seguro?',
        confirm: 'Sí, Eliminar Tipo',
      };
      const dialogRef = this.uiService.mostrarConfirmDialog(data);
      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.httpService
            .deleteRequest(`${this.comandoPath}/${id}`)
            .then((_: any) => {
              this.uiService.mostrarSnackBar('Tipo de cita eliminado correctamente');
              observer.next(true);
            })
            .catch((_) => {
              const dialog = {
                title: 'Error',
                message: 'No se ha podido eliminar Tipo de cita: ' + id,
                confirm: 'Ok',
              };
              this.uiService.mostrarConfirmDialog(dialog);
              observer.next(false);
            });
        }
      });
    });
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
    this.uiService.volverAListar('tipo-citas');
  }
 

}
