/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewReservationComponent } from './new-reservation.component';

describe('NewReservationComponent', () => {
  let component: NewReservationComponent;
  let fixture: ComponentFixture<NewReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
