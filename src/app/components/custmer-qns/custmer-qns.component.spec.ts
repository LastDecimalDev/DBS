import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustmerQnsOneComponent } from './custmer-qnsOne.component';

describe('CustmerQnsComponent', () => {
  let component: CustmerQnsOneComponent;
  let fixture: ComponentFixture<CustmerQnsOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustmerQnsOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustmerQnsOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
