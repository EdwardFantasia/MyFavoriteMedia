import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { GlobalsInjectable } from './injectables/globals_injectable';
import { Searchbar } from './components/searchbar/searchbar';
import config from '../../config.json'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Searchbar],
  template: `
    <main class="main">
      <Searchbar></Searchbar>
      <router-outlet />
    </main>
  `,
  styleUrl: './app.css'
})
export class App{
  protected readonly title = signal('my-favorite-media');
  protected globalsInjectable = inject(GlobalsInjectable)
  //TODO: may need to use an enum for api selection
  protected router = inject(Router)
  //protected testVar = ''
}