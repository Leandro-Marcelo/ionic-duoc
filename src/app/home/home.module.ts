import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ExperienciaLaboralComponent } from './components/experiencia-laboral/experiencia-laboral.component';
import { CertificacionesComponent } from './components/certificaciones/certificaciones.component';
import { MisDatosComponent } from './components/mis-datos/mis-datos.component';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
    HomePage,
    ExperienciaLaboralComponent,
    CertificacionesComponent,
    MisDatosComponent

],
providers: [
  {
    provide: MAT_DATE_LOCALE,
    useValue: 'es-ES'
  }
]
})
export class HomePageModule {}
