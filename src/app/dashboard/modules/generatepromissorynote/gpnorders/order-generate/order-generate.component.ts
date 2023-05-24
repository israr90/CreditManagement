import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { WorkOdersService } from '../services/workorders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'src/app/services/header.service';
import { SharedService } from 'src/app/services/shared.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalMessageComponent } from 'src/app/shared/components/modal-message/modal-message.component';
import { ModalImageComponent } from '../modal-image/modal-image.component';


import { DatePipe } from '@angular/common';
import { forEach } from 'underscore';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { CmSetupService } from '../../../creditmanagement/cmsetup/services/cmsetup.service';

@Component({
  selector: 'app-order-generate',
  templateUrl: './order-generate.component.html',
  styleUrls: ['./order-generate.component.scss']
})
export class OrderGenerateComponent {
  GenerateOrderForm:FormGroup;
  myForm: FormGroup;
  today: string;  
  orderId:number;
  isViewFile: boolean;
  isViewFile2: boolean;
  isShowToUplaod: boolean = true;
  isShowToUplaod2: boolean = true;
  isLoadingView: boolean = true;
  @ViewChild('fileInput', { static: true }) fileInput: any;
constructor(    private services: WorkOdersService,
  private router: Router,
  private route: ActivatedRoute,
  private formBuilder: FormBuilder,
  public headerService: HeaderService,
  public sharedService: SharedService,
  private modalService: NgbModal,
  public datepipe: DatePipe,
  private fb: FormBuilder,
  private CMServices:CmSetupService,
  config: NgbModalConfig)
  {
    const now = new Date();
    this.today = now.toISOString().substr(0, 10); // Get the date in YYYY-MM-DD format

    this.GenerateOrderForm = this.formBuilder.group({
      //customername: new FormControl(null, Validators.required),
      // customername: new FormControl(),
      // customerphone: new FormControl('', ),
      // totalAmount: new FormControl('',),
      // pnamount: new FormControl('', ),
      orderno: new FormControl('', ),
      OrderId: new FormControl('', ),
      // orderlink: new FormControl('', ),
      // branch: new FormControl('', ),
      orderdate: new FormControl('', ),
      startdate: new FormControl('',  Validators.required),
      numberofinstallments: new FormControl('',),
      Guarantor: new FormControl('',),
       guarantorname: new FormControl('',),
      guarantorphone: new FormControl('',),
      guarantoidno: new FormControl('',),
      IDFile: new FormControl('', ),
      secretfile: new FormControl('',),
    });
      this.GenerateOrderForm.get('Guarantor').valueChanges.subscribe(isGrauntor => {
        if (isGrauntor === true) {
          // If payment type is PN, set validation for pnStartDate and pnEndDate
          this.GenerateOrderForm.get('guarantorname').setValidators([Validators.required]);
          this.GenerateOrderForm.get('guarantorphone').setValidators([Validators.required]);
          this.GenerateOrderForm.get('guarantoidno').setValidators([Validators.required]);
          this.GenerateOrderForm.get('IDFile').setValidators([Validators.required]);
          this.GenerateOrderForm.get('secretfile').setValidators([Validators.required]);
        } 
        else {
          this.GenerateOrderForm.get('guarantorname').clearValidators();
          this.GenerateOrderForm.get('guarantorphone').clearValidators();
          this.GenerateOrderForm.get('guarantoidno').clearValidators();
          this.GenerateOrderForm.get('IDFile').clearValidators();
          this.GenerateOrderForm.get('secretfile').clearValidators();
        }
      
        this.GenerateOrderForm.get('guarantorname').updateValueAndValidity();
        this.GenerateOrderForm.get('guarantorphone').updateValueAndValidity();
        this.GenerateOrderForm.get('guarantoidno').updateValueAndValidity();
        this.GenerateOrderForm.get('IDFile').updateValueAndValidity();
        this.GenerateOrderForm.get('secretfile').updateValueAndValidity();
        // Update the validation status of the form controls

   

    });

    // this.today= this.datepipe.transform(this.today, 'yyyy-MM-dd');

    
}
ngOnInit(): void {
  this.orderId = this.route.snapshot.params['id'];
   this.headerService.setTitle(' Promissory Notes Orders > Generate Promissory Notes > Generate Order');
   this.GetCMSetup()
 
  
   this.myForm = this.fb.group({
    CustomerName: [''],
    InstallmentAmount: [''],
    DueDate: [''],
    Status: ['']
  });
}
CMSetupData:any;
periodBetweenPNType:string;
periodBetweenPNValue:any;
GetCMSetup()
{
  this.CMServices
    .GetCmSetUp()
    .subscribe((response: any) => {
      if (response.isSuccess == true) {
        debugger
        this.CMSetupData = response.data[0];
        if(this.CMSetupData.periodBetweenPNType.trim()=='Days'){
          this.CMSetupData.periodBetweenPNValue;
        }
         if(this.CMSetupData.periodBetweenPNType.trim()=='Months'){
          
        }

        this.GetPNOrderDetails();
      }
    });
}
enter: boolean;
filePath: string;
fileName: string;
errorMsgUplaod: string;
filesDropped(files: any) {
  debugger;
  this.enter = false;

  if (
    files[0].file.type == 'image/jpeg' ||
    files[0].file.type == 'image/jpg' ||
    files[0].file.type == 'image/png' ||
    files[0].file.type == 'application/pdf'
  ) {
   

    if (files && files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.filePath = event.target.result;
       
      };
      reader.readAsDataURL(files[0].file);
     // this.GenerateOrderForm.get('IDFile').patchValue(reader.result);
    }

    this.fileName = files[0].file.name;
    // console.log(this.filePath);
    // this.filePath = files[0].url;
    this.errorMsgUplaod = '';
    this.File=files[0].file;
    this.GenerateOrderForm.get('IDFile').patchValue(files[0].file);
  } else {
    this.errorMsgUplaod =
      'This file not support , Supported formates: JPEG, JPG, PNG, PDF';
  }


}
enter2: boolean;
filePath2: string;
fileName2: string;
errorMsgUplaod2: string;

