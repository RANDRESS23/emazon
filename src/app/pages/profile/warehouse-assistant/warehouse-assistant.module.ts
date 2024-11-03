import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InicioWarehouseAssistantComponent } from "./inicio/inicio.component";
import { SupplyPanelComponent } from "./supply-panel/supply-panel.component";

export const WAREHOUSE_ASSISTANT_ROUTES: Routes = [
  { path: 'inicio', component: InicioWarehouseAssistantComponent },
  { path: 'panel-suministro', component: SupplyPanelComponent }
]

@NgModule({
  imports: [RouterModule.forChild(WAREHOUSE_ASSISTANT_ROUTES)],
  exports: [RouterModule]
})
export class WarehouseAssistantRoutingModule { }