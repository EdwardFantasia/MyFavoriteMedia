import { Component, inject, Input, signal, input, computed, OnChanges } from "@angular/core";
import { GlobalsInjectable } from "../../injectables/globals_injectable";
import { Searchables } from "../../injectables/globals_injectable";
import { OnInit } from '@angular/core';
import { FilmWidgetData } from "../../interfaces/interfaces";
@Component({
    selector: 'Filmwidget',
    template: `
        <div>
            <p></p>
            <img>
        </div>
    `,
    styleUrl: './film_widget.css'
})

export class Filmwidget implements OnChanges{
    filmWidgetData = input.required<FilmWidgetData>()
    constructor(){

    }

    async ngOnChanges(){
        
    }
}