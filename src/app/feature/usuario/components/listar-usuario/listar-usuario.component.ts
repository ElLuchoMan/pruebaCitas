import { Usuario } from '@feature/usuario/shared/model/usuario';
import { UsuarioService } from './../../shared/service/usuario.service';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: []
})
export class ListarUsuarioComponent implements OnInit, AfterViewInit, OnDestroy {

  private usuario!: Usuario;
  private subscripciones: Subscription[] = [];
  displayedColumns = ['idUsuario', 'identificacion', 'nombre', 'apellido1', 'telefonoContacto', 'facultad','proyectoCurricular'];
  datasource = new MatTableDataSource<Usuario>();

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private UsuarioService: UsuarioService) { }

  blankUsuario(): void {
    this.usuario = null as any;
  }

  setUsuario(usuario: Usuario): void {
    this.usuario = usuario;
  }

  get _usuario(): Usuario {
    return this.usuario;
  }

  ngOnInit(): void {
    this.consultar();
  }

  ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }

  consultar(): void {
    this.subscripciones.push(
      this.UsuarioService.consultar().subscribe(list => this.datasource.data = list,
        err => this.UsuarioService.mostrarError(err)
      ));
  }

   doFilter($event: any): void {
    const filterString = $event.target.value;
    this.datasource.filter = filterString.trim().toLocaleLowerCase();
  }

  formatearTelefono(telefono: string): string {
    let telefonoFormateado: string = this.obtenerCaracteres(telefono, 0, 3) + ' ';
    if (telefono.length === 7) {
      telefonoFormateado += this.obtenerCaracteres(telefono, 3, telefono.length);
    } else {
      telefonoFormateado += this.obtenerCaracteres(telefono, 3, 6) + ' ' + this.obtenerCaracteres(telefono, 6, telefono.length);
    }

    return telefonoFormateado;
  }

  private obtenerCaracteres(cadena: string, indiceInicial: number, indiceFinal: number): string {
    return cadena.substring(indiceInicial, indiceFinal);

  }

  ngOnDestroy(): void {
    if (this.subscripciones) { this.subscripciones.forEach(sub => sub.unsubscribe()); }
  }
}
