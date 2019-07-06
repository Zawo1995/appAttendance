import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClassDetailPage } from './create-class-detail.page';

describe('CreateClassDetailPage', () => {
  let component: CreateClassDetailPage;
  let fixture: ComponentFixture<CreateClassDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateClassDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClassDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
