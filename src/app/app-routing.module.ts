import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryPanelComponent } from './pages/profile/admin/category-panel/category-panel.component';
import { BrandPanelComponent } from './pages/profile/admin/brand-panel/brand-panel.component';

const routes: Routes = [
  { path: 'profile/admin/category-panel', component: CategoryPanelComponent },
  { path: 'profile/admin/brand-panel', component: BrandPanelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
