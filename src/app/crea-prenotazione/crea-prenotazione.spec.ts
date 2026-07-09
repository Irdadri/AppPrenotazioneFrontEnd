import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaPrenotazione } from './crea-prenotazione';

describe('CreaPrenotazione', () => {
  let component: CreaPrenotazione;
  let fixture: ComponentFixture<CreaPrenotazione>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreaPrenotazione],
    }).compileComponents();

    fixture = TestBed.createComponent(CreaPrenotazione);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
