import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoyalSundaramComponent } from './royal-sundaram.component';

describe('RoyalSundaramComponent', () => {
  let component: RoyalSundaramComponent;
  let fixture: ComponentFixture<RoyalSundaramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoyalSundaramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoyalSundaramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
