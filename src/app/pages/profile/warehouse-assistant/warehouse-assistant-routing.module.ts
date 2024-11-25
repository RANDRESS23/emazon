import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InicioWarehouseAssistantComponent } from "./inicio/inicio.component";
import { SupplyPanelComponent } from "./supply-panel/supply-panel.component";
import { CategoryPanelComponent } from "../admin/category-panel/category-panel.component";
import { BrandPanelComponent } from "../admin/brand-panel/brand-panel.component";
import { ProductPanelComponent } from "../admin/product-panel/product-panel.component";

export const WAREHOUSE_ASSISTANT_ROUTES: Routes = [
  { path: 'inicio', component: InicioWarehouseAssistantComponent },
  { path: 'panel-suministro', component: SupplyPanelComponent },
  { path: 'panel-categoria', component: CategoryPanelComponent },
  { path: 'panel-marca', component: BrandPanelComponent },
  { path: 'panel-producto', component: ProductPanelComponent }
]

@NgModule({
  imports: [RouterModule.forChild(WAREHOUSE_ASSISTANT_ROUTES)],
  exports: [RouterModule]
})
export class WarehouseAssistantRoutingModule { }
