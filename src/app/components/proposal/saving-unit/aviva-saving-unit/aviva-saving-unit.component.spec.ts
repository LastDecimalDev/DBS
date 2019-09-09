import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvivaSavingUnitComponent } from './aviva-saving-unit.component';

describe('AvivaSavingUnitComponent', () => {
  let component: AvivaSavingUnitComponent;
  let fixture: ComponentFixture<AvivaSavingUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvivaSavingUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvivaSavingUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
