import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarInsuComponent } from './car-insu.component';

describe('CarInsuComponent', () => {
  let component: CarInsuComponent;
  let fixture: ComponentFixture<CarInsuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarInsuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarInsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