filesDropped2(files: any) {
  this.enter2 = false;

  if (
    files[0].file.type == 'image/jpeg' ||
    files[0].file.type == 'image/jpg' ||
    files[0].file.type == 'image/png' ||
    files[0].file.type == 'application/pdf'
  ) {
   

    if (files && files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.filePath = event.target.result;
      };
      reader.readAsDataURL(files[0].file);
    }

    this.fileName2 = files[0].file.name;
    this.File2=files[0].file;
    // console.log(this.filePath);
    // this.filePath = files[0].url;
    this.errorMsgUplaod2 = '';
 
    this.GenerateOrderForm.get('secretfile')?.patchValue(files[0].file);
  } else {
    this.errorMsgUplaod2 =
      'This file not support , Supported formates: JPEG, JPG, PNG, PDF';
  }


}
// InputVar: ElementRef;
removeImageName() {
  this.fileName = '';
  this.filePath = '';
  this.errorMsgUplaod = '';
  //this.InputVar.nativeElement.value = '';
  this.GenerateOrderForm.get('IDFile')?.patchValue(null);
}
removeImageName2() {
  this.fileName2 = '';
  this.filePath2 = '';
  this.errorMsgUplaod2 = '';
//  this.InputVar.nativeElement.value = '';
  this.GenerateOrderForm.get('secretfile')?.patchValue(null);
}
myFiles: string[] = [];
urls: any[] = [];
removeImage(i) {
  this.urls.splice(i, 1);
  this.myFiles.splice(i, 1);
}
removeImg() {
  this.errorMsgUplaod = '';
  this.isShowToUplaod = !this.isShowToUplaod;
}
@ViewChild('downloadLink') downloadLink: ElementRef;
@ViewChild('downloadSecretfileLink') downloadSecretfileLink: ElementRef;
download() {
  debugger
  const file = this.GenerateOrderForm.get('IDFile').value;
  const link = this.downloadLink.nativeElement;
  link.href = window.URL.createObjectURL(file);
  link.download = file.name;
  link.click();
}
downloadSecretfile() {
  debugger
  const file = this.GenerateOrderForm.get('secretfile').value;
  const link = this.downloadSecretfileLink.nativeElement;
  link.href = window.URL.createObjectURL(file);
  link.download = file.name;
  link.click();
}

onSelectFile(event: any) {
  debugger
  console.log(event);
  console.log(event.target.files[0]);

  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.filePath = event.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }
  this.fileName = event.target.files[0].name;
  this.errorMsgUplaod = '';
  console.log(event.target.files[0]);
  this.File=event.target.files[0];
  this.GenerateOrderForm.get('IDFile')?.patchValue(event.target.files[0]);
}

onSelectSecretFile(event: any) {
  debugger
  console.log(event);
  console.log(event.target.files[0]);

  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.filePath2 = event.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }
  this.fileName2 = event.target.files[0].name;
  this.errorMsgUplaod2 = '';
  console.log(event.target.files[0]);
  this.File2=event.target.files[0];
  this.GenerateOrderForm.get('secretfile')?.patchValue(event.target.files[0]);
  
}
File: any;
 File2: any;
