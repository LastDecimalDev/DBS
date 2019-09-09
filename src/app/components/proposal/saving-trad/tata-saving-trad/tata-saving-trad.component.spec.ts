import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TataSavingTradComponent } from './tata-saving-trad.component';

describe('TataSavingTradComponent', () => {
  let component: TataSavingTradComponent;
  let fixture: ComponentFixture<TataSavingTradComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TataSavingTradComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TataSavingTradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
