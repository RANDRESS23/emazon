import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryPanelComponent } from './pages/profile/admin/category-panel/category-panel.component';
import { BrandPanelComponent } from './pages/profile/admin/brand-panel/brand-panel.component';
import { ProductPanelComponent } from './pages/profile/admin/product-panel/product-panel.component';
import { WarehouseAssistantPanelComponent } from './pages/profile/admin/warehouse-assistant-panel/warehouse-assistant-panel.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthenticatedGuard } from './core/guards/authenticated/authenticated.guard';
import { AdminGuard } from './core/guards/admin/admin.guard';
import { SupplyPanelComponent } from './pages/profile/warehouse-assistant/supply-panel/supply-panel.component';
import { WarehouseAssistantGuard } from './core/guards/warehouse-assistant/warehouse-assistant.guard';
import { InicioAdminComponent } from './pages/profile/admin/inicio/inicio.component';
import { InicioWarehouseAssistantComponent } from './pages/profile/warehouse-assistant/inicio/inicio.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { InicioComponent } from './pages/inicio/inicio.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthenticatedGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [AuthenticatedGuard] },
  { path: 'perfil/admin/inicio', component: InicioAdminComponent, canActivate: [AdminGuard] },
  { path: 'perfil/admin/panel-categoria', component: CategoryPanelComponent, canActivate: [AdminGuard] },
  { path: 'perfil/admin/panel-marca', component: BrandPanelComponent, canActivate: [AdminGuard] },
  { path: 'perfil/admin/panel-producto', component: ProductPanelComponent, canActivate: [AdminGuard] },
  { path: 'perfil/admin/panel-auxiliar-bodega', component: WarehouseAssistantPanelComponent, canActivate: [AdminGuard] },
  { path: 'perfil/auxiliar-bodega/inicio', component: InicioWarehouseAssistantComponent, canActivate: [WarehouseAssistantGuard] },
  { path: 'perfil/auxiliar-bodega/panel-suministro', component: SupplyPanelComponent, canActivate: [WarehouseAssistantGuard] },
  { path: '', component: InicioComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
