import { HomeComponent } from '@feature/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'tipo-citas',
    loadChildren: () =>
      import('@feature/tipo-cita/tipo-cita.module').then(
        (mod) => mod.TipoCitaModule
      ),
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('@feature/usuario/usuario.module').then(
        (mod) => mod.UsuarioModule
      ),
  },
  {
    path: 'especialistas',
    loadChildren: () =>
      import('@feature/especialista/especialista.module').then(
        (mod) => mod.EspecialistaModule
      ),
  },
  {
    path: 'citas',
    loadChildren: () =>
      import('@feature/cita/cita.module').then(
        (mod) => mod.CitaModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
