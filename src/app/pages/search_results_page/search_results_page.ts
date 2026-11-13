import { Component, signal, inject, Input, OnInit, OnDestroy, WritableSignal } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { GlobalsInjectable, Searchables } from '../../injectables/globals_injectable';
import { Searchresults } from '../../components/search_results/search_results'
import { Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [Searchresults],
  template:`
    <div>
      @for(searchable of displays(); let i = $index; track i){
        <Searchresults class = "searchRes" [id] = searchable [resultType] = searchable [query] = this.query></Searchresults>
      }
    </div>
  `,
  styleUrl: './search_results_page.css'
})
export class SearchResultsPage{
  protected globalsInjectable = inject(GlobalsInjectable);
  protected num?: string | null = ""
  protected query?: string | null = ""
  protected displays= signal<string[]>([])
  constructor(private route: ActivatedRoute){
    this.route.paramMap
      .pipe(takeUntilDestroyed()) //unsubscribes from paramMap Observable event when page exited, as keeping subscription after page exit can lead to memory leaks
      .subscribe(params => {
        this.num = params.get("num")
        this.query = params.get("query")
        console.log("this.num: ", this.num)
        console.log("this.query: ", this.query)
        const number: number | null = parseInt(this.num || "", 10)
        let bitString = number.toString(2).padStart(this.globalsInjectable.searchablesList.length, '0')
        console.log("bitstring: ", bitString)
        let tmpSignals: string[] = []
        for(let i = 0; i < this.globalsInjectable.searchablesList.length; i++){
          let searchable: string = this.globalsInjectable.searchablesList[i]
          let index: number = Searchables[searchable as keyof typeof Searchables]
          if(bitString[index] == "1"){
            tmpSignals.push(searchable)
          }
        }
        this.displays.set(tmpSignals)
    })
  }
}