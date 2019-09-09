import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvivaCarComponent } from './aviva-car.component';

describe('AvivaCarComponent', () => {
  let component: AvivaCarComponent;
  let fixture: ComponentFixture<AvivaCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvivaCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvivaCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
