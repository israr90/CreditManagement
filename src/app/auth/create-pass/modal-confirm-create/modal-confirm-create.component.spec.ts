import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmCreateComponent } from './modal-confirm-create.component';

describe('ModalConfirmCreateComponent', () => {
  let component: ModalConfirmCreateComponent;
  let fixture: ComponentFixture<ModalConfirmCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConfirmCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalConfirmCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
