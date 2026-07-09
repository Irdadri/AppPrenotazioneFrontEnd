import { Prenotazione } from "./Prenotazione";


export interface Postazione {
  id: number;
  manutenzione: boolean;
  listaPrenotazioni: Prenotazione[];
}