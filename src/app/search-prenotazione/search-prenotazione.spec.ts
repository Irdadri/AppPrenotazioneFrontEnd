import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPrenotazione } from './search-prenotazione';

describe('SearchPrenotazione', () => {
  let component: SearchPrenotazione;
  let fixture: ComponentFixture<SearchPrenotazione>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPrenotazione],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPrenotazione);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
