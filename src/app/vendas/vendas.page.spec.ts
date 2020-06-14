import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendasPage } from './vendas.page';

describe('VendasPage', () => {
  let component: VendasPage;
  let fixture: ComponentFixture<VendasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
