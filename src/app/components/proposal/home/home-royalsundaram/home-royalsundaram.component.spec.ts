import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRoyalsundaramComponent } from './home-royalsundaram.component';

describe('HomeRoyalsundaramComponent', () => {
  let component: HomeRoyalsundaramComponent;
  let fixture: ComponentFixture<HomeRoyalsundaramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeRoyalsundaramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRoyalsundaramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
