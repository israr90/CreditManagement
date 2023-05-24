import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCloseSessionComponent } from './modal-close-session.component';

describe('ModalCloseSessionComponent', () => {
  let component: ModalCloseSessionComponent;
  let fixture: ComponentFixture<ModalCloseSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCloseSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCloseSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
