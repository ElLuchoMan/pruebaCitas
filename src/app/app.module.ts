import { CitaModule } from './feature/cita/cita.module';
import { AppRoutingModule } from './app-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from '@feature/home/home.component';
import { TipoCitaModule } from '@feature/tipo-cita/tipo-cita.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuarioModule } from '@feature/usuario/usuario.module';
import {EspecialistaModule} from '@feature/especialista/especialista.module';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    TipoCitaModule,
    UsuarioModule,
    CitaModule,
    EspecialistaModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
