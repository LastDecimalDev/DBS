import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyPageComponent } from './policy-page.component';

describe('PolicyPageComponent', () => {
  let component: PolicyPageComponent;
  let fixture: ComponentFixture<PolicyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
