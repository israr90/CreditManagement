import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalPaymentComponent } from './modal-payment/modal-payment.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderUpdateComponent } from './order-update/order-update.component';
import { PnOrdersComponent } from './pnorders.component';
import { OrderViewComponent } from './order-view/order-view.component';

const routes: Routes = [
  { path: '', component: PnOrdersComponent },
  { path: "details/:id", component: OrderDetailsComponent },
  { path: "view/:id", component: OrderViewComponent },
  { path: "update/:id", component: OrderUpdateComponent  },
  //{ path: 'details/:type/:id', component: CollectDetailsComponent },
  { path: 'payment', component: ModalPaymentComponent },
  //  { path: 'create', component: OrderCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PnOrdersRoutingModule {}
