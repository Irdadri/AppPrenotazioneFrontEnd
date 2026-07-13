import { IColumnDef } from "./IColumnDef";
import { PrenotazioneDTO } from "./PrenotazioneDTO";
import { UtenteDTO } from "./UtenteDTO";

export const MANAGER_TABLE_COLUMNS: IColumnDef<PrenotazioneDTO>[] = [
  { header: 'codice prenotazione', field: 'id' },
  { header: 'nome utente', field: 'nomeUtente', visible: true },
  { header: 'cognome utente', field: 'cognomeUtente' , visible: true},
  { header: 'citta', field: 'citta' },
  { header: 'indirizzo', field: 'indirizzo' },
  { header: 'numero stanza', field: 'nstanza' },
  { header: 'numero postazione', field: 'npostazione' }
] ;



export const USER_TABLE_COLUMNS: IColumnDef<PrenotazioneDTO>[] = [
  { header: 'codice prenotazione', field: 'id' },
  { header: 'nome utente', field: 'nomeUtente', visible: false },
  { header: 'cognome utente', field: 'cognomeUtente' , visible: false},
  { header: 'citta', field: 'citta' },
  { header: 'indirizzo', field: 'indirizzo' },
  { header: 'numero stanza', field: 'nstanza' },
  { header: 'numero postazione', field: 'npostazione' }
] ;


export const USER_LIST: IColumnDef<UtenteDTO>[] = [
  { header: 'Nome', field: 'nome', visible: true },
  { header: 'Cognome', field: 'cognome', visible: true },
  { header: 'Email', field: 'email', visible: true },
  { header: 'Telefono', field: 'telefono', visible: true },
  { header: 'Tipo Utente', field: 'tipoUtente', visible: true },
  { header: 'Paese', field: 'paese', visible: true },
  { header: 'Città', field: 'citta', visible: true },
  { header: 'Regione', field: 'regione', visible: true },
  { header: 'Indirizzo', field: 'indirizzo', visible: true }
];