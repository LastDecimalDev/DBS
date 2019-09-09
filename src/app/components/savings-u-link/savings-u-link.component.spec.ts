import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsULinkComponent } from './savings-u-link.component';

describe('SavingsULinkComponent', () => {
  let component: SavingsULinkComponent;
  let fixture: ComponentFixture<SavingsULinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavingsULinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingsULinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
