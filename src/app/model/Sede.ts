import { Stanza } from "./Stanza";


export interface Sede {
  id: number;
  paese: string;
  citta: string;
  regione: string;
  indirizzo: string;
  listStanze: Stanza[];
}