import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvivaComponent } from './aviva.component';

describe('AvivaComponent', () => {
  let component: AvivaComponent;
  let fixture: ComponentFixture<AvivaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvivaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
