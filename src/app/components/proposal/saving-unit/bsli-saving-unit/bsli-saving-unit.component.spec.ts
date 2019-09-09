import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsliSavingUnitComponent } from './bsli-saving-unit.component';

describe('BsliSavingUnitComponent', () => {
  let component: BsliSavingUnitComponent;
  let fixture: ComponentFixture<BsliSavingUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsliSavingUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsliSavingUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
