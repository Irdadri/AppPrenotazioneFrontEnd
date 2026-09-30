import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { Validators } from '@angular/forms';;
import { Form } from '../form/form';
import { PrenotazioneService } from '../service/prenotazione/prenotazione-service';
import { PrenotazioneDTO } from '../model/PrenotazioneDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { PrenotazioneRequest } from '../model/PrenotazioneRequest';
import { Location } from '@angular/common';
import { SedeService } from '../service/sede/sede-service';
import { Sede } from '../model/Sede';
import { FormDefinitions } from '../model/FormDefinition';
import { Page } from '../model/Page';

@Component({
  selector: 'app-modifica-prenotazione',
  imports: [Form],
  templateUrl: './modifica-prenotazione.html',
  styleUrl: './modifica-prenotazione.css',
})
export class ModificaPrenotazione {

  prenotazione = signal<PrenotazioneDTO | null>(null);
  /*
  ({
    id: 0,
    nomeUtente: '',
    cognomeUtente: '',
    citta: '',
    indirizzo: '',
    nstanza: '',
    npostazione: 0,
    dataInizio: '',
    dataFine: '',
    stato: ''
  });
  */
  prenotazioneId?: Number;
  modifiche?: PrenotazioneRequest;
  listaSedi = signal<Sede[]>([]);

  prenotazioneFormConfig = signal<FormDefinitions<any>[]>([
    { name: "npostazione", type: "select", label: 'numero postazione', cols: 4, validators: [Validators.required] },
    { name: "dataInizio", type: 'datetime-local', label: 'data inizio', cols: 4, validators: [Validators.required] },
    { name: "dataFine", type: 'datetime-local', label: 'data fine', cols: 4, validators: [Validators.required] },
  ]);

  constructor(private prenotazioneService: PrenotazioneService, private route: ActivatedRoute, private router: Router,
    private sedeService: SedeService, private cdr: ChangeDetectorRef
  ) {
  }
  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.prenotazioneId = parseInt(params.get('prenotazioneId')!);


      console.log(this.prenotazioneId);
      this.prenotazioneService.getPrenotazioneById(this.prenotazioneId).subscribe(prenotazione => {
        prenotazione.dataInizio = prenotazione.dataInizio.replace(' ', 'T');
        prenotazione.dataFine = prenotazione.dataFine.replace(' ', 'T');
        console.log(prenotazione.npostazione);
        this.prenotazione.set((prenotazione));
        console.log("dalla subscribe in modifica")
        console.log(this.prenotazione());

        this.sedeService.getListaSedi().subscribe(sede => {
          this.listaSedi.set(sede);
          console.log(this.listaSedi());
        })

      });

    })
    console.log(this.prenotazione());
  }



  onFormSubmit(formData: any) {
    this.modifiche = formData as PrenotazioneRequest;
    this.prenotazioneService.aggiornaPrenotazione(this.modifiche, this.prenotazioneId!).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      }
    });
    console.log(this.modifiche);
    console.log(this.prenotazioneId);

  }

}
