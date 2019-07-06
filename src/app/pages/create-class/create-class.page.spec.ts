import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClassPage } from './create-class.page';

describe('CreateClassPage', () => {
  let component: CreateClassPage;
  let fixture: ComponentFixture<CreateClassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateClassPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
