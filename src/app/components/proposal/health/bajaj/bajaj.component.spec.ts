import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BajajComponent } from './bajaj.component';

describe('BajajComponent', () => {
  let component: BajajComponent;
  let fixture: ComponentFixture<BajajComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BajajComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BajajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
