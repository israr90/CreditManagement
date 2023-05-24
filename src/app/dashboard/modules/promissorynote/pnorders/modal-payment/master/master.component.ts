import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
})
export class MasterComponent {

  @Input() FormMaster: FormGroup;
  @Input() details;
  @Input() banks;
  @Input() submitted;
  @Output() sendAmountMaster = new EventEmitter();

  isSameCustomer(e) {
    if (e.target.checked == true) {
      this.FormMaster.get('masterCollection')
        .get('masterPayerName')
        .patchValue(this.details.customer.customerName);
    } else {
      this.FormMaster.get('masterCollection')
        .get('masterPayerName')
        .patchValue('');
    }
  }

  emptyMasterCollection() {
    this.FormMaster.get('masterCollection')
      .get('masterCollectionJod')
      .patchValue(null);
    this.FormMaster.get('masterCollection').get('masterDate').patchValue('');
    this.FormMaster.get('masterCollection')
      .get('masterInvoiceNo')
      .patchValue('');
    this.FormMaster.get('masterCollection')
      .get('masterTerminalId')
      .patchValue('');
    this.FormMaster.get('masterCollection').get('bankId').patchValue(null);
    this.FormMaster.get('masterCollection')
      .get('masterPayerName')
      .patchValue('');
    this.FormMaster.get('masterCollection')
      .get('masterFirst6Digits')
      .patchValue('');
    this.FormMaster.get('masterCollection')
      .get('masterLast4Digits')
      .patchValue('');

    this.sendAmountMaster.emit('');
  }
  sendAmount(event) {
    console.log(event.target.value);
    this.sendAmountMaster.emit(event.target.value);
  }
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
