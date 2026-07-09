import { Postazione } from "./Postazione";


export interface Stanza {
  id: number;
  listaPostazioni: Postazione[];
  nstanza: string;
}