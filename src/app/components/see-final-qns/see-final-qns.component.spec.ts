import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeFinalQnsComponent } from './see-final-qns.component';

describe('SeeFinalQnsComponent', () => {
  let component: SeeFinalQnsComponent;
  let fixture: ComponentFixture<SeeFinalQnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeFinalQnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeFinalQnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
