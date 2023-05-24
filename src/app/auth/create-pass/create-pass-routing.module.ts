import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePassComponent } from './create-pass.component';

const routes: Routes = [{ path: '', component: CreatePassComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatePassRoutingModule { }
