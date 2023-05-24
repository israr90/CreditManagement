import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderUpdateComponent } from './order-update/order-update.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { GPnOrdersComponent } from './gpnorders.component';
import { OrderGenerateComponent } from './order-generate/order-generate.component';

const routes: Routes = [
  { path: '', component: GPnOrdersComponent },
  { path: "details/:id", component: OrderDetailsComponent },
  { path: "view/:id", component: OrderViewComponent },
  { path: "update/:id", component: OrderUpdateComponent  },
  //{ path: 'details/:type/:id', component: CollectDetailsComponent },
   { path: 'generate/:id', component: OrderGenerateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GPnOrdersRoutingModule {}
