import { Component, inject, Input, signal, input, computed, OnChanges } from "@angular/core";
import { GlobalsInjectable } from "../../injectables/globals_injectable";
import { Searchables } from "../../injectables/globals_injectable";
import { OnInit } from '@angular/core';
@Component({
    selector: 'Userwidget',
    template: `
        <div>
            <p></p>
            <img>
        </div>
    `,
    styleUrl: './user_widget.css'
})

export class Userwidget implements OnChanges{

    constructor(){

    }

    async ngOnChanges(){
        
    }
}