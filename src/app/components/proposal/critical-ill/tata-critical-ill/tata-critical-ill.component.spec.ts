import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TataCriticalIllComponent } from './tata-critical-ill.component';

describe('TataCriticalIllComponent', () => {
  let component: TataCriticalIllComponent;
  let fixture: ComponentFixture<TataCriticalIllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TataCriticalIllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TataCriticalIllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
