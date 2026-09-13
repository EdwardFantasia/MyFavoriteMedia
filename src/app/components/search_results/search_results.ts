import { Component, inject, Input, signal, input, computed, OnChanges } from "@angular/core";
import { GlobalsInjectable } from "../../injectables/globals_injectable";
import { Searchables } from "../../injectables/globals_injectable";
import { OnInit } from '@angular/core';
import { Gamewidget } from "../game_widget/game_widget";
import { Filmwidget } from "../film_widget/film_widget";
import { FilmWidgetData, GameData } from "../../interfaces/interfaces";
import { QueryResult } from "../../interfaces/interfaces";
import { ToGameWidgetData, ToFilmWidgetData } from "../../pipes/pipes";
@Component({
    selector: 'Searchresults',
    imports: [Gamewidget, Filmwidget, ToGameWidgetData, ToFilmWidgetData],
    template: `
        <div class = "searchResults" [id] = resultType() >
            <p>{{ resultType() }}</p>
            <p> {{resultTypeNum()}} </p>
            <div (mouseenter)="onMouseEnter($event)" (mouseleave)="onMouseLeave($event)" [class] = "showScroll() ? 'queryResults hover' : 'queryResults'" [id] = resultType() >
                @switch(resultTypeNum()){
                    @case(0){
                        @for(queryResult of queryResults(); let i = $index; track i){
                            <Gamewidget class = "clickable widget" [gameWidgetData]="queryResult | toGameWidgetData" />
                        }
                    }
                    @case(1){
                        @for(queryResult of queryResults(); let i = $index; track i){
                            <Filmwidget class = "clickable widget" [filmWidgetData]="queryResult | toFilmWidgetData" />
                        }
                    }
                }
            </div>
        </div>
    `,
    styleUrl: './search_results.css'
})

export class Searchresults implements OnChanges{
    protected globalsInjectable = inject(GlobalsInjectable);
    resultType = input.required<string>()
    query = input<string | null | undefined>('')
    resultTypeNum = computed(() => {
        return Searchables[this.resultType() as keyof typeof Searchables];
    })
    queryResults = signal<QueryResult[]>([])
    showScroll = signal<boolean>(false)

    constructor(){

    }

    onMouseEnter(event: Event): void{
        console.log("mouse entered")
        //console.log("event: ", event)
        this.showScroll.set(true)
    }

    onMouseLeave(event: Event): void{
        console.log("mouse leave")
        //console.log("event: ", event)
        this.showScroll.set(false)
    }

    async ngOnChanges(){
        console.log("search_results.searchables: ", Searchables[this.resultType() as keyof typeof Searchables])
        console.log("search_results.resultType: ", this.resultType())
        console.log("search_results.resultTypeNum: ", this.resultTypeNum())
        let tmpResults = await this.apiSearch()
        this.queryResults.set(tmpResults)
    }

    async apiSearch(){
        let results: QueryResult[] = []
        switch(this.resultTypeNum()){
            case 0:
                try{
                    let resp = await fetch(`${this.globalsInjectable.serverBase}/igdbController/searchGames?searchQuery=${this.query()}`, {
                        method: 'GET',
                        mode: "cors",
                        headers: {
                            'Accept': 'application/json',
                        }
                    })
                    let respJson = await resp.json()
                    console.log("respJson: ", respJson)
                    results = (respJson as GameData[])
                }
                catch(e){

                }
                return results
            case 1:
                return results
            case 2:
                return results
                
        }
        return results
    }
}