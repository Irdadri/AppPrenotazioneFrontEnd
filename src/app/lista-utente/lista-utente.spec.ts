import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaUtente } from './lista-utente';

describe('ListaUtente', () => {
  let component: ListaUtente;
  let fixture: ComponentFixture<ListaUtente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaUtente],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaUtente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
