import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompraComponent } from './compra/compra.component';
import { HomeComponent } from './home/home.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { VentaComponent } from './venta/venta.component';

const routes: Routes = [
  {path: '', component:InicioComponent},
  {path: 'login', component:LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: UserCreateComponent},
  {path: 'venta', component: VentaComponent},
  {path: 'compra', component: CompraComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
