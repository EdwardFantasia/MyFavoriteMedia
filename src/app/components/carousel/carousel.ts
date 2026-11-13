import { Component, OnChanges, OnInit, input, SimpleChanges, signal, inject } from "@angular/core";
import { GlobalsInjectable } from "../../injectables/globals_injectable";
import { Searchbar } from "../../components/searchbar/searchbar";
import { GameData } from "../../interfaces/interfaces";
import { ActivatedRoute } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Gamewidget } from "../../components/game_widget/game_widget";
import { Score } from "../../components/score/score";
import { Searchables } from "../../injectables/globals_injectable";
//TODO: Not implemented yet
@Component({
    imports: [],
    selector: 'Carousel',
    template: `
        <img>
    `,
    styleUrl: 'carousel.css'
})

export class Carousel implements OnInit, OnChanges{
    curCarouselIndex = signal<number>(0)
    vidLinkArray = input.required<string[]>()
    imgLinkArray = input.required<string[]>()
    constructor(){
        
    }

    ngOnInit(){

    }

    ngOnChanges(){

    }
}