import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TataSavingUnitComponent } from './tata-saving-unit.component';

describe('TataSavingUnitComponent', () => {
  let component: TataSavingUnitComponent;
  let fixture: ComponentFixture<TataSavingUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TataSavingUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TataSavingUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
