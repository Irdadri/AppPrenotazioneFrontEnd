import { ChangeDetectorRef, Component } from '@angular/core';
import { Validators } from '@angular/forms';;
import { Form } from '../form/form';
import { PrenotazioneService } from '../service/prenotazione/prenotazione-service';
import { PrenotazioneDTO } from '../model/PrenotazioneDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { PrenotazioneRequest } from '../model/PrenotazioneRequest';
import { Location } from '@angular/common';
import { SedeService } from '../service/sede/sede-service';
import { Sede } from '../model/Sede';

@Component({
  selector: 'app-modifica-prenotazione',
  imports: [Form],
  templateUrl: './modifica-prenotazione.html',
  styleUrl: './modifica-prenotazione.css',
})
export class ModificaPrenotazione {

  prenotazione?: PrenotazioneDTO;
  prenotazioneId?: Number;
  modifiche?: PrenotazioneRequest;
  listaSedi: Sede[] = [];

  constructor(private prenotazioneService: PrenotazioneService, private route: ActivatedRoute, private router: Router,
    private sedeService: SedeService, private cdr: ChangeDetectorRef
  ) {
  }
  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.prenotazioneId = parseInt(params.get('prenotazioneId')!);


      console.log(this.prenotazioneId);
      this.prenotazioneService.getPrenotazioneById(this.prenotazioneId).subscribe(prenotazione => {
        this.prenotazione = prenotazione;
        this.prenotazione.dataInizio =
          this.prenotazione.dataInizio.replace(' ', 'T');
        this.prenotazione.dataFine =
          this.prenotazione.dataFine.replace(' ', 'T');
        this.sedeService.getListaSedi().subscribe(sede => {
          this.listaSedi = sede;
          console.log(this.listaSedi);
          this.cdr.detectChanges();
        })

      });

    })



    console.log(this.prenotazione);
  }

  prenotazioneFormConfig = [
    { name: "npostazione", type: "select", label: 'numero postazione', cols: 4, validators: [Validators.required] },
    { name: "dataInizio", type: 'datetime-local', label: 'data inizio', cols: 4, validators: [Validators.required] },
    { name: "dataFine", type: 'datetime-local', label: 'data fine', cols: 4, validators: [Validators.required] },
  ]

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
