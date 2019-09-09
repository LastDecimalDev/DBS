import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HdfcComponent } from './hdfc.component';

describe('HdfcComponent', () => {
  let component: HdfcComponent;
  let fixture: ComponentFixture<HdfcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HdfcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HdfcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
