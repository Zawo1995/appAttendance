import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptClassPage } from './opt-class.page';

describe('OptClassPage', () => {
  let component: OptClassPage;
  let fixture: ComponentFixture<OptClassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptClassPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
