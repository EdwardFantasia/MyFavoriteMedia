import { Component, inject, Input, signal, input, computed, OnChanges } from "@angular/core";
import { GlobalsInjectable } from "../../injectables/globals_injectable";
import { Searchables } from "../../injectables/globals_injectable";
import { OnInit } from '@angular/core';
import { GameData, QueryResult } from "../../interfaces/interfaces";
import { Router } from "@angular/router";
@Component({
    selector: 'Gamewidget',
    template: `
        <div (onClick) = "navigateToPage()" (click) = "navigateToPage()" >
            <p>{{ gameWidgetData().name }}</p>
            <img id = "widgetImg" [src] = cover() >
        </div>
    `,
    styleUrl: './game_widget.css'
})

export class Gamewidget implements OnChanges{
    protected router = inject(Router)
    gameWidgetData = input.required<GameData>()
    cover = signal<string | undefined>(undefined)
    constructor(){
        
    }

    ngOnChanges(){
        if(this.gameWidgetData().cover?.url){
            let coverAppend = this.gameWidgetData().cover?.url.split("/t_thumb/")[1]
            this.cover.set(`https://images.igdb.com/igdb/image/upload/t_cover_big/${coverAppend}`)
        }
        else{
            this.cover.set("assets/controller.png")
        }
    }

    navigateToPage(){
        console.log(`navigating to game page ${this.gameWidgetData().id}`)
        this.router.navigate([`game/${this.gameWidgetData().id}`], {queryParams: {cover: this.cover()}})
    }
}