import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvivaRegularComponent } from './aviva-regular.component';

describe('AvivaRegularComponent', () => {
  let component: AvivaRegularComponent;
  let fixture: ComponentFixture<AvivaRegularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvivaRegularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvivaRegularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
