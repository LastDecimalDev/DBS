import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AiaComponent } from './aia.component';

describe('AiaComponent', () => {
  let component: AiaComponent;
  let fixture: ComponentFixture<AiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
