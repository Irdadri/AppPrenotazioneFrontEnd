import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaUtente } from './crea-utente';

describe('CreaUtente', () => {
  let component: CreaUtente;
  let fixture: ComponentFixture<CreaUtente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreaUtente],
    }).compileComponents();

    fixture = TestBed.createComponent(CreaUtente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
