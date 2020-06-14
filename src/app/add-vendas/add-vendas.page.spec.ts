import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendasPage } from './add-vendas.page';

describe('AddVendasPage', () => {
  let component: AddVendasPage;
  let fixture: ComponentFixture<AddVendasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVendasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVendasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
