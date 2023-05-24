import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cheque',
  templateUrl: './cheque.component.html',
  styleUrls: ['./cheque.component.scss'],
})
export class ChequeComponent {

  @Input() FormCheque: FormGroup;
  @Input() details;
  @Input() banks;
  @Input() submitted;

  @Output() sendAmountCheque = new EventEmitter();

  get formValidCheque(): { [key: string]: AbstractControl } {
    return this.FormCheque.controls;
  }

  isSameCustomer(e) {
    console.log(e.target.checked);
    console.log(e.target.value);
    if (e.target.checked == true) {
      this.FormCheque.get('ordersChequeCollection')
        .get('chequeDrawerName')
        .patchValue(this.details.customer.customerName);
    } else {
      this.FormCheque.get('ordersChequeCollection')
        .get('chequeDrawerName')
        .patchValue('');
    }
  }

  emptyChequeCollection() {
    this.FormCheque.get('ordersChequeCollection')
      .get('chequeCollectionJod')
      .patchValue(null);
    this.FormCheque.get('ordersChequeCollection')
      .get('chequeNo')
      .patchValue('');
    this.FormCheque.get('ordersChequeCollection')
      .get('chequeDate')
      .patchValue('');
    this.FormCheque.get('ordersChequeCollection')
      .get('bankId')
      .patchValue(null);
    this.FormCheque.get('ordersChequeCollection')
      .get('chequeDrawerName')
      .patchValue('');
    this.sendAmountCheque.emit('');
  }

  sendAmount(event) {
    console.log(event.target.value);
    this.sendAmountCheque.emit(event.target.value);
  }
}
