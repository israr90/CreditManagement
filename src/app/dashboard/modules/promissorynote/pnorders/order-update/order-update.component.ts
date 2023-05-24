import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/services/shared.service';
import { WorkOdersService } from '../services/workorders.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalMessageComponent } from 'src/app/shared/components/modal-message/modal-message.component';
import * as _ from 'underscore';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.component.html',
  styleUrls: ['./order-update.component.scss']
})
export class OrderUpdateComponent {
  workOrderForm: FormGroup;
  sparePartsForm: FormGroup;
  workOrder: WorkOrder;
  totalRecordCount: number;
  pageNo: number = 0;
  pagin!: number;
  pages!: number[];
  searchCustomer:string='';
  PartSearchByPortOrDescription:string='';
  mobile:string='';
  nationalId:number;
  quantity:number=0;
  Net:number=0;
  totalprice:number=0;
  showPn:boolean=false;
  constructor(private formBuilder: FormBuilder, private spartPartService:WorkOdersService, private modalService: NgbModal,  public headerService:HeaderService, private router: Router,  private route: ActivatedRoute) 
  {
    this.workOrderForm = this.formBuilder.group({
      customerId: new FormControl('', Validators.required),
      customerName: new FormControl('', Validators.required),
      salesNote: new FormControl('', Validators.required),
      paymentType: new FormControl('', Validators.required),
      pnStartDate: new FormControl('', ),
      orderId: new FormControl('', ),
      
      pnEndDate: new FormControl('', ),
      collection: new FormControl('', Validators.required),
      grandAmount: new FormControl('', Validators.required)
    });

    this.sparePartsForm = this.formBuilder.group({
      partNo: new FormControl({value:'',disabled: false}),
      qty: new FormControl(1, [Validators.pattern('^[1-9]\\d*$')]),
      searchByPart: new FormControl('', Validators.required),
      tax: new FormControl(0, Validators.required),
      discount: new FormControl(0, Validators.required),
      descriptionEn: new FormControl('', Validators.required),
      net: new FormControl({ value: 0, disabled: false }),
      // totalPrice: new FormControl('', Validators.required),
      totalPrice: new FormControl({ value: 0, disabled: false }),
      unitPrice: new FormControl({ value: 0, disabled: false }, [Validators.required]),
      //  unitPrice: new FormControl({ value: '', disabled: false }),
      unitofMeasure: new FormControl(null, Validators.required)

    });

    this.workOrderForm.get('paymentType').valueChanges.subscribe(paymentType => {
      if (paymentType === 'PN') {
        // If payment type is PN, set validation for pnStartDate and pnEndDate
        this.workOrderForm.get('pnStartDate').setValidators([Validators.required]);
        this.workOrderForm.get('pnEndDate').setValidators([Validators.required]);
      } else {
        // If payment type is not PN, remove validation for pnStartDate and pnEndDate
        this.workOrderForm.get('pnStartDate').clearValidators();
        this.workOrderForm.get('pnEndDate').clearValidators();
      }
    
      // Update the validation status of the form controls
      this.workOrderForm.get('pnStartDate').updateValueAndValidity();
      this.workOrderForm.get('pnEndDate').updateValueAndValidity();
    });

    this.workOrder = {
      orderId:this.OpportunityId,
      customerId: this.customerId,
      salesNote: '',
      paymentType: '',
      pnStartDate: '',
      pnEndDate: '',
      collection: '',
      grandAmount: 0,
      spareParts: []
    };

    this.disableTextbox();
   
  }
  @HostListener('click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (event.button === 0 && !event.ctrlKey && !event.shiftKey && !event.altKey) {
  this.SparePartList=null;
  this.customers=null;
      
    }
  }
  lookups:any;
 
  ngOnInit(): void {
    this.headerService.setTitle(' Spare Parts > Update Order');
    this.OpportunityId = this.route.snapshot.params['id'];
    let branch=  JSON.parse(localStorage.getItem("branch"));  
    this.branchId=branch.branchId;
   //  this.GetlookupsById();
    //this.GetCustomerSpareParts();
    this.workOrderForm.get('orderId').setValue(this.OpportunityId);
    this.loadTaxNumber()

  }
   branchId:number;
  sort: number = 1;
  serviceAdvisorId: string = '';
  salesConsultantId: string = '';
  OpportunityId:number;
  statusId: string='';
  searchText:string='';
   part:string='';
 
    
    
    QuantityformatInput(event){
      const regex = /^([1-9]\d*)(\.\d{1,2})?$/; // regular expression to format input to 2 decimal places and disallow zero and leading zeros
      let currentValue = event.target.value;
        
      const newValue = currentValue.replace(',', '.').match(regex); // replace comma with dot and apply regex
        
      if (newValue === null) {
        // if input is invalid, reset value to empty string
        event.target.value = '1';
      } else {
        const formattedValue = newValue[0];
        if (parseFloat(formattedValue) > 1000) {
          // if value is greater than 100, reset value to 100
          event.target.value = '1000';
        } else {
          event.target.value = formattedValue;
        }
      }
      this.CheckNetAmount();
    }
    formatInput(event) {
  
     
      const regex = /^[0-9]+(\.[0-9]{0,2})?$/; // regular expression to format input to 2 decimal places
      let currentValue = event.target.value;
      
      // Remove leading zeros
      if (currentValue.charAt(0) === '0') {
        currentValue = currentValue.replace(/^0+/, '');
      }
      
      const newValue = currentValue.replace(',', '.').match(regex); // replace comma with dot and apply regex
      
      if (newValue === null) {
        // if input is invalid, reset value to 0
        event.target.value = '0';
      } else {
        const formattedValue = newValue[0];
        if (parseFloat(formattedValue) > 100) {
          // if value is greater than 100, reset value to 100
          event.target.value = '100';
        } else {
          event.target.value = formattedValue;
        }
      }
      this.CheckNetAmount();
    }
 
  RefreshPart(){
    console.log("refresh");
    this.sparePartsForm.reset();
    this.sparePartsForm.get('discount').setValue(0);
    this.sparePartsForm.get('tax').setValue(0);
    this.sparePartsForm.get('net').setValue(0);
    this.sparePartsForm.get('unitPrice').setValue(0);
    this.sparePartsForm.get('qty').setValue(1);
    this.PartSearchByPortOrDescription='';
    this.ErrorPartNo=false;
  }

    populateForm() {
      try{
        this.workOrderForm.setValue({
          customerId: this.workOrder.customerId,
          orderId:this.OpportunityId,
          customerName:this.searchCustomer,
          salesNote: this.workOrder.salesNote,
          paymentType: this.workOrder.paymentType,
          pnStartDate: this.workOrder.pnStartDate,
          pnEndDate: this.workOrder.pnEndDate,
          collection: this.workOrder.collection,
          grandAmount: this.workOrder.grandAmount,
          spareParts: this.formBuilder.array(this.workOrder.spareParts.map(sp => this.formBuilder.group({
            partNo: [sp.partNo],
            qty: [sp.qty],
            tax: [sp.tax],
            discount: [sp.discount],
            net: [sp.net],
            totalPrice: [sp.totalPrice],
            unitofMeasure: [sp.unitofMeasure],
            descriptionEn: [sp.descriptionEn],
            unitPrice: [sp.unitPrice],
          }))),
        });
      }
      catch(x){
        console.log(x.message);
      }
     
     
    }

  
  disableTextbox() {
    this.sparePartsForm.get('totalPrice').disable();
    this.sparePartsForm.get('net').disable();
    this.sparePartsForm.get('descriptionEn').disable();
    this.sparePartsForm.get('partNo').disable();
    this.sparePartsForm.get('unitPrice').disable();
    
  }
  // onKeyPress(event: KeyboardEvent) {
  //   debugger
    
  //   const input = event.target as HTMLInputElement;
  //   const currentValue = input.valueAsNumber || 0;
  //   const keyPressed = event.key;
  //   if (!isNaN(currentValue) && currentValue >= 100 && !this.isModifierKey(keyPressed)) {
  //     event.preventDefault();
  //   }
  // }
  
  isModifierKey(key: string): boolean {
    return ['Alt', 'Control', 'Shift', 'Meta'].indexOf(key) !== -1;
  }
  CheckNetAmount(){
    let qty=  this.sparePartsForm.get('qty').value;
    let unitpric=this .sparePartsForm.get('unitPrice').value;
    let discont=this.sparePartsForm.get('discount').value;
    if(discont>100){
      this.sparePartsForm.get('discount').setValue(100);
      discont=100;
    }
    let disount=qty*unitpric * discont/100;
  
    this.net=(qty*unitpric)- disount; 
     this.sparePartsForm.get('net').patchValue(parseFloat(this.net.toFixed(2)));
    this.onChangeTax()
      
  }
  onChangeTax()
  {
    debugger;
    let net = parseFloat(this.sparePartsForm.get('net').value);
    
    let tax= net*parseFloat(this.sparePartsForm.get('tax').value)/100;

    let totalprice= net+tax;
    this.sparePartsForm.get('totalPrice').patchValue(Math.round(totalprice).toFixed(2));

  }
  getGrandTotal(): any {
    let grandTotal = 0;
    for (let i = 0; i < this.workOrder.spareParts.length; i++) {
      grandTotal += this.workOrder.spareParts[i].totalPrice;
    }
    return grandTotal;
  }

  getTotalPrice(){
    this.totalprice=this.net*this.tax+this.net;
  }
  ErrorPartNo:boolean=false;
  addSparePart() 
  {
    debugger
    if (this.sparePartsForm.valid) {
      if(this.sparePartsForm.get('partNo').value==0)
      {
        this.ErrorPartNo=true;
        return;
      }
      const sparePart: SparePart = {
        partNo:  this.sparePartsForm.get('partNo').value,
        qty:Math.round(this.sparePartsForm.get('qty').value) ,
        tax: this.sparePartsForm.get('tax').value,
        discount: this.sparePartsForm.get('discount').value,
        descriptionEn: this.sparePartsForm.get('descriptionEn').value,
        
        net: this.sparePartsForm.get('net').value,
        totalPrice: this.sparePartsForm.get('totalPrice').value,
        unitPrice: this.sparePartsForm.get('unitPrice').value,
       // unitofMeasure: 0
         unitofMeasure: this.sparePartsForm.get('unitofMeasure').value
      };
  
      console.log("sparePart obj",sparePart)
      this.workOrder.spareParts.push(sparePart);
      this.sparePartsForm.reset();
      this.RefreshPart();
      this.PartSearchByPortOrDescription='';
     }else{
      // alert('Please fill all required feilds.');
  
      if(this.sparePartsForm.get('partNo').value==0)
      {
        this.ErrorPartNo=true;
      }
      this.sparePartsForm.markAllAsTouched();
      return;
    }

     this.grandAmount= Math.round(parseFloat(this.getGrandTotal())).toFixed(2);
     this.workOrderForm.get('grandAmount').patchValue(this.grandAmount);
  }
  sparePartsList: [];
  RemoveSparePart(item:SparePart)
  {
    this.workOrder.spareParts = this.workOrder.spareParts.filter(part => part.partNo !== item.partNo);
  }

  validateDates() {
    debugger;
    if(this.workOrderForm.get('pnStartDate').value!=''){
      this.workOrder.pnStartDate=this.workOrderForm.get('pnStartDate').value;
    }
    if(this.workOrderForm.get('pnEndDate').value!=''){
      this.workOrder.pnEndDate=this.workOrderForm.get('pnEndDate').value;
    }

    const startDate = this.workOrderForm.get('pnStartDate').value;
    const endDate = this.workOrderForm.get('pnEndDate').value;
    if (startDate && endDate && startDate > endDate) {
      this.workOrderForm.get('pnEndDate').setErrors({ 'invalidDateRange': true });
    } else {
      this.workOrderForm.get('pnEndDate').setErrors(null);
    }
  }
  numbers: number[] = [];
  loadTaxNumber(){
    for (let i = 0; i <= 100; i++) {
      this.numbers.push(i);
    }
  }
  customerError:string='';
  onSubmit() {

  //  if (this.workOrderForm.valid) {
  try{

  
   if(this.workOrderForm.get('customerId').value==null || this.workOrderForm.get('customerId').value==undefined){
    alert("Please enter choose customer");
    return;
  }
      
  if(this.workOrderForm.get('paymentType').value=='PN')
  {
    this.workOrder.pnStartDate = this.workOrderForm.get('pnStartDate').value;
    this.workOrder.pnEndDate = this.workOrderForm.get('pnEndDate').value;
    if(this.workOrder.pnStartDate =="" ||this.workOrder.pnEndDate ==""){
      return;
    }
  }
  else
  {
    this.workOrder.pnStartDate='2023-04-01T12:21:55.596Z';
    this.workOrder.pnEndDate='2023-04-01T12:21:55.596Z';
  }

    this.workOrder.orderId = this.workOrderForm.get('orderId').value;
    this.workOrder.customerId = this.workOrderForm.get('customerId').value;
    this.workOrder.salesNote = this.workOrderForm.get('salesNote').value;
    this.workOrder.paymentType = this.workOrderForm.get('paymentType').value;

    this.workOrder.collection = this.workOrderForm.get('collection').value;
    // this.workOrder.collection = 'External';
    //this.workOrder.grandAmount=this.grandAmount;
    
    this.workOrder.grandAmount = Number(this.workOrderForm.get('grandAmount').value);

    console.log(this.workOrder);
    debugger
    this.spartPartService.updateWorkOrder(this.workOrder)
    .subscribe((response: any) => {
      if (response.isSuccess == true) {
        const modalRef = this.modalService.open(ModalMessageComponent);
        modalRef.componentInstance.type = 'success';
        modalRef.componentInstance.message = 'your new order is edited successfully';
        modalRef.componentInstance.routeName = '/workorders/details/'+this.workOrder.orderId;
        this.router.navigateByUrl('/workorders/details/'+this.workOrder.orderId);
      }
      else{
        console.log(response);
      }
    });
    }catch(x)
    {
      alert(x.message);

    }
  // }
  //    else
  //  {
  //   //   alert('Please fill all required feilds.');
  //   this.sparePartsForm.markAllAsTouched();
  //  }
    
  }
 

  customers:any;
  
  removeSearch(){
    this.searchCustomer='';
    this.customers=null;
  }
 
 
  
  SparePartList:any;
     PortNoValue:string='';
     DescriptionValue:string='';
     qty: number;
     tax: number;
     discont: number=0;
     net: number;
     totalPrice: number;
     unitofMeasure: number;
     unitPrice:number;
     grandAmount:any;
     SelectedPart(item:any)
     {
    
       this.sparePartsForm.get('partNo').patchValue(item.partNo);
       this.sparePartsForm.get('descriptionEn').patchValue(item.descriptionEn);
      //  this.sparePartsForm.get('qty').patchValue(item.qty);
       this.sparePartsForm.get('unitPrice').patchValue(item.unitPrice);
      // this.sparePartsForm.get('unitofMeasure').patchValue(item.unitPrice);
      //  this.sparePartsForm.get('unitPrice').patchValue(item.partNo);
       //this.PortNoValue=item.partNo;
       //this.DescriptionValue=item.descriptionEn;
       
       this.PartSearchByPortOrDescription=item.partNo+" "+ item.descriptionEn;
       
      //  this.qty=item.oilLitre;
      //  this.unitPrice=item.unitPrice;
       //this.unitofMeasure=item.unitofMeasure;
       this.SparePartList=null;
       this.CheckNetAmount();
     }
     removeSparePartSearch()
     {
      this.PartSearchByPortOrDescription="";
      this.SparePartList=null;
     }
  customerId:number;
  SelectedCustomer(item:Customer)
  {
    ;
    this.searchCustomer=item.customerName;
    this.mobile=item.mobile;
    this.customerId=item.customerId;
    this.nationalId=item.nationalId;
    this.workOrderForm.get('customerId').patchValue(item.customerId);
    this.customers=null;
  }
   
  setPage(page: number) {
    this.pageNo = page;
   // this.GetServicesSparePartsWorkParts();
  }
  paymentChoose(value){

    if(value=='PN'){
      this.showPn=true;
    }
    else{
      this.showPn=false;
    }
    
  }
  BackUrl(){
    debugger;
    this.router.navigateByUrl('/workorders/details/' + this.OpportunityId);
  }
  
}

interface SparePart {
  partNo: string;
  qty: number;
  tax: number;
  discount: number;
  net: number;
  totalPrice: number;
  unitofMeasure: number;
  descriptionEn:string;
  unitPrice:number;
}

interface WorkOrder {
  orderId: number;
  customerId: number;
  salesNote: string;
  paymentType: string;
  pnStartDate: string;
  pnEndDate: string;
  collection: string;
  grandAmount: any;
  spareParts: SparePart[];
}
export class Customer {
  customerId: number;
  customerName: string;
  mobile: string;
  email: string;
  nationalId: number;
}
