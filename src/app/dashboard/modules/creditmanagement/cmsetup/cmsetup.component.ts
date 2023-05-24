import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CmSetupService } from './services/cmsetup.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalMessageComponent } from 'src/app/shared/components/modal-message/modal-message.component';
import { SharedService } from 'src/app/services/shared.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-cmsetup',
  templateUrl: './cmsetup.component.html',
  styleUrls: ['./cmsetup.component.scss']
})
export class CmsetupComponent{
  CmSetupForm: FormGroup;
  FormShow:boolean=true;

constructor(private formBuilder: FormBuilder,
  private CMServices:CmSetupService, private modalService: NgbModal,   public headerService: HeaderService)
{

  
}
initCmSetupForm() {
 
  this.CmSetupForm = this.formBuilder.group({
    periodBetweenPNType: new FormControl('', Validators.required),
    periodBetweenPNValue: new FormControl('',),
    overDueAlertType: new FormControl('', Validators.required),
    overDueAlertTypeValue: new FormControl('', ),
    managePNWithin: new FormControl('', Validators.required),
    daysInput : new FormControl('', [Validators.required]),
    monthsInput : new FormControl('', [Validators.required]),
    overDueAlertTypeDaysInput : new FormControl('', [Validators.required,Validators.pattern(/^\d+$/),]),
    overDueAlertTypeMonthsInput : new FormControl('', [Validators.required,Validators.pattern(/^\d+$/),])
    
  });
  // this.CmSetupForm = this.fb.group({
  //   id: [''],
  //   periodBetweenPNType: ['', Validators.required],
  //   periodBetweenPNValue: ['', Validators.required],
  //   daysInput: ['', Validators.required],
  //   monthsInput: ['', Validators.required],
  //   overDueAlertType: ['', Validators.required],
  //   overDueAlertTypeValue: ['', Validators.required],
  //   managePNWithin: ['']
  // });
}
ngOnInit(): void {
  
  this.headerService.setTitle('Credit Management Setup');
  debugger
  this.initCmSetupForm()
  this.GetCMSetup();
  this.CmSetupForm.controls['periodBetweenPNType'].valueChanges.subscribe(
    (value: string) => {
      debugger;
      // Set the "required" validator on the corresponding input field
      if (value === 'Days') {
        this.CmSetupForm.controls['daysInput'].setValidators([
          Validators.required,
          Validators.pattern(/^\d+$/),
        ]);
        this.CmSetupForm.controls['monthsInput'].clearValidators();
        this.CmSetupForm.get('monthsInput').reset();
        
      } 
      else if (value === 'Months') {
        this.CmSetupForm.controls['monthsInput'].setValidators([
          Validators.required,
          Validators.pattern(/^\d+$/),
        ]);
        this.CmSetupForm.controls['daysInput'].clearValidators();
        this.CmSetupForm.get('daysInput').reset();
      }
      // Update the input fields with the new validators
      this.CmSetupForm.controls['daysInput'].updateValueAndValidity();
      this.CmSetupForm.controls['monthsInput'].updateValueAndValidity();
    }
  );
  this.CmSetupForm.controls['overDueAlertType'].valueChanges.subscribe(
    (value: string) => {
      debugger;
      // Set the "required" validator on the corresponding input field
      if (value === 'Days') {
        this.CmSetupForm.controls['overDueAlertTypeDaysInput'].setValidators([
          Validators.required,
          Validators.pattern(/^\d+$/),
        ]);
        this.CmSetupForm.controls['overDueAlertTypeMonthsInput'].clearValidators();
        this.CmSetupForm.get('overDueAlertTypeMonthsInput').reset();
      } else if (value === 'Months') {
        this.CmSetupForm.controls['overDueAlertTypeMonthsInput'].setValidators([
          Validators.required,
          Validators.pattern(/^\d+$/),
        ]);
        this.CmSetupForm.controls['overDueAlertTypeDaysInput'].clearValidators();
        this.CmSetupForm.get('overDueAlertTypeDaysInput').reset();
      }
      // Update the input fields with the new validators
      this.CmSetupForm.controls['overDueAlertTypeDaysInput'].updateValueAndValidity();
      this.CmSetupForm.controls['overDueAlertTypeMonthsInput'].updateValueAndValidity();
    }
  );
  

}
CMSetupData:any;
daysInput:string='';
monthsInput:string='';
overDueAlertTypeDaysInput:any;
overDueAlertTypeMonthsInput:any;
GetCMSetup()
{
  debugger;
    this.CMServices
      .GetCmSetUp()
      .subscribe((response: any) => {
        if (response.isSuccess == true) {
          debugger

          
          this.CMSetupData = response.data[0];
          if(this.CMSetupData.periodBetweenPNType=='Days'){
              this.daysInput=this.CMSetupData.periodBetweenPNValue;
              this.monthsInput='';
          }
          else
          {
            this.monthsInput=this.CMSetupData.periodBetweenPNValue;
          }
          if(this.CMSetupData.overDueAlertType=='Days'){
            this.overDueAlertTypeDaysInput=this.CMSetupData.overDueAlertTypeValue;
            this.monthsInput='';
        }
        else
        {
          this.overDueAlertTypeDaysInput='';
          this.overDueAlertTypeMonthsInput=this.CMSetupData.overDueAlertTypeValue;
        }


          try
          {
            this.CmSetupForm.patchValue({
              //id: this.CMSetupData.id,
              periodBetweenPNType:this.CMSetupData.periodBetweenPNType,
              periodBetweenPNValue:this.CMSetupData.periodBetweenPNValue,
              daysInput:this.daysInput,
              monthsInput:this.monthsInput,
              overDueAlertType: this.CMSetupData.overDueAlertType,
              overDueAlertTypeValue: this.CMSetupData.overDueAlertTypeValue,
              managePNWithin: this.CMSetupData.managePNWithin,
              overDueAlertTypeDaysInput :this.overDueAlertTypeDaysInput,
              overDueAlertTypeMonthsInput :this.overDueAlertTypeMonthsInput

            });
          }catch(x)
          {
console.log("error:",x.message)
          }
          
        }
      });
}

PromissoryHideShow(){
  if(this.FormShow){
     this.FormShow=false;
  }else
  {
    this.FormShow=true;
  }
}
onSubmit(){
debugger;
  if (this.CmSetupForm.valid) {
       let  periodBetweenPNValue;
       let overDueAlertTypeValue;
       let periodBetweenPNType=this.CmSetupForm.get('periodBetweenPNType').value;
    if(periodBetweenPNType=='Days')
    {
      periodBetweenPNValue=this.CmSetupForm.get('daysInput').value;
    }
    else
    {
      periodBetweenPNValue=this.CmSetupForm.get('monthsInput').value;
    }
    if(this.CmSetupForm.get('overDueAlertType').value=='Days')
    {
      overDueAlertTypeValue =this.CmSetupForm.get('overDueAlertTypeDaysInput').value;
    }else
    {
      overDueAlertTypeValue =this.CmSetupForm.get('overDueAlertTypeMonthsInput').value;
    }

    const formData = new FormData();
   
  formData.append('PeriodBetweenPNType',this.CmSetupForm.get('periodBetweenPNType').value);
  formData.append('PeriodBetweenPNValue',periodBetweenPNValue);
  formData.append('OverDueAlertType',this.CmSetupForm.get('overDueAlertType').value);
  formData.append('OverDueAlertTypeValue',overDueAlertTypeValue);
  formData.append('ManagePNWithin',this.CmSetupForm.get('managePNWithin').value);
    // const formData = {
      
    //   PeriodBetweenPNType: this.CmSetupForm.get('periodBetweenPNType').value,
    //   PeriodBetweenPNValue:periodBetweenPNValue,
      // daysInput:this.daysInput,
      // monthsInput:this.monthsInput,
      // OverDueAlertType: this.CmSetupForm.get('overDueAlertType').value,
      // OverDueAlertTypeValue: overDueAlertTypeValue,
      // ManagePNWithin: this.CmSetupForm.get('managePNWithin').value,
      // overDueAlertTypeDaysInput :this.overDueAlertTypeDaysInput,
      // overDueAlertTypeMonthsInput :this.overDueAlertTypeMonthsInput
    //};

    this.CMServices.UpdateCmSetUp(formData)
    .subscribe((response: any) => {
      if (response.isSuccess == true) {
        const modalRef = this.modalService.open(ModalMessageComponent);
        modalRef.componentInstance.type = 'success';
        modalRef.componentInstance.message = 'CM Setup updated successfully.';
        modalRef.componentInstance.routeName = '/cmsetup';
        this.EditMode=false;
       // this.router.navigateByUrl('/workorders/details/'+this.workOrder.orderId);
      }
      else{
        console.log(response);
      }
    });

   }
   else{
    this.CmSetupForm.markAllAsTouched();
    return;
  }
}
EditMode:boolean=false;
editMode(){
this.EditMode=true;
}

formatInput(event){
  const regex = /^([1-9]\d*)(\.\d{1,2})?$/; // regular expression to format input to 2 decimal places and disallow zero and leading zeros
  let currentValue = event.target.value;
    
  const newValue = currentValue.replace(',', '.').match(regex); // replace comma with dot and apply regex
    
  if (newValue === null) {
    // if input is invalid, reset value to empty string
    event.target.value = '';
  } else {
    const formattedValue = newValue[0];
    // if (parseFloat(formattedValue) > 1000) {
    //   // if value is greater than 100, reset value to 100
    //   event.target.value = '1000';
    // } else {
      event.target.value = formattedValue;
   // }
  }
 
}






 
}
