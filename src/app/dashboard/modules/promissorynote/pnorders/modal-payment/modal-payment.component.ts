import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../../../../services/shared.service';
import { WorkOdersService } from '../services/workorders.service';
import { PnOrdersComponent } from '../pnorders.component';
import { ModalPayDoneComponent } from './modal-pay-done/modal-pay-done.component';

@Component({
  selector: 'app-modal-payment',
  templateUrl: './modal-payment.component.html',
  styleUrls: ['./modal-payment.component.scss'],
})
export class ModalPaymentComponent implements OnInit {
  @Input() detailsItem;
  @Input() collectionType;
  @Output() sendtoLoadData = new EventEmitter();

  formGroup: FormGroup;
  details: any;

  isShow: boolean = true;
  items = [1, 2, 1, 2, 1, 2];
  submitted: boolean = false;
  selected: number = 1;
  isLoading: boolean;
  errorMessage: any;

  remainingAmount: number;
  grandAmount: number;

  isCash: boolean;
  isCheque: boolean;
  isVisa: boolean;
  isMaster: boolean;
  isExpress: boolean;
  isAccount: boolean;

  totalForAll: number = 0;
  totalCash: number = 0;
  totalCheque: number = 0;
  totalVisa: number = 0;
  totalMaster: number = 0;
  totalExpress: number = 0;
  totalAccount: number = 0;

  JOD: number = 1.0;
  USD: number = 1.41;
  EUR: number = 1.33;
  remainingMessage: string;

  curruncyAry = [];
  constructor(
    private collectService: WorkOdersService,
    public sharedService: SharedService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private router: Router,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    console.log(this.collectionType);
    this.getForm();
    this.GetRegisterDetails();
    this.getBanks();
    if (this.detailsItem) {
      this.formGroup
        .get('ordersCollection')
        .get('orderCollectionType')
        .patchValue(this.collectionType);

      if (this.collectionType == 7002) {
        this.GetDirectPaymentSalesOrdersDetails();
      } else if (this.collectionType == 7001) {
        this.GetServicesSalesOrderDetails();
      } else if (this.collectionType == 7003) {
        this.GetSparePartsSalesOrdersDetails();
      }

      this.formGroup
        .get('ordersOnAccountCollection')
        .get('onAccountPayerName')
        .patchValue(this.detailsItem.customer.customerName);
    }
  }

  GetServicesSalesOrderDetails() {
  
  }

  GetDirectPaymentSalesOrdersDetails() {
    const id =
      this.detailsItem.directPaymentSalesOrderOpportunityNo ||
      this.detailsItem.order.directPaymentSalesOrderOpportunityNo;
    return this.collectService
      .GetDirectPaymentSalesOrdersDetails(id)
      .subscribe((response: any) => {
        if (response) {
          this.details = response.data;

          this.remainingAmount = this.details.order.remainingAmount;
          this.grandAmount = this.details.order.grandAmount;

          this.formGroup
            .get('ordersCollection')
            .get('orderNo')
            .patchValue(
              this.details.order.directPaymentSalesOrderOpportunityNo
            );
        }
      });
  }

  GetSparePartsSalesOrdersDetails() {
   
  }
  chooseTab(val: number) {
    if (this.formGroup.invalid) {
      return window.scroll(0, 0);
    } else {
      this.selected = val;
    }
  }

