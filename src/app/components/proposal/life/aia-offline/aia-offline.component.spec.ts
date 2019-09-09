import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AiaOfflineComponent } from './aia-offline.component';

describe('AiaOfflineComponent', () => {
  let component: AiaOfflineComponent;
  let fixture: ComponentFixture<AiaOfflineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AiaOfflineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AiaOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
