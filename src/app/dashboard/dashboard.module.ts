import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { SharedModule } from '../shared/shared.module';
import { ModalCloseSessionComponent } from './layout/modal-close-session/modal-close-session.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SidenavComponent,
    ModalCloseSessionComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],

})
export class DashboardModule { }