  getForm() {
    this.formGroup = this.fb.group({
      ordersCollection: this.fb.group({
        orderCollectionType: 0,
        // registerSessionId: 0,
        orderNo: 0,
        cashPayerName: [''],
      }),
      ordersChequeCollection: this.fb.group({
        chequeCollectionJod: [null, Validators.min(0.1)],
        chequeNo: '',
        chequeDate: '',
        bankId: null,
        chequeDrawerName: '',
      }),
      visaCollection: this.fb.group({
        visaCollectionJod: [null, Validators.min(0.1)],
        visaDate: '',
        visaInvoiceNo: '',
        visaTerminalId: '',
        bankId: null,
        visaPayerName: '',
        visaFirst6Digits: '',
        visaLast4Digits: '',
      }),
      masterCollection: this.fb.group({
        masterCollectionJod: [null, Validators.min(0.1)],
        masterDate: '',
        masterInvoiceNo: '',
        masterTerminalId: '',
        masterPayerName: '',
        bankId: null,
        masterFirst6Digits: '',
        masterLast4Digits: '',
      }),
      amexCollection: this.fb.group({
        amexCollectionJod: [null, Validators.min(0.1)],
        amexDate: '',
        amexInvoiceNo: '',
        amexTerminalId: '',
        amexPayerName: '',
        bankId: null,
        amexFirst6Digits: '',
        amexLast4Digits: '',
      }),
      ordersOnAccountCollection: this.fb.group({
        onAccountCollectionJod: [null, Validators.min(0.1)],
        onAccountPayerName: '',
      }),
      ordersCashCollections: this.fb.array([this.addOrdersCashCollections()]),
      ordersCardsCollection: this.fb.array([]),
    });
  }

  addOrdersCardsCollection() {
    return this.fb.group({
      cardDate: '',
      cardInvoiceNo: '',
      cardTerminalId: '',
      bankId: 0,
      cardPayerName: '',
      paymentCardTypeId: 0,
      cardCollectionJod: 0,
      cardFirst6Digits: '',
      cardLast4Digits: '',
    });
  }

  addOrdersCashCollections() {
    return this.fb.group({
      currencyId: null,
      collectedAmount: [null, Validators.min(0.1)],
      vjod: '',
    });
  }
  pushrOdersCashCollections() {
    this.ordersCashCollections.push(
      this.fb.group({
        currencyId: null,
        collectedAmount: null,
        vjod: '',
      })
    );
  }

  get ordersCashCollections() {
    return this.formGroup.controls['ordersCashCollections'] as FormArray;
  }
  get ordersCardsCollection() {
    return this.formGroup.controls['ordersCardsCollection'] as FormArray;
  }

  get formValid(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }
  removeOrdersCash(i, item) {
    (this.formGroup.get('ordersCashCollections') as FormArray).removeAt(i);

    console.log(item.value.currencyId);
    console.log(this.curruncyAry);
    const vc = item.value.currencyId;
    this.curruncyAry = this.curruncyAry.filter((item) => item !== vc);
    console.log(this.curruncyAry);

    // let isExist = this.ordersCashCollections.value.findIndex(
    //   (elem: any) =>
    //   this.curruncyAry. elem.currencyId === e.target.value ||
    // );

    this.totalCash = 0;
    for (let c = 0; c < this.ordersCashCollections.value.length; c++) {
      console.log(this.ordersCashCollections.value);
      // this.curruncyAry = [];
      this.curruncyAry.push(this.ordersCashCollections.value[c].currencyId);
      console.log(this.ordersCashCollections.at(c).get('vjod').value);

      this.totalCash += this.ordersCashCollections.at(c).get('vjod').value;
    }
    console.log(this.totalCash);

    this.calculateForRemaining();
  }

  registers: any;
  registerCurrencies: any;
  GetRegisterDetails() {
    return this.collectService
      .GetRegisterDetails(this.sharedService.getRegister.registerObj?.id)
      .subscribe((response: any) => {
        if (response) {
          this.registers = response.data;
          this.registerCurrencies = this.registers.registerCurrencies.map(
            (x) => ({
              id: x.id,
              name: x.currency[0].lookupName,
              lookupId: x.currency[0].lookupId,
            })
          );
          console.log(this.registerCurrencies);
          // this.formGroup
          //   .get('ordersCollection')
          //   .get('registerSessionId')
          //   .patchValue(this.registers.id);

          this.isCash = this.registers.cash;
          this.isCheque = this.registers.cheque;
          this.isVisa = this.registers.visa;
          this.isMaster = this.registers.mastercard;
          this.isExpress = this.registers.americanExpress;
          this.isAccount = this.registers.onCustomerAccount;
          // this.registerForm.value?.registerCurrencies?.map((x) => ({
          //   currencyId: x.id,
          // }))
        }
      });
  }
  banks: any;
  getBanks() {
    this.collectService.getLookupsById(11).subscribe(
      (response: any) => {
        this.banks = response.data.map((x) => ({
          id: x.id,
          name: x.name[0].lookupName,
        }));
      },
      (error) => {
        // this.errorMessage = error.message;
      }
    );
  }

