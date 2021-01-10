import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Cita } from '@feature/cita/shared/model/cita';
import { CitaService } from '@feature/cita/shared/service/cita.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listar-cita',
  templateUrl: './listar-cita.component.html',
  styleUrls: [],
})
export class ListarCitaComponent implements OnInit, AfterViewInit, OnDestroy {

  private subscripciones: Subscription[] = [];
  displayedColumns = ['codigoCita', 'fechaCita', 'especialista','tipoCita'];
  datasource = new MatTableDataSource<Cita>();

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private servicio: CitaService) { }

  ngOnInit(): void {
    this.consultar();
    this.setSortingAccesor();
    this.datasource.filterPredicate = this.createFilter();
  }

  ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }

  consultar(): void {
    this.subscripciones.push(
      this.servicio.consultar().subscribe(
        (list) => (this.datasource.data = list),
        (err) => this.servicio.mostrarError(err)
      )
    );
  }


  private setSortingAccesor(): any {
    this.datasource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'codigoCita': return item.codigoCita;
        case 'fechaCita': return new Date(item.fechaCita).toDateString();
        case 'especialista': return item.especialista.nombre + item.especialista.apellido1;
        case 'tipoCita': return item.tipoCita.nombre;
        default: return item.codigoCita;
      }
    };
  }

  private createFilter(): (data: Cita, filter: string) => boolean {
    const filterFunction = (data: Cita, filter: string): boolean => {
      const codigocita = data.codigoCita.toString().indexOf(filter.trim().toLowerCase()) !== -1;
      const medico = data.especialista.nombre.trim().toLowerCase().concat(' ' + data.especialista.apellido1.trim().toLowerCase())
        .indexOf(filter.trim().toLowerCase()) !== -1;
       const tipoCita = data.tipoCita.nombre.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1;
       return codigocita || medico || tipoCita ;
    };
    return filterFunction;
  }


  doFilter($event: any): void {
    const filterString = $event.target.value;
    this.datasource.filter = filterString.trim().toLocaleLowerCase();
  }

  ngOnDestroy(): void {
    if (this.subscripciones) {
      this.subscripciones.forEach((sub) => sub.unsubscribe());
    }
  }
}
