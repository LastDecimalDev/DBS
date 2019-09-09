import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TataChildEduComponent } from './tata-child-edu.component';

describe('TataChildEduComponent', () => {
  let component: TataChildEduComponent;
  let fixture: ComponentFixture<TataChildEduComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TataChildEduComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TataChildEduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
