import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoIpAddressComponent } from './no-ip-address.component';

describe('NoIpAddressComponent', () => {
  let component: NoIpAddressComponent;
  let fixture: ComponentFixture<NoIpAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoIpAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoIpAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
