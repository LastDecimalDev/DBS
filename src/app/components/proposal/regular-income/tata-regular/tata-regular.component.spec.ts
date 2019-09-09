import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TataRegularComponent } from './tata-regular.component';

describe('TataRegularComponent', () => {
  let component: TataRegularComponent;
  let fixture: ComponentFixture<TataRegularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TataRegularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TataRegularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
