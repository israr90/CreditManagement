import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { HttpserviceService } from './services/httpservice.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthGuard } from 'src/app/services/auth.guard';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { HeaderService } from 'src/app/services/header.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CharacterDirective } from './services/character.directive';

@NgModule({
  declarations: [AppComponent, CharacterDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng2TelInputModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    FontAwesomeModule,
    PaginationModule,
    NgSelectModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAAQ7GPIxJs5PTBccmO9OZwBUy464p59bY',
      libraries: ['places'],
    }),
  ],
  providers: [HttpserviceService, AuthGuard, HeaderService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
