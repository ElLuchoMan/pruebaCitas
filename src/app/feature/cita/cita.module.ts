import { SharedModule } from '@shared/shared.module';
import { TipoCitaModule } from './../tipo-cita/tipo-cita.module';
import { EspecialistaModule } from './../especialista/especialista.module';
import { CitaService } from './shared/service/cita.service';
import { NgModule } from '@angular/core';

import { CitaRoutingModule } from './cita-routing.module';
import { CitaComponent } from './components/cita/cita.component';
import { ListarCitaComponent } from './components/listar-cita/listar-cita.component';
import { AsignarCitaComponent } from './components/asignar-cita/asignar-cita.component';



@NgModule({
  declarations: [CitaComponent, ListarCitaComponent, AsignarCitaComponent],
  imports: [
    SharedModule,
    CitaRoutingModule,
    EspecialistaModule,
    TipoCitaModule
  ],
  providers: [CitaService]
})
export class CitaModule { }
