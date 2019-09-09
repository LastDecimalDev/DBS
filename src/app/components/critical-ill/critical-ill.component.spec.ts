import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticalIllComponent } from './critical-ill.component';

describe('CriticalIllComponent', () => {
  let component: CriticalIllComponent;
  let fixture: ComponentFixture<CriticalIllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriticalIllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriticalIllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
