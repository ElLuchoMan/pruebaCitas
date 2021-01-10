import { TipoCitaService } from './../../shared/service/tipo-cita.service';
import { TipoCita } from './../../shared/model/tipo-cita';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listar-tipo-cita',
  templateUrl: './listar-tipo-cita.component.html',
  styleUrls: []
})
export class ListarTipoCitaComponent implements OnInit, AfterViewInit, OnDestroy {

  private subscripciones: Subscription[] = [];
  displayedColumns = ['idTipoCita', 'nombre', 'sede', 'descripcionBreve', 'acciones'];
  datasource = new MatTableDataSource<TipoCita>();

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private servicio: TipoCitaService) { }

  ngOnInit(): void {
    this.consultar();
  }

  ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }

  consultar(): void {
    this.subscripciones.push(
      this.servicio.consultar().subscribe(list => this.datasource.data = list,
        err => this.servicio.mostrarError(err)
      ));
  }

  doFilter($event: any): void {
    const filterString = $event.target.value;
    this.datasource.filter = filterString.trim().toLocaleLowerCase();
  }

  eliminar(id: string): void {
    this.subscripciones.push(this.servicio.eliminar(id).subscribe(res => {
      if (res) { this.consultar(); }
    }));
  }

  ngOnDestroy(): void {
    if (this.subscripciones) { this.subscripciones.forEach(sub => sub.unsubscribe()); }
  }

}
