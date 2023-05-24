import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPayDoneComponent } from './modal-pay-done.component';

describe('ModalPayDoneComponent', () => {
  let component: ModalPayDoneComponent;
  let fixture: ComponentFixture<ModalPayDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPayDoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPayDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
