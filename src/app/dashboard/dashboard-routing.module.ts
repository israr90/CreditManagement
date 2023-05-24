import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  // { path: '', redirectTo: '/branches', pathMatch: 'full' },
  // { path: '', redirectTo: '/opening-register', pathMatch: 'full' },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'pnorders',
        loadChildren: () =>
          import('./modules/promissorynote/pnorders/pnorders.module').then(
            (m) => m.PnOrdersModule
          ),
      },
      {
        path: 'gpnorders',
        loadChildren: () =>
          import('./modules/generatepromissorynote/gpnorders/gpnorders.module').then(
            (m) => m.GPnOrdersModule
          ),
      },
      {
        path: 'cmsetup',
        loadChildren: () =>
          import('./modules/creditmanagement/cmsetup/cmsetup.module').then(
            (m) => m.CmsetupModule
          ),
      },
      // {
      //   path: 'pnorders',
      //   loadChildren: () =>
      //     import('./modules/promissorynotes/pnorders/pnorders.module').then(
      //       (m) => m.PnOrdersModule
      //     ),
      // },
 
 
      
     
      {
        path: 'profile',
        loadChildren: () =>
          import('./modules/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
