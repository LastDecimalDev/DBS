import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsliSavingTradComponent } from './bsli-saving-trad.component';

describe('BsliSavingTradComponent', () => {
  let component: BsliSavingTradComponent;
  let fixture: ComponentFixture<BsliSavingTradComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsliSavingTradComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsliSavingTradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
