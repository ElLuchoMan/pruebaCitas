import { ListarTipoCitaComponent } from './components/listar-tipo-cita/listar-tipo-cita.component';
import { GuardarTipoCitaComponent } from './components/guardar-tipo-cita/guardar-tipo-cita.component';

import { TipoCitaComponent } from './components/tipo-cita/tipo-cita.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TipoCitaComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/tipo-citas/listar' },
      { path: 'listar', component: ListarTipoCitaComponent },
      { path: 'guardar', component: GuardarTipoCitaComponent },
      { path: 'guardar/:id', component: GuardarTipoCitaComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoCitaRoutingModule { }
