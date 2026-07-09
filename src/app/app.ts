import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientInMemoryWebApiModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('appPrenotazioneFrontEnd');
}
