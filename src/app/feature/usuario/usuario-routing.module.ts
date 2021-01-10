import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardarUsuarioComponent } from './components/guardar-usuario/guardar-usuario.component';
import { ListarUsuarioComponent } from './components/listar-usuario/listar-usuario.component';
import { UsuarioComponent } from './components/usuario/usuario.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/usuarios/listar' },
      { path: 'listar', component: ListarUsuarioComponent },
      { path: 'guardar', component: GuardarUsuarioComponent },
      { path: 'guardar/:id', component: GuardarUsuarioComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioRoutingModules { }
