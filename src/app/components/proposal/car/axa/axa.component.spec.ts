import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxaComponent } from './axa.component';

describe('AxaComponent', () => {
  let component: AxaComponent;
  let fixture: ComponentFixture<AxaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
