import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogGuard } from '../../services/log.guard';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [LogGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
