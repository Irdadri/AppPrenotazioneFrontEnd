import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {

  @Input() email!: String;
  @Input() dataInizio!: String;
  @Input() dataFine!:  String;

  
}
