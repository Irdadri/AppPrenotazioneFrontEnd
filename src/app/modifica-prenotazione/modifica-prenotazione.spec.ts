import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaPrenotazione } from './modifica-prenotazione';

describe('ModificaPrenotazione', () => {
  let component: ModificaPrenotazione;
  let fixture: ComponentFixture<ModificaPrenotazione>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificaPrenotazione],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificaPrenotazione);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
