
import { SharedModule } from '@shared/shared.module';
import { UsuarioService } from './shared/service/usuario.service';
import { UsuarioRoutingModules } from './usuario-routing.module';

import { NgModule } from '@angular/core';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ListarUsuarioComponent } from './components/listar-usuario/listar-usuario.component';
import { GuardarUsuarioComponent } from './components/guardar-usuario/guardar-usuario.component';

@NgModule({
  declarations: [UsuarioComponent, ListarUsuarioComponent, GuardarUsuarioComponent],
  imports: [
    UsuarioRoutingModules,
    SharedModule,
  ],
  providers: [UsuarioService]
})
export class UsuarioModule { }