  convertCash(event, i) {
    console.log(event);
    console.log(event);
    console.log(i);
    this.remainingMessage = '';
    if (this.ordersCashCollections.at(i).get('currencyId').value) {
      console.log(this.ordersCashCollections.at(i).get('currencyId').value);

      if (this.ordersCashCollections.at(i).get('currencyId').value == 9001) {
        this.ordersCashCollections
          .at(i)
          .get('vjod')
          .patchValue(
            this.ordersCashCollections.at(i).get('collectedAmount').value * 1
          );
      } else if (
        this.ordersCashCollections.at(i).get('currencyId').value == 9002
      ) {
        this.ordersCashCollections
          .at(i)
          .get('vjod')
          .patchValue(
            this.ordersCashCollections.at(i).get('collectedAmount').value * 0.71
          );
      } else if (
        this.ordersCashCollections.at(i).get('currencyId').value == 9003
      ) {
        this.ordersCashCollections
          .at(i)
          .get('vjod')
          .patchValue(
            this.ordersCashCollections.at(i).get('collectedAmount').value * 0.75
          );
      }

      this.totalCash = 0;
      // this.totalForAll = this.totalForAll + this.totalCash;

      for (let c = 0; c < this.ordersCashCollections.value.length; c++) {
        console.log(this.ordersCashCollections.value);
        console.log(this.ordersCashCollections.at(c).get('vjod').value);
        this.totalCash += +this.ordersCashCollections.at(c).get('vjod').value;
      }
      console.log(this.totalCash);
      // this.totalForAll = this.totalForAll + this.totalCash;

      this.calculateForRemaining();
    }
  }
  chooseCurrency(event, i) {
    // console.log(event);
    console.log(event?.lookupId);
    console.log(this.ordersCashCollections.value);
    this.curruncyAry = [];
    // this.curruncyAry.push(event?.lookupId);
    console.log(this.curruncyAry);

    // console.log(this.ordersCashCollections.value[i].currencyId);

    // let isExist = this.ordersCashCollections.value.some(
    //   (elem: any) => elem.currencyId === event?.lookupId
    // );
    // console.log('yes', isExist);

    // if (isExist !== -1) {
    //   console.log('yes', isExist);
    //   console.log('isExist', isExist);
    // } else {
    //   console.log('no', isExist);
    // }

    if (event?.lookupId == 9001) {
      this.ordersCashCollections
        .at(i)
        .get('vjod')
        .patchValue(
          (
            this.ordersCashCollections.at(i).get('collectedAmount').value * 1
          ).toFixed(2)
        );
    } else if (event?.lookupId == 9002) {
      this.ordersCashCollections
        .at(i)
        .get('vjod')
        .patchValue(
          +(
            this.ordersCashCollections.at(i).get('collectedAmount').value * 0.71
          ).toFixed(2)
        );
    } else if (event?.lookupId == 9003) {
      this.ordersCashCollections
        .at(i)
        .get('vjod')
        .patchValue(
          +(
            this.ordersCashCollections.at(i).get('collectedAmount').value * 0.75
          ).toFixed(2)
        );
    }

    this.totalCash = 0;
    // this.totalForAll = this.totalForAll + this.totalCash;

    for (let c = 0; c < this.ordersCashCollections.value.length; c++) {
      // console.log(this.ordersCashCollections.value);
      // console.log(+this.ordersCashCollections.at(c).get('vjod').value);

      this.curruncyAry.push(
        this.ordersCashCollections.at(c).get('currencyId').value
      );
      this.totalCash += Number(
        this.ordersCashCollections.at(c).get('vjod').value
      );
    }
    // console.log(this.totalCash);
    // this.totalForAll = this.totalForAll + this.totalCash;

    this.calculateForRemaining();
    // console.log('ordersCashCollections', this.ordersCashCollections.value);
    // console.log(
    //   'ordersCashCollections lookupId',
    //   this.ordersCashCollections.value[0].currencyId
    // );
    //
  }
  clearCurruncyId(event, i) {
    // console.log(this.ordersCashCollections.at(i).get('lookupId')?.value);
    // console.log(event);
  }
  isExceedAmount: boolean = false;
  inValue: number = 60;
  checkIsLessRemining() {
    // console.log('checkIsLessRemining');
    // console.log(this.remainingAmount);
    if (this.remainingAmount < 0 && this.collectionType != 7002) {
      this.isExceedAmount = true;
    }
    // console.log('no');
    // console.log(-10 < 1);
    // console.log(this.totalForAll);
    // console.log(this.remainingAmount);

    // const checkVal = this.remainingAmount - (this.inValue + this.totalForAll);
    // console.log(checkVal);
    // console.log(this.remainingAmount);

    // if (checkVal > this.remainingAmount) {
    //   this.isExceedAmount = false;
    //   console.log('no');
    //   console.log(this.isExceedAmount);
    //   this.calculateForRemaining();
    // } else {
    //   this.isExceedAmount = true;
    //   console.log('ok');
    // }
  }
  calculateForRemaining() {
    this.isExceedAmount = false;

    this.totalForAll = 0;
    // console.log(this.totalForAll);
    // console.log(this.totalCash);
    // console.log(this.totalCheque);
    // console.log(this.totalVisa);
    // console.log(this.totalMaster);
    // console.log(this.totalExpress);
    // console.log(this.totalAccount);

    this.totalForAll =
      Number(this.totalCash) +
      this.totalCheque +
      this.totalVisa +
      this.totalMaster +
      this.totalExpress +
      this.totalAccount;

    // console.log(this.totalForAll);

    // console.log(this.remainingAmount);
    //
    // this.remainingAmount = this.details.order.remainingAmount;
    // this.remainingAmount = this.details.order.grandAmount;

    if (this.collectionType == 7002) {
      this.remainingAmount = this.details.order.remainingAmount;
    } else if (this.collectionType == 7001) {
      this.remainingAmount = this.details.order.grandAmount;
    } else if (this.collectionType == 7003) {
      this.remainingAmount = this.details.order.grandAmount;
    }

    // console.log(this.remainingAmount);
    this.remainingAmount = this.remainingAmount - Number(this.totalForAll);
    this.checkIsLessRemining();
  }
  isSameCustomer(e) {
    console.log(e.target.checked);
    console.log(e.target.value);
    if (e.target.checked == true) {
      this.formGroup
        .get('ordersCollection')
        .get('cashPayerName')
        .patchValue(this.details.customer.customerName);
    } else {
      this.formGroup
        .get('ordersCollection')
        .get('cashPayerName')
        .patchValue('');
    }
  }

