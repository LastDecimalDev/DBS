import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvivaCriticalIllComponent } from './aviva-critical-ill.component';

describe('AvivaCriticalIllComponent', () => {
  let component: AvivaCriticalIllComponent;
  let fixture: ComponentFixture<AvivaCriticalIllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvivaCriticalIllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvivaCriticalIllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
