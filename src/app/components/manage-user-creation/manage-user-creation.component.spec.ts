import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserCreationComponent } from './manage-user-creation.component';

describe('ManageUserCreationComponent', () => {
  let component: ManageUserCreationComponent;
  let fixture: ComponentFixture<ManageUserCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageUserCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUserCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