  emptyCashCollections() {
    this.formGroup.get('ordersCollection').get('cashPayerName').patchValue('');
    this.remainingMessage = '';
    for (let r = this.ordersCashCollections.value.length - 1; r >= 0; r--) {
      this.ordersCashCollections.removeAt(r);
    }
    this.curruncyAry = [];

    this.pushrOdersCashCollections();
    this.totalCash = 0;
    this.calculateForRemaining();
  }
  getAmountCheque(event: number) {
    this.totalCheque = +event;
    this.inValue = +event;
    console.log(this.inValue);
    console.log(this.totalCheque);
    this.remainingMessage = '';
    // this.totalForAll += this.totalCheque;
    this.calculateForRemaining();
    this.checkIsLessRemining();

    // this.remainingAmount = this.details.order.remainingAmount;
    // this.remainingAmount = this.remainingAmount - this.totalForAll;
  }

  getAmountVisa(event: number) {
    this.totalVisa = +event;
    this.calculateForRemaining();
    this.checkIsLessRemining();
  }
  getAmountMaster(event: number) {
    this.totalMaster = +event;
    this.calculateForRemaining();
    this.checkIsLessRemining();
  }
  getAmountExpress(event: number) {
    this.totalExpress = +event;
    this.calculateForRemaining();
    this.checkIsLessRemining();
  }
  getAmountAccount(event: number) {
    this.totalAccount = +event;
    this.calculateForRemaining();
    this.checkIsLessRemining();
  }
  onSubmit() {
    this.isLoading = true;
    this.submitted = true;
    this.remainingMessage = '';
    this.isExceedAmount = false;
    console.log('totalForAll', this.totalForAll);

    if (this.totalForAll == 0) {
      this.isLoading = false;
      return window.scroll(0, 0);
    }

    // console.log(this.formGroup.value);
    // console.log(this.formGroup.controls);

    // this.formGroup.controls
    // console.log(this.formValid.chequeCollection.controls.chequeCollectionJod);

    // delete this.formGroup.value.ordersCashCollections;
    for (let r = this.ordersCardsCollection.value.length - 1; r >= 0; r--) {
      this.ordersCardsCollection.removeAt(r);
    }
    if (
      this.formGroup.get('visaCollection').get('visaCollectionJod').value ==
      null
    ) {
      console.log('visaCollection1');
      delete this.formGroup.value.visaCollection;
      console.log('visaCollection2');
    } else {
      console.log('visaCollection3', this.formGroup.value.visaCollection);
      this.ordersCardsCollection.push(
        this.fb.group({
          cardDate: this.formGroup.value.visaCollection.visaDate,
          cardInvoiceNo: this.formGroup.value.visaCollection.visaInvoiceNo,
          cardTerminalId: this.formGroup.value.visaCollection.visaTerminalId,
          bankId: this.formGroup.value.visaCollection.bankId,
          cardPayerName: this.formGroup.value.visaCollection.visaPayerName,
          paymentCardTypeId: 13001,
          cardCollectionJod:
            this.formGroup.value.visaCollection.visaCollectionJod,
          cardFirst6Digits:
            this.formGroup.value.visaCollection.visaFirst6Digits,
          cardLast4Digits: this.formGroup.value.visaCollection.visaLast4Digits,
        })
      );
      delete this.formGroup.value.visaCollection;
    }

    if (
      this.formGroup.get('masterCollection').get('masterCollectionJod').value ==
      null
    ) {
      delete this.formGroup.value.masterCollection;
    } else {
      console.log('masterCollection');

      // for (let r = this.ordersCardsCollection.value.length - 1; r >= 0; r--) {
      //   this.ordersCardsCollection.removeAt(r);
      // }

      console.log('masterCollection', this.formGroup.value.masterCollection);
      this.ordersCardsCollection.push(
        this.fb.group({
          cardDate: this.formGroup.value.masterCollection.masterDate,
          cardInvoiceNo: this.formGroup.value.masterCollection.masterInvoiceNo,
          cardTerminalId:
            this.formGroup.value.masterCollection.masterTerminalId,
          bankId: this.formGroup.value.masterCollection.bankId,
          cardPayerName: this.formGroup.value.masterCollection.masterPayerName,
          paymentCardTypeId: 13002,
          cardCollectionJod:
            this.formGroup.value.masterCollection.masterCollectionJod,
          cardFirst6Digits:
            this.formGroup.value.masterCollection.masterFirst6Digits,
          cardLast4Digits:
            this.formGroup.value.masterCollection.masterLast4Digits,
        })
      );
      delete this.formGroup.value.masterCollection;
    }
    if (
      this.formGroup.get('amexCollection').get('amexCollectionJod').value ==
      null
    ) {
      delete this.formGroup.value.amexCollection;
    } else {
      console.log('amexCollection');
      // for (let r = this.ordersCardsCollection.value.length - 1; r >= 0; r--) {
      //   this.ordersCardsCollection.removeAt(r);
      // }
      console.log('amexCollection', this.formGroup.value.amexCollection);
      this.ordersCardsCollection.push(
        this.fb.group({
          cardDate: this.formGroup.value.amexCollection.amexDate,
          cardInvoiceNo: this.formGroup.value.amexCollection.amexInvoiceNo,
          cardTerminalId: this.formGroup.value.amexCollection.amexTerminalId,
          bankId: this.formGroup.value.amexCollection.bankId,
          cardPayerName: this.formGroup.value.amexCollection.amexPayerName,
          paymentCardTypeId: 13003,
          cardCollectionJod:
            this.formGroup.value.amexCollection.amexCollectionJod,
          cardFirst6Digits:
            this.formGroup.value.amexCollection.amexFirst6Digits,
          cardLast4Digits: this.formGroup.value.amexCollection.amexLast4Digits,
        })
      );
      delete this.formGroup.value.amexCollection;
    }

    if (this.ordersCashCollections.at(0).get('collectedAmount').value == null) {
      console.log('ordersCashCollections1');
      delete this.formGroup.value.ordersCashCollections;
    } else {
      if (this.ordersCashCollections.at(0).get('collectedAmount').value <= 0) {
        console.log('ordersCashCollections2');
        this.isLoading = false;
        return window.scroll(0, 0);
      }
    }

    if (
      this.formGroup.get('ordersChequeCollection').get('chequeCollectionJod')
        .value == null
    ) {
      console.log('ordersChequeCollection1');
      delete this.formGroup.value.ordersChequeCollection;
    } else {
      if (
        this.formGroup.get('ordersChequeCollection').get('chequeCollectionJod')
          .value <= 0
      ) {
        console.log('ordersCashCollections2');
        this.isLoading = false;
        return window.scroll(0, 0);
      }
    }

    if (
      this.formGroup
        .get('ordersOnAccountCollection')
        .get('onAccountCollectionJod').value == null
    ) {
      delete this.formGroup.value.ordersOnAccountCollection;
    }

    if (this.formGroup.get('ordersCardsCollection').value.length == 0) {
      delete this.formGroup.value.ordersCardsCollection;
    }

    delete this.formGroup.value.visaCollection;
    delete this.formGroup.value.masterCollection;

    console.log('1111');
    console.log('formGroup', this.formGroup.value);

    if (this.formGroup.invalid) {
      this.isLoading = false;
      return window.scroll(0, 0);
    }
    console.log(
      'this.remainingAmount',
      this.remainingAmount,
      this.collectionType,
      this.remainingAmount != 0
    );

    if (
      (this.remainingAmount != 0 && this.collectionType == 7001) ||
      (this.remainingAmount != 0 && this.collectionType == 7003)
    ) {
      this.isLoading = false;

      this.remainingMessage =
        'Payment must be completed, there is an amount left to pay';
      return window.scroll(0, 0);
    }

    if (this.remainingAmount < 0 && this.collectionType == 7002) {
      this.isLoading = false;
      this.remainingMessage =
        'Remaining amount exceeds the collected amount, please correct your payment.';
      return window.scroll(0, 0);
      // const modalRef = this.modalService.open(ModalPayDoneComponent);
      // return (modalRef.componentInstance.name = 'remain');
    }
    console.log(this.formGroup.value);
    return this.collectService.CollectionOrder(this.formGroup.value).subscribe(
      (response: any) => {
        if (response.isSuccess == true) {
          this.remainingMessage = '';
          console.log(response);
          this.isLoading = false;
          const modalRef = this.modalService.open(ModalPayDoneComponent);
          modalRef.componentInstance.name = 'ok';

          setTimeout(() => {
            this.sendtoLoadData.emit();
          }, 2000);
        } else {
          this.isLoading = false;
          console.log('response.errors', response);
          // this.errorsList = response.Errors || response.errors;
          const modalRef = this.modalService.open(ModalPayDoneComponent);
          modalRef.componentInstance.name = 'no';
          modalRef.componentInstance.errors =
            response.Errors || response.errors;
          // console.log(error), (this.errorMessage = error.statusText);
        }
      },
      (error: any) => {
        this.isLoading = false;
        const modalRef = this.modalService.open(ModalPayDoneComponent);
        modalRef.componentInstance.name = 'no';
        modalRef.componentInstance.errors =
          error.error.errors || error.error.Errors;
        this.isExceedAmount = false;
        console.log('errors', error.error);
        console.log(error.errors), (this.errorMessage = error.statusText);
      }
    );
  }
}
