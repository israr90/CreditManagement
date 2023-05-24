import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsetupComponent } from './cmsetup.component';
import { CmsetupRoutingModule } from './cmsetup-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CmsetupComponent
  ],
  imports: [
    CommonModule,
    CmsetupRoutingModule,
    SharedModule
  ]
})
export class CmsetupModule { }
