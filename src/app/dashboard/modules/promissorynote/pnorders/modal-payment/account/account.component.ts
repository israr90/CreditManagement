import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  @Input() FormAccount: FormGroup;
  @Input() details;
  @Input() banks;
  @Input() submitted;
  @Output() sendAmountAccount = new EventEmitter();
  accounMsg:string;
  isSameCustomer(e) {
    // console.log(e.target.checked);
    // console.log(e.target.value);
    // if (e.target.checked == true) {
    //   this.FormCheque.get('chequeCollection')
    //     .get('chequeDrawerName')
    //     .patchValue(this.details.customer.customerName);
    // } else {
    //   this.FormCheque.get('chequeCollection')
    //     .get('chequeDrawerName')
    //     .patchValue('');
    // }
  }

  emptyOnAccountCollection() {
    this.FormAccount.get('ordersOnAccountCollection')
      .get('onAccountCollectionJod')
      .patchValue('');
    this.sendAmountAccount.emit('');
  }

  sendAmount(event) {
    console.log(this.details?.customer.remainingAvailableCredit);
    const amount = +event.target.value;
    console.log(amount);

    if (amount < this.details?.customer.remainingAvailableCredit) {
      this.sendAmountAccount.emit(amount);
    } else {
      this.FormAccount.get('ordersOnAccountCollection')
        .get('onAccountCollectionJod')
        .patchValue('');

        this.accounMsg = 'The amount to pay must not exceed the remaining available credit';
        setTimeout(() => {
          this.accounMsg = '';
        }, 3000);
    }
  }
}
