import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingTradComponent } from './saving-trad.component';

describe('SavingTradComponent', () => {
  let component: SavingTradComponent;
  let fixture: ComponentFixture<SavingTradComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavingTradComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingTradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
