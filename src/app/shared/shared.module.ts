import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { LoadingComponent } from './components/loading/loading.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ModalMessageComponent } from './components/modal-message/modal-message.component';
import { DecimalNumberDirective } from './directive/decimal-number.directive';
import { NumberDirective } from './directive/numbers-only.directive';
import { AlphabetOnlyDirective } from './directive/alphabet-only.directive';
import { DragAndDropDirective } from './directive/drag-and-drop.directive';
import { CharacterDirective } from './directive/character.directive';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PreventMinusDirective } from './directive/prevent-minus.directive';
import { CheckAmountDirective } from './directive/check-amount.directive';
import { NoIpAddressComponent } from './components/no-ip-address/no-ip-address.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    SharedComponent,
    LoadingComponent,
    NotFoundComponent,
    ModalMessageComponent,
    DecimalNumberDirective,
    NumberDirective,
    AlphabetOnlyDirective,
    DragAndDropDirective,
    CharacterDirective,
    PaginationComponent,
    PreventMinusDirective,
    CheckAmountDirective,
    NoIpAddressComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    Ng2TelInputModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxSpinnerModule,
    FontAwesomeModule,
    PaginationModule,
    NgSelectModule,
    NgbModule,

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAAQ7GPIxJs5PTBccmO9OZwBUy464p59bY',
      libraries: ['places'],
    }),
  ],
  exports: [
    Ng2TelInputModule,
    HttpClientModule,
    BsDatepickerModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule,
    NgxSpinnerModule,
    FontAwesomeModule,
    PaginationModule,
    NgSelectModule,
    NgbModule,
    AgmCoreModule,
    LoadingComponent,
    NotFoundComponent,
    ModalMessageComponent,
    DecimalNumberDirective,
    NumberDirective,
    AlphabetOnlyDirective,
    DragAndDropDirective,
    CharacterDirective,
    PaginationComponent,
    PreventMinusDirective,
    CheckAmountDirective,
    NoIpAddressComponent

  ],
})
export class SharedModule {}
