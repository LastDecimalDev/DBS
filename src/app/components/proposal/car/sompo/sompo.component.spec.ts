import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SompoComponent } from './sompo.component';

describe('SompoComponent', () => {
  let component: SompoComponent;
  let fixture: ComponentFixture<SompoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SompoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SompoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
