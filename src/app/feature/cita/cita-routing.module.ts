import { AsignarCitaComponent } from './components/asignar-cita/asignar-cita.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitaComponent } from './components/cita/cita.component';
import { ListarCitaComponent } from './components/listar-cita/listar-cita.component';

const routes: Routes = [
  {
    path: '',
    component: CitaComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/citas/listar' },
      { path: 'listar', component: ListarCitaComponent },
      { path: 'asignar', component: AsignarCitaComponent },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitaRoutingModule { }
