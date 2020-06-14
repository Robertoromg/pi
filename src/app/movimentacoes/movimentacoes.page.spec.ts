import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentacoesPage } from './movimentacoes.page';

describe('MovimentacoesPage', () => {
  let component: MovimentacoesPage;
  let fixture: ComponentFixture<MovimentacoesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimentacoesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimentacoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
