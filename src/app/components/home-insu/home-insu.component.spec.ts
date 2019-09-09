import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeInsuComponent } from './home-insu.component';

describe('HomeInsuComponent', () => {
  let component: HomeInsuComponent;
  let fixture: ComponentFixture<HomeInsuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeInsuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeInsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
