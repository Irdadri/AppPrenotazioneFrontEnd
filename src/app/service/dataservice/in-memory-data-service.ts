import { Service } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { PrenotazioneDTO } from '../../model/PrenotazioneDTO';
import { PrenotazioneRequest } from '../../model/PrenotazioneRequest';
import { PrenotazioniFiltro } from '../../model/PrenotazioniFiltro';
import { UtenteDTO } from '../../model/UtenteDTO';
import { UtenteFiltro } from '../../model/UtenteFiltro';
import { UtenteRequest } from '../../model/UtenteRequest';
@Service()
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        console.log('CREATE DB ATTIVATO');
        const PRENOTAZIONI_MARIO_MOCK = {
            content: [
                {
                    id: 1,
                    nomeUtente: "Mario",
                    cognomeUtente: "Rossi",
                    citta: "Roma",
                    indirizzo: "Via Roma 10",
                    nStanza: "A101",
                    nPostazione: 1,
                    dataInizio: "2026-07-10",
                    dataFine: "2026-07-12",
                    stato: "Confermata"
                },
                {
                    id: 4,
                    nomeUtente: "Mario",
                    cognomeUtente: "Rossi",
                    citta: "Roma",
                    indirizzo: "Via Roma 10",
                    nStanza: "A102",
                    nPostazione: 5,
                    dataInizio: "2026-08-01",
                    dataFine: "2026-08-03",
                    stato: "Confermata"
                },
                {
                    id: 12,
                    nomeUtente: "Mario",
                    cognomeUtente: "Rossi",
                    citta: "Roma",
                    indirizzo: "Via Roma 10",
                    nStanza: "C301",
                    nPostazione: 9,
                    dataInizio: "2026-08-15",
                    dataFine: "2026-08-16",
                    stato: "Confermata"
                }
            ],
            pageable: {
                pageNumber: 0,
                pageSize: 3,
                sort: {
                    sorted: false,
                    unsorted: true,
                    empty: true
                },
                offset: 0,
                paged: true,
                unpaged: false
            },
            totalElements: 3,
            totalPages: 1,
            last: true,
            first: true,
            size: 3,
            number: 0,
            numberOfElements: 3,
            sort: {
                sorted: false,
                unsorted: true,
                empty: true
            },
            empty: false
        };
        const PRENOTAZIONI_MOCK = [
            {
                id: 1,
                nomeUtente: "Mario",
                cognomeUtente: "Rossi",
                citta: "Roma",
                indirizzo: "Via Roma 10",
                nStanza: "A101",
                nPostazione: 1,
                dataInizio: "2026-07-10",
                dataFine: "2026-07-12",
                stato: "Confermata"
            },
            {
                id: 2,
                nomeUtente: "Giulia",
                cognomeUtente: "Bianchi",
                citta: "Milano",
                indirizzo: "Via Dante 25",
                nStanza: "B203",
                nPostazione: 2,
                dataInizio: "2026-07-11",
                dataFine: "2026-07-11",
                stato: "Confermata"
            },
            {
                id: 3,
                nomeUtente: "Luca",
                cognomeUtente: "Verdi",
                citta: "Torino",
                indirizzo: "Corso Francia 50",
                nStanza: "C105",
                nPostazione: 3,
                dataInizio: "2026-07-15",
                dataFine: "2026-07-16",
                stato: "In attesa"
            },
            {
                id: 4,
                nomeUtente: "Mario",
                cognomeUtente: "Rossi",
                citta: "Roma",
                indirizzo: "Via Roma 10",
                nStanza: "A102",
                nPostazione: 5,
                dataInizio: "2026-08-01",
                dataFine: "2026-08-03",
                stato: "Confermata"
            },
            {
                id: 5,
                nomeUtente: "Anna",
                cognomeUtente: "Neri",
                citta: "Napoli",
                indirizzo: "Via Toledo 100",
                nStanza: "D210",
                nPostazione: 1,
                dataInizio: "2026-07-18",
                dataFine: "2026-07-20",
                stato: "Annullata"
            },
            {
                id: 6,
                nomeUtente: "Francesco",
                cognomeUtente: "Esposito",
                citta: "Bari",
                indirizzo: "Via Sparano 15",
                nStanza: "A103",
                nPostazione: 4,
                dataInizio: "2026-07-22",
                dataFine: "2026-07-24",
                stato: "Confermata"
            },
            {
                id: 7,
                nomeUtente: "Sara",
                cognomeUtente: "Romano",
                citta: "Palermo",
                indirizzo: "Via Libertà 70",
                nStanza: "B110",
                nPostazione: 6,
                dataInizio: "2026-07-25",
                dataFine: "2026-07-26",
                stato: "In attesa"
            },
            {
                id: 8,
                nomeUtente: "Davide",
                cognomeUtente: "Greco",
                citta: "Catania",
                indirizzo: "Via Etnea 120",
                nStanza: "C220",
                nPostazione: 2,
                dataInizio: "2026-07-27",
                dataFine: "2026-07-29",
                stato: "Confermata"
            },
            {
                id: 9,
                nomeUtente: "Elena",
                cognomeUtente: "Ferrari",
                citta: "Verona",
                indirizzo: "Via Mazzini 30",
                nStanza: "D101",
                nPostazione: 3,
                dataInizio: "2026-08-02",
                dataFine: "2026-08-04",
                stato: "Confermata"
            },
            {
                id: 10,
                nomeUtente: "Chiara",
                cognomeUtente: "Conti",
                citta: "Firenze",
                indirizzo: "Via de' Tornabuoni 12",
                nStanza: "A201",
                nPostazione: 8,
                dataInizio: "2026-08-05",
                dataFine: "2026-08-06",
                stato: "Confermata"
            },
            {
                id: 11,
                nomeUtente: "Giulia",
                cognomeUtente: "Bianchi",
                citta: "Milano",
                indirizzo: "Via Dante 25",
                nStanza: "B205",
                nPostazione: 7,
                dataInizio: "2026-08-10",
                dataFine: "2026-08-12",
                stato: "Annullata"
            },
            {
                id: 12,
                nomeUtente: "Mario",
                cognomeUtente: "Rossi",
                citta: "Roma",
                indirizzo: "Via Roma 10",
                nStanza: "C301",
                nPostazione: 9,
                dataInizio: "2026-08-15",
                dataFine: "2026-08-16",
                stato: "Confermata"
            },
            {
                id: 13,
                nomeUtente: "Francesco",
                cognomeUtente: "Esposito",
                citta: "Bari",
                indirizzo: "Via Sparano 15",
                nStanza: "D115",
                nPostazione: 2,
                dataInizio: "2026-08-18",
                dataFine: "2026-08-20",
                stato: "In attesa"
            },
            {
                id: 14,
                nomeUtente: "Sara",
                cognomeUtente: "Romano",
                citta: "Palermo",
                indirizzo: "Via Libertà 70",
                nStanza: "A305",
                nPostazione: 5,
                dataInizio: "2026-08-22",
                dataFine: "2026-08-24",
                stato: "Confermata"
            },
            {
                id: 15,
                nomeUtente: "Luca",
                cognomeUtente: "Verdi",
                citta: "Torino",
                indirizzo: "Corso Francia 50",
                nStanza: "B120",
                nPostazione: 1,
                dataInizio: "2026-08-28",
                dataFine: "2026-08-30",
                stato: "Confermata"
            }
        ];
        const PRENOTAZIONI_PAGE_0 = {
            content: PRENOTAZIONI_MOCK.slice(0, 5),
            totalElements: 15,
            totalPages: 3,
            size: 5,
            number: 0,
            numberOfElements: 5,
            first: true,
            last: false,
            empty: false
        };

        const PRENOTAZIONI_PAGE_1 = {
            content: PRENOTAZIONI_MOCK.slice(5, 10),
            totalElements: 15,
            totalPages: 3,
            size: 5,
            number: 1,
            numberOfElements: 5,
            first: false,
            last: false,
            empty: false
        };

        const PRENOTAZIONI_PAGE_2 = {
            content: PRENOTAZIONI_MOCK.slice(10, 15),
            totalElements: 15,
            totalPages: 3,
            size: 5,
            number: 2,
            numberOfElements: 5,
            first: false,
            last: true,
            empty: false
        };

        const UTENTI_MOCK: UtenteDTO[] = [
            {
                nome: "Mario",
                cognome: "Rossi",
                email: "mario.rossi@email.com",
                telefono: "3331234567",
                tipoUtente: "Cliente",
                paese: "Italia",
                citta: "Roma",
                regione: "Lazio",
                indirizzo: "Via Roma 10"
            },
            {
                nome: "Giulia",
                cognome: "Bianchi",
                email: "giulia.bianchi@email.com",
                telefono: "3332345678",
                tipoUtente: "Amministratore",
                paese: "Italia",
                citta: "Milano",
                regione: "Lombardia",
                indirizzo: "Via Dante 25"
            },
            {
                nome: "Luca",
                cognome: "Verdi",
                email: "luca.verdi@email.com",
                telefono: "3333456789",
                tipoUtente: "Cliente",
                paese: "Italia",
                citta: "Torino",
                regione: "Piemonte",
                indirizzo: "Corso Francia 50"
            },
            {
                nome: "Anna",
                cognome: "Neri",
                email: "anna.neri@email.com",
                telefono: "3334567890",
                tipoUtente: "Operatore",
                paese: "Italia",
                citta: "Napoli",
                regione: "Campania",
                indirizzo: "Via Toledo 100"
            },
            {
                nome: "Francesco",
                cognome: "Esposito",
                email: "francesco.esposito@email.com",
                telefono: "3335678901",
                tipoUtente: "Cliente",
                paese: "Italia",
                citta: "Bari",
                regione: "Puglia",
                indirizzo: "Via Sparano 15"
            },
            {
                nome: "Sara",
                cognome: "Romano",
                email: "sara.romano@email.com",
                telefono: "3336789012",
                tipoUtente: "Operatore",
                paese: "Italia",
                citta: "Palermo",
                regione: "Sicilia",
                indirizzo: "Via Libertà 70"
            },
            {
                nome: "Davide",
                cognome: "Greco",
                email: "davide.greco@email.com",
                telefono: "3337890123",
                tipoUtente: "Cliente",
                paese: "Italia",
                citta: "Catania",
                regione: "Sicilia",
                indirizzo: "Via Etnea 120"
            },
            {
                nome: "Elena",
                cognome: "Ferrari",
                email: "elena.ferrari@email.com",
                telefono: "3338901234",
                tipoUtente: "Cliente",
                paese: "Italia",
                citta: "Verona",
                regione: "Veneto",
                indirizzo: "Via Mazzini 30"
            },
            {
                nome: "Matteo",
                cognome: "Gallo",
                email: "matteo.gallo@email.com",
                telefono: "3339012345",
                tipoUtente: "Amministratore",
                paese: "Italia",
                citta: "Bologna",
                regione: "Emilia-Romagna",
                indirizzo: "Via Indipendenza 45"
            },
            {
                nome: "Chiara",
                cognome: "Conti",
                email: "chiara.conti@email.com",
                telefono: "3340123456",
                tipoUtente: "Cliente",
                paese: "Italia",
                citta: "Firenze",
                regione: "Toscana",
                indirizzo: "Via de' Tornabuoni 12"
            },

        ];



        return {
            UTENTI_MOCK,
            PRENOTAZIONI_MOCK,
            PRENOTAZIONI_PAGE_0,
            PRENOTAZIONI_PAGE_1,
            PRENOTAZIONI_PAGE_2,
            PRENOTAZIONI_MARIO_MOCK
        }

    }



}
