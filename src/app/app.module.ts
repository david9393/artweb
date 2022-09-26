import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import {CarouselModule} from 'primeng/carousel';
import {ButtonModule} from 'primeng/button';
import {TabMenuModule} from 'primeng/tabmenu';
import {ToastModule} from 'primeng/toast';
import { InicioComponent } from './inicio/inicio.component';
import { VentaComponent } from './venta/venta.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserCreateComponent,
    HomeComponent,
    InicioComponent,
    VentaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastModule,
    CarouselModule,
    ButtonModule,
    TabMenuModule,
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
