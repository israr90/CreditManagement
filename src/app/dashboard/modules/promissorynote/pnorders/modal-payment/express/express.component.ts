import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-express',
  templateUrl: './express.component.html',
  styleUrls: ['./express.component.scss'],
})
export class ExpressComponent {
  @Input() FormAmex: FormGroup;
  @Input() details;
  @Input() banks;
  @Input() submitted;
  @Output() sendAmountexpress = new EventEmitter();

  isSameCustomer(e) {
    if (e.target.checked == true) {
      this.FormAmex.get('amexCollection')
        .get('amexPayerName')
        .patchValue(this.details.customer.customerName);
    } else {
      this.FormAmex.get('amexCollection').get('amexPayerName').patchValue('');
    }
  }

  emptyAmexCollection() {
    this.FormAmex.get('amexCollection')
      .get('amexCollectionJod')
      .patchValue(null);
    this.FormAmex.get('amexCollection').get('amexDate').patchValue('');
    this.FormAmex.get('amexCollection').get('amexInvoiceNo').patchValue('');
    this.FormAmex.get('amexCollection').get('amexTerminalId').patchValue('');
    this.FormAmex.get('amexCollection').get('bankId').patchValue(null);
    this.FormAmex.get('amexCollection').get('amexPayerName').patchValue('');
    this.FormAmex.get('amexCollection').get('amexFirst6Digits').patchValue('');
    this.FormAmex.get('amexCollection').get('amexLast4Digits').patchValue('');
    this.sendAmountexpress.emit('');
  }

  sendAmount(event) {
    console.log(event.target.value);
    this.sendAmountexpress.emit(event.target.value);
  }
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
