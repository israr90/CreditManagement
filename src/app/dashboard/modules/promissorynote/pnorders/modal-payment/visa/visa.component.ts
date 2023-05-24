import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-visa',
  templateUrl: './visa.component.html',
  styleUrls: ['./visa.component.scss'],
})
export class VisaComponent {
  @Input() FormVisa: FormGroup;
  @Input() details;
  @Input() banks;
  @Input() submitted;
  @Output() sendAmountVisa = new EventEmitter();

  isSameCustomer(e) {
    if (e.target.checked == true) {
      this.FormVisa.get('visaCollection')
        .get('visaPayerName')
        .patchValue(this.details.customer.customerName);
    } else {
      this.FormVisa.get('visaCollection').get('visaPayerName').patchValue('');
    }
  }

  emptyVisaCollection() {
    this.FormVisa.get('visaCollection')
      .get('visaCollectionJod')
      .patchValue(null);
    this.FormVisa.get('visaCollection').get('visaCollectionJod').untouched ===
      true;
    this.FormVisa.get('visaCollection').get('visaDate').patchValue('');
    this.FormVisa.get('visaCollection').get('visaInvoiceNo').patchValue('');
    this.FormVisa.get('visaCollection').get('visaTerminalId').patchValue('');
    this.FormVisa.get('visaCollection').get('bankId').patchValue(null);
    this.FormVisa.get('visaCollection').get('visaPayerName').patchValue('');
    this.FormVisa.get('visaCollection').get('visaFirst6Digits').patchValue('');
    this.FormVisa.get('visaCollection').get('visaLast4Digits').patchValue('');
    this.sendAmountVisa.emit('');
  }

  sendAmount(event) {
    console.log(event.target.value);
    this.sendAmountVisa.emit(event.target.value);
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
