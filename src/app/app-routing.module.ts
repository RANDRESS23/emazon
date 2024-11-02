import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthenticatedGuard } from './core/guards/authenticated/authenticated.guard';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { RolesEnum } from '@utils/enums/roles';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { ClientGuard } from './core/guards/client/client.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthenticatedGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [AuthenticatedGuard] },
  { 
    path: 'perfil/admin', 
    loadChildren: () => import('./pages/profile/admin/admin-routing.module').then(m => m.AdminRoutingModule), 
    canActivate: [AuthGuard],
    data: { role: RolesEnum.ADMIN }
  },
  { 
    path: 'perfil/auxiliar-bodega', 
    loadChildren: () => import('./pages/profile/warehouse-assistant/warehouse-assistant.module').then(m => m.WarehouseAssistantRoutingModule), 
    canActivate: [AuthGuard],
    data: { role: RolesEnum.AUX_BODEGA } 
  },
  { path: '', component: InicioComponent, canActivate: [ClientGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
