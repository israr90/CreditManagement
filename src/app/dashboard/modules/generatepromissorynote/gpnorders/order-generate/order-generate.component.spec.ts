import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderGenerateComponent } from './order-generate.component';

describe('OrderGenerateComponent', () => {
  let component: OrderGenerateComponent;
  let fixture: ComponentFixture<OrderGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderGenerateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
