import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmsetupComponent } from './cmsetup.component';

const routes: Routes = [{ path: '', component: CmsetupComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsetupRoutingModule { }
