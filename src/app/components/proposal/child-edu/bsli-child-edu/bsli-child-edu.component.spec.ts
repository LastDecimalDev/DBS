import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsliChildEduComponent } from './bsli-child-edu.component';

describe('BsliChildEduComponent', () => {
  let component: BsliChildEduComponent;
  let fixture: ComponentFixture<BsliChildEduComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsliChildEduComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsliChildEduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
