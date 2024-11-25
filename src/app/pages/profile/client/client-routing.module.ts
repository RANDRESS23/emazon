import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CartComponent } from "./cart/cart.component";

export const CLIENT_ROUTES: Routes = [
  { path: 'carrito', component: CartComponent }
]

@NgModule({
  imports: [RouterModule.forChild(CLIENT_ROUTES)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }