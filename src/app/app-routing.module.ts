import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'CreatePassword',
    loadChildren: () =>
      import('./auth/create-pass/create-pass.module').then(
        (m) => m.CreatePassModule
      ),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./auth/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
  },
  {
    path: 'createPassword2',
    loadChildren: () =>
      import('./auth/create-password/create-password.module').then(
        (m) => m.CreatePasswordModule
      ),
  },
  {
    path: 'ResetPassword',
    loadChildren: () =>
      import('./auth/reset-password/reset-password.module').then(
        (m) => m.ResetPasswordModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