openMdalImage() {
  const modalRef = this.modalService.open(ModalImageComponent);
  modalRef.componentInstance.imageUploadedView = this.filePath;
}
openMdalImage2() {
  const modalRef = this.modalService.open(ModalImageComponent);
  modalRef.componentInstance.imageUploadedView = this.filePath2;
}

openMdalImageView() {
  debugger
  const modalRef = this.modalService.open(ModalImageComponent);
  modalRef.componentInstance.imageUploadedView =this.File?.files[0]?.attachmentPath;
}

PNorders:any;
GetPNOrderDetails() {

  return this.services.GetPNOrderDetails(
this.orderId)
  .subscribe((response: any) => {
    if (response) {
      this.PNorders = response.data;
      this.FillDate()
      this.isLoadingView=false;
     // this.loadInstallment();
    }
  });
}
FillDate(){
  try{
    this.GenerateOrderForm.patchValue({
      OrderId:this.PNorders.orderId,
      customername: this.PNorders.customer.customerName,
      customerphone:this.PNorders.customer.mobile,
      totalAmount:this.PNorders.totalAmount,
      pnamount: this.PNorders.pnTotalAmount,
      orderno: this.PNorders.orderId,
      orderlink: this.PNorders.orderQNTRLLink,
      branch:this.PNorders.branch.branchName,
      orderdate: this.datepipe.transform(this.PNorders.orderDate, 'yyyy-MM-dd'),
      startdate:  this.datepipe.transform(this.PNorders.startDate, 'yyyy-MM-dd'),
      numberofinstallments: this.PNorders.NumberOfInstallments,
      Guarantor: this.PNorders.gaurantor
    
    });
  
  }
  catch(x){
    console.log('Error in populaed data',x.message)
  }
  
}

InstallmentList: any = [];
installmentDueDate:any;
loadInstallment(){
  debugger
 let dueDate = new Date(this.PNorders.startDate); 
 for (let i = 1; i <= this.PNorders.numberOfInstallments; i++) {

    if (this.CMSetupData.periodBetweenPNType.trim() == 'Days') {
      dueDate.setDate(dueDate.getDate() + this.CMSetupData.periodBetweenPNValue);
    } else if (this.CMSetupData.periodBetweenPNType.trim() == 'Months') {
      dueDate.setMonth(dueDate.getMonth() + this.CMSetupData.periodBetweenPNValue);
    }
    
    let installmentAmount = this.PNorders.pnTotalAmount / this.PNorders.numberOfInstallments;
    this.InstallmentList.push({
      No: i,
      CustomerName: this.PNorders.customer.customerName,
      InstallmentAmount:Math.round(installmentAmount).toFixed(2),
      DueDate: this.datepipe.transform(dueDate, 'yyyy-MM-dd'),
      Status: 'Created'
    });
  }

}

modelPopUp(){
// const modalRef = this.modalService.open(ModalConfirmComponent);
  // modalRef.componentInstance.name = 'edit';
  // modalRef.componentInstance.semdToConfirm.subscribe((result: any) => {
  //   this.modalService.dismissAll();
    
    //this.onSubmit();
}
public installmodel: any = {};

public updateInstallment(index: number): void {
  debugger
  const item = this.InstallmentList[index];

 
  //item.CustomeName = this.myForm.get('CustomeName').value;
  if(item.InstallmentAmount != this.myForm.get('InstallmentAmount').value)
  {
    //last row change code
    if(index+1==this.InstallmentList.length)
    {
      //if(item.InstallmentAmount == this.myForm.get('InstallmentAmount').value)
     // {
        //item.InstallmentAmount = this.myForm.get('InstallmentAmount').value;
        item.DueDate = this.myForm.get('DueDate').value;
        item.Status = 'Updated'
        this.editingRowIndex = -1;
      //}
    return  

    }
    //if(item.InstallmentAmount)
    item.InstallmentAmount = Math.round(this.myForm.get('InstallmentAmount').value).toFixed(2);
    item.DueDate = this.myForm.get('DueDate').value;
    item.Status = 'Updated'
    this.editingRowIndex = -1;
    this.MakeNewInstallment(item);
  }
  else
  {
    item.InstallmentAmount = this.myForm.get('InstallmentAmount').value;
    item.DueDate = this.myForm.get('DueDate').value;
    item.Status = 'Updated'
    this.editingRowIndex = -1;

  }
}

