import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioAdminComponent } from './inicio/inicio.component';
import { CategoryPanelComponent } from './category-panel/category-panel.component';
import { BrandPanelComponent } from './brand-panel/brand-panel.component';
import { ProductPanelComponent } from './product-panel/product-panel.component';
import { WarehouseAssistantPanelComponent } from './warehouse-assistant-panel/warehouse-assistant-panel.component';

export const ADMIN_ROUTES: Routes = [
  { path: 'inicio', component: InicioAdminComponent },
  { path: 'panel-categoria', component: CategoryPanelComponent },
  { path: 'panel-marca', component: BrandPanelComponent },
  { path: 'panel-producto', component: ProductPanelComponent },
  { path: 'panel-auxiliar-bodega', component: WarehouseAssistantPanelComponent }
]

@NgModule({
  imports: [RouterModule.forChild(ADMIN_ROUTES)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
