import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsetupComponent } from './cmsetup.component';

describe('CmsetupComponent', () => {
  let component: CmsetupComponent;
  let fixture: ComponentFixture<CmsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