MakeNewInstallment(index:any)
{
  let IsRun=false;
  debugger;
  if(index.No <this.InstallmentList.length)
  {
    let ptotalAmountAfterChange = 0;
    let changeAfterInstallAmount = 0;
    let changeBeforeInstallAmount= 0;
    let newInstallmentAmount=0;
    let OrderNo=0;
    let remainingNoOfInstallment=this.InstallmentList.length-index.No;
    
     for(let i=0; i<index.No; i++) 
      {
        changeBeforeInstallAmount += Number(this.InstallmentList[i].InstallmentAmount); 
      }
       //remove item from list then update new plan for installment
       this.InstallmentList  = this.InstallmentList.filter(item => item.No <= index.No && item.No <= this.InstallmentList.length);
       
       changeAfterInstallAmount = this.PNorders.pnTotalAmount-changeBeforeInstallAmount;
        newInstallmentAmount=(changeAfterInstallAmount/remainingNoOfInstallment);
        //let dueDate = new Date(this.PNorders.startDate); 
        for (let i = 1; i <= remainingNoOfInstallment; i++) {
          if(!IsRun)
          {
            OrderNo=index.No+1;
            IsRun=true;

          }else
          {
            OrderNo++;
          // if (this.CMSetupData.periodBetweenPNType.trim() == 'Days') {
          //    index.dueDate.setDate(index.dueDate.getDate() + this.CMSetupData.periodBetweenPNValue);
          // } else if (this.CMSetupData.periodBetweenPNType.trim() == 'Months') {
          //   index.dueDate.setMonth(index.dueDate.getMonth() + this.CMSetupData.periodBetweenPNValue);
          // }
          }
          this.InstallmentList.push({
            No: OrderNo,
            CustomerName: this.PNorders.customer.customerName,
            InstallmentAmount: Math.round(newInstallmentAmount).toFixed(2),
            DueDate: this.datepipe.transform(index.DueDate, 'yyyy-MM-dd'),
            Status: 'Created'
          });
        }


  }
  else
  {
    this.InstallmentList  = this.InstallmentList.filter(item => item.No <= item.No);
  }

}


public editingRowIndex = -1;

public editRow(index: number): void {
  debugger
  this.editingRowIndex = index;
  const item = this.InstallmentList[index];
  this.myForm.setValue({
    CustomerName: item.CustomerName,
    InstallmentAmount: item.InstallmentAmount,
    DueDate: item.DueDate,
    Status: item.Status
  });
 
}
cancel()
{

}

submit(){

 
  //const Data=this.GenerateOrderForm.value;
  const formData = new FormData();
   
  formData.append('OrderId',this.GenerateOrderForm.get('OrderId')?.value);
  formData.append('Guarantor ',this.GenerateOrderForm.get('Guarantor ')?.value);
  formData.append('GuarantorName',this.GenerateOrderForm.get('guarantorname')?.value);
  formData.append('GuarantorPhone', this.GenerateOrderForm.get('guarantorphone')?.value);
  formData.append('GuarantorIDNo',this.GenerateOrderForm.get('guarantoidno')?.value);
  formData.append('IDFile',this.GenerateOrderForm.get('IDFile')?.value);
  formData.append('SecretFile',this.GenerateOrderForm.get('secretfile')?.value);
  formData.append('Notes','Notes');


  this.services.GeneratePromissoryNotes(formData)
  .subscribe((response: any) => {
    if (response.isSuccess == true) {
      const modalRef = this.modalService.open(ModalMessageComponent);
      modalRef.componentInstance.type = 'success';
      modalRef.componentInstance.message = 'You have successfully generate Promissory Notes';
      modalRef.componentInstance.routeName = '/gpnorders';
     
    }
    else{
      
      console.log("Error:",response);
    }
  });
}
IsLoadInstallment:boolean=false;
  onSubmit(){

    debugger
    if (this.GenerateOrderForm.valid) {
      try{
         
        if(this.IsLoadInstallment)
         {
          const modalRef = this.modalService.open(ModalConfirmComponent);
          modalRef.componentInstance.name = 'Save';
          modalRef.componentInstance.semdToConfirm.subscribe((result: any) => {
          this.modalService.dismissAll();
          this.submit();
         });         
         }
         else
         {
          this.loadInstallment();
          this.IsLoadInstallment=true;
         }


         
      }catch(x){
           console.log("error",x.message)
      }
      

    }
    else
    {
      this.GenerateOrderForm.markAllAsTouched();
    }
  }


}
export class installmentModel {
  CustomeName: string;
  InstallmentAmount: string;
  DueDate: string;
  Status: string;
}