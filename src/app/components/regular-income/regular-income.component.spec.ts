import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularIncomeComponent } from './regular-income.component';

describe('RegularIncomeComponent', () => {
  let component: RegularIncomeComponent;
  let fixture: ComponentFixture<RegularIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegularIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
