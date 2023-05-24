import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PnOrdersComponent } from './pnorders.component';


describe('CollectComponent', () => {
  let component: PnOrdersComponent;
  let fixture: ComponentFixture<PnOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PnOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PnOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
