import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvivaChildEduComponent } from './aviva-child-edu.component';

describe('AvivaChildEduComponent', () => {
  let component: AvivaChildEduComponent;
  let fixture: ComponentFixture<AvivaChildEduComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvivaChildEduComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvivaChildEduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
