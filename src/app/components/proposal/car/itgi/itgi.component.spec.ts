import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItgiComponent } from './itgi.component';

describe('ItgiComponent', () => {
  let component: ItgiComponent;
  let fixture: ComponentFixture<ItgiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItgiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItgiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
