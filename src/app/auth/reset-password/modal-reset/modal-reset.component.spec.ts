import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalResetComponent } from './modal-reset.component';

describe('ModalResetComponent', () => {
  let component: ModalResetComponent;
  let fixture: ComponentFixture<ModalResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalResetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
