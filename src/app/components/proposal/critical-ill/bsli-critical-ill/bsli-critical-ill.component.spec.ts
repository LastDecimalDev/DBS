import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsliCriticalIllComponent } from './bsli-critical-ill.component';

describe('BsliCriticalIllComponent', () => {
  let component: BsliCriticalIllComponent;
  let fixture: ComponentFixture<BsliCriticalIllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsliCriticalIllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsliCriticalIllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
