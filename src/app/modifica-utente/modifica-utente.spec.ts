import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaUtente } from './modifica-utente';

describe('ModificaUtente', () => {
  let component: ModificaUtente;
  let fixture: ComponentFixture<ModificaUtente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificaUtente],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificaUtente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
