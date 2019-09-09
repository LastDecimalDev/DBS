import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharableLinkComponent } from './sharable-link.component';

describe('SharableLinkComponent', () => {
  let component: SharableLinkComponent;
  let fixture: ComponentFixture<SharableLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharableLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharableLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
