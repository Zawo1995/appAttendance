import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartSignPage } from './start-sign.page';

describe('StartSignPage', () => {
  let component: StartSignPage;
  let fixture: ComponentFixture<StartSignPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartSignPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartSignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
