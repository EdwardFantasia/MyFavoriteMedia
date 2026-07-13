import { Component, signal, inject, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalsInjectable } from '../../injectables/globals_injectable';
import { Searchresults } from '../../components/search_results/search_results'

@Component({
  imports: [RouterOutlet, Searchresults],
  template:`
    <div>
      @if (num === '0' || num === '1'){
        <Searchresults resultType = "music" [query] = "searchText"></Searchresults>
      }
      @if (num === '0' || num === '2'){
        <Searchresults resultType = "film" [query] = "searchText"></Searchresults>
      }
      @if (num === '0' || num === '3'){
        <Searchresults resultType = "game" [query] = "searchText"></Searchresults>
      }
    </div>
  `,
  styleUrl: './search_results_page.css'
})
export class SearchResultsPage implements OnInit{
  protected globalsInjectable = inject(GlobalsInjectable);
  @Input() protected num!: string
  @Input() protected searchText!: string
  protected test = signal("test signal")
  async ngOnInit(){
    console.log(this.num)
    console.log(this.searchText)
  }
}