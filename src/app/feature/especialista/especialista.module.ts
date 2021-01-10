import { EspecialistaService } from './shared/service/especialista.service';
import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';

import { EspecialistaRoutingModule } from './especialista-routing.module';
import { EspecialistaComponent } from './components/especialista/especialista.component';
import { ListarEspecialistaComponent } from './components/listar-especialista/listar-especialista.component';
import { GuardarEspecialistaComponent } from './components/guardar-especialista/guardar-especialista.component';


@NgModule({
  declarations: [EspecialistaComponent, ListarEspecialistaComponent, GuardarEspecialistaComponent],
  imports: [
    SharedModule,
    EspecialistaRoutingModule
  ],
  providers: [EspecialistaService]
})
export class EspecialistaModule { }
