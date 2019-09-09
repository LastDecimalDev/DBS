import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsliRegularComponent } from './bsli-regular.component';

describe('BsliRegularComponent', () => {
  let component: BsliRegularComponent;
  let fixture: ComponentFixture<BsliRegularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsliRegularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsliRegularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
