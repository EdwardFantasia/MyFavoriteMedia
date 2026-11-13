import { Component, inject, Input, signal, input, computed, OnChanges } from "@angular/core";
import { GlobalsInjectable } from "../../injectables/globals_injectable";
import { Searchables } from "../../injectables/globals_injectable";
import { OnInit } from '@angular/core';
@Component({
    selector: 'Listwidget',
    template: `
        <div>
            <p></p>
            <img>
        </div>
    `,
    styleUrl: './list_widget.css'
})

export class Gamewidget implements OnChanges{

    constructor(){

    }

    async ngOnChanges(){
        
    }
}