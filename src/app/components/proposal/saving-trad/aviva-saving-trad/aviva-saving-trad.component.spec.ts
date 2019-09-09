import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvivaSavingTradComponent } from './aviva-saving-trad.component';

describe('AvivaSavingTradComponent', () => {
  let component: AvivaSavingTradComponent;
  let fixture: ComponentFixture<AvivaSavingTradComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvivaSavingTradComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvivaSavingTradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
