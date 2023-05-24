import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import { SharedModule } from '../../shared/shared.module';
import { ModalResetComponent } from './modal-reset/modal-reset.component';


@NgModule({
  declarations: [
    ResetPasswordComponent,
    ModalResetComponent
  ],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    SharedModule,

  ]
})
export class ResetPasswordModule { }
