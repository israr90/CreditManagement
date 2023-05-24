import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { ModalPaymentComponent } from './modal-payment/modal-payment.component';
import { ChequeComponent } from './modal-payment/cheque/cheque.component';
import { AccountComponent } from './modal-payment/account/account.component';
import { VisaComponent } from './modal-payment/visa/visa.component';
import { ModalPayDoneComponent } from './modal-payment/modal-pay-done/modal-pay-done.component';
import { MasterComponent } from './modal-payment/master/master.component';
import { ExpressComponent } from './modal-payment/express/express.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderUpdateComponent } from './order-update/order-update.component';
import { PnOrdersComponent } from './pnorders.component';
import { PnOrdersRoutingModule } from './pnorders-routing.module';
import { OrderViewComponent } from './order-view/order-view.component';
import { BookNotesComponent } from './components/book-notes/book-notes.component';

@NgModule({
  declarations: [
    PnOrdersComponent,
    OrderDetailsComponent,
     ModalPaymentComponent,
    ChequeComponent,
    AccountComponent,
    VisaComponent,
    ModalPayDoneComponent,
    MasterComponent,
    ExpressComponent,
    OrderUpdateComponent,
    OrderViewComponent,
    BookNotesComponent,


  ],
  imports: [CommonModule, PnOrdersRoutingModule, SharedModule],
})
export class PnOrdersModule {}
