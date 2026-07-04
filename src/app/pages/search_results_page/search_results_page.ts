import { Component, signal, inject, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalsInjectable } from '../../injectables/globals_injectable';
import { Searchbar } from '../../components/searchbar/searchbar';

@Component({
  imports: [RouterOutlet, Searchbar],
  template:`
    <div>
      <p>{{ test() }}</p>
    </div>
  `,
  styleUrl: './search_results_page.css'
})
export class SearchResultsPage implements OnInit{
  protected globalsInjectable = inject(GlobalsInjectable);
  @Input() num!: string
  @Input() searchText!: string
  protected test = signal("test signal")
  async ngOnInit(){
    console.log(this.num)
    console.log(this.searchText)
  }
}