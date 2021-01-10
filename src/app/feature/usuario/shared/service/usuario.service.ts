import { Usuario } from './../model/usuario';
import { Observable } from 'rxjs';
import { UiService } from '@core/service/ui.service';
import { HttpService } from '@core/service/http.service';
import { Injectable } from '@angular/core';
import { AppConstants as Constant } from '@shared/app.constants';

@Injectable()
export class UsuarioService {

  private comandoPath = 'operador/' + Constant.PATH_USUARIO;
  private consultaPath = 'consulta/' + Constant.PATH_USUARIO;


  constructor(private httpService: HttpService, private uiService: UiService) { }

  consultar(): Observable<Usuario[]> {
    return this.httpService.getRequest<Usuario[]>(this.consultaPath);
  }

  consultarPorId(id: number): Promise<Usuario> {
    return this.httpService
      .getRequest<Usuario>(`${this.consultaPath}/${id}`)
      .toPromise();
  }

  crear(data: Usuario): void {
    this.uiService
      .configurarSnackBar(this.httpService.postRequest(this.comandoPath, data), 'Se ha creado usuario con éxito')
      .subscribe((exito) => {
        if (exito) {
          this.volverAListar();
        }
      });
  }

  modificar(data: Usuario, idResponsable: number): void {
    this.uiService
      .configurarSnackBar(
        this.httpService.putRequest(`${this.comandoPath}/${idResponsable}`, data), 'Se ha modificado usuario con éxito'
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
      message: 'No se han encontrado datos',
      confirm: 'Ok',
    });
    this.volverAListar();
  }

  volverAListar(): void {
    this.uiService.volverAListar('usuarios');
  }

}
