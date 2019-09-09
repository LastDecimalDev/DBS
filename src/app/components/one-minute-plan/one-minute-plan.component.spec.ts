import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneMinutePlanComponent } from './one-minute-plan.component';

describe('OneMinutePlanComponent', () => {
  let component: OneMinutePlanComponent;
  let fixture: ComponentFixture<OneMinutePlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneMinutePlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneMinutePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
