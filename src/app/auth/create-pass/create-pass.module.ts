import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePassRoutingModule } from './create-pass-routing.module';
import { CreatePassComponent } from './create-pass.component';
import { ModalConfirmCreateComponent } from './modal-confirm-create/modal-confirm-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';

@NgModule({
  declarations: [CreatePassComponent, ModalConfirmCreateComponent],
  imports: [
    CommonModule,
    CreatePassRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2TelInputModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreatePassModule {}
