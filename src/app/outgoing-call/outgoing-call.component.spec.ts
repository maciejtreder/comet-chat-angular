import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutgoingCallComponent } from './outgoing-call.component';

describe('OutgoingCallComponent', () => {
  let component: OutgoingCallComponent;
  let fixture: ComponentFixture<OutgoingCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutgoingCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutgoingCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
