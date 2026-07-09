import { Prenotazione } from "./Prenotazione";
import { Sede } from "./Sede";


export interface Utente {
  id: number;
  nome: string;
  cognome: string;
  email: string;
  password: string;
  telefono: string;
  tipoUtente: string;
  sede: Sede;
  listaPrenotazioni: Prenotazione[];
}