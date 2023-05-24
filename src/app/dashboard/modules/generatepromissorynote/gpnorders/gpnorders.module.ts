import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderUpdateComponent } from './order-update/order-update.component';
import { GPnOrdersComponent } from './gpnorders.component';
import { GPnOrdersRoutingModule } from './gpnorders-routing.module';
import { OrderViewComponent } from './order-view/order-view.component';
import { OrderGenerateComponent } from './order-generate/order-generate.component';
import { ModalImageComponent } from './modal-image/modal-image.component';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';


@NgModule({
  declarations: [
    GPnOrdersComponent,
    OrderDetailsComponent,
    OrderGenerateComponent,
    OrderUpdateComponent,
    OrderViewComponent,
    OrderGenerateComponent,
    ModalImageComponent,
    ModalConfirmComponent


  ],
  imports: [CommonModule, GPnOrdersRoutingModule, SharedModule],
})
export class GPnOrdersModule {}
