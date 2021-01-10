import { GuardarEspecialistaComponent } from './components/guardar-especialista/guardar-especialista.component';
import { ListarEspecialistaComponent } from './components/listar-especialista/listar-especialista.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EspecialistaComponent } from './components/especialista/especialista.component';

const routes: Routes = [
  {
    path: '',
    component: EspecialistaComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/especialistas/listar' },
      { path: 'listar', component: ListarEspecialistaComponent },
      { path: 'guardar', component: GuardarEspecialistaComponent },
      { path: 'guardar/:id', component: GuardarEspecialistaComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspecialistaRoutingModule { }
