import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationformSecComponent } from './applicationform-sec.component';

describe('ApplicationformSecComponent', () => {
  let component: ApplicationformSecComponent;
  let fixture: ComponentFixture<ApplicationformSecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationformSecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationformSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
