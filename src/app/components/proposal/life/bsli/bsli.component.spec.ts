import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsliComponent } from './bsli.component';

describe('BsliComponent', () => {
  let component: BsliComponent;
  let fixture: ComponentFixture<BsliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
