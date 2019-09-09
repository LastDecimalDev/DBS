import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsliOfflineComponent } from './bsli-offline.component';

describe('BsliOfflineComponent', () => {
  let component: BsliOfflineComponent;
  let fixture: ComponentFixture<BsliOfflineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsliOfflineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsliOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
