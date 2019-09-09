import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RgiComponent } from './rgi.component';

describe('RgiComponent', () => {
  let component: RgiComponent;
  let fixture: ComponentFixture<RgiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RgiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RgiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
