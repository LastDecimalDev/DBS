import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReligareComponent } from './religare.component';

describe('ReligareComponent', () => {
  let component: ReligareComponent;
  let fixture: ComponentFixture<ReligareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReligareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReligareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
