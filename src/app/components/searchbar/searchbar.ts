import { Component, inject, signal } from "@angular/core";
import { GlobalsInjectable } from "../../injectables/globals_injectable";
import { Toggle } from "../toggle/toggle";
import { ToggleReturn } from "../../interfaces/interfaces";
@Component({
    imports: [Toggle],
    selector: 'Searchbar',
    template: `
        <div>
            <div [style.display] = "showSearch() ? 'block' : 'none'">
                <div>
                    <input />
                    <button (click) = "search()">Search</button>
                </div>
                <Toggle (dataEvent) = "handleToggleChange($event)" [initialState] = "true" id = "game">
                    <p>Search Games</p>
                    <img class = "search-img" id = "game" src = "assets/controller.png">
                </Toggle>
                <Toggle (dataEvent) = "handleToggleChange($event)" [initialState] = "true" id = "film">
                    <p>Search Shows & Movies</p>
                    <img class = "search-img" id = "film" src = "assets/cutboard.png">
                </Toggle>
                <Toggle (dataEvent) = "handleToggleChange($event)" [initialState] = "true" id = "music">
                    <p>Search Music</p>
                    <img class = "search-img" id = "music" src = "assets/note.png">
                </Toggle>
                <Toggle (dataEvent) = "handleToggleChange($event)" [initialState] = "false" id = "user">
                    <p>Search Users</p>
                    <img class = "search-img" id = "user" src = "assets/blank.png">
                </Toggle>
            </div>
            <img id="usr-pfp" [src]="globalsInjectable.pfpLink()" alt="User Profile Picture">
            <button (click) = "toggleSearch()" id = "toggleSearch">Hide Searchbar</button>
        </div>
    `,
    styleUrl: 'searchbar.css'
})

export class Searchbar{
    protected globalsInjectable = inject(GlobalsInjectable);
    protected showSearch = signal(true);
    protected searchBitString: string = ''
    protected initialStates: Record<string, boolean> = {
        "game": true,
        "film": true,
        "music": true,
        "user": false
    }
    constructor(){
        const searchablesKeys = Object.keys(this.globalsInjectable.searchables)
        for(let i = 0; i < searchablesKeys.length; i++){
            this.searchBitString += (this.initialStates[searchablesKeys[i]] ? '1' : '0')
        }
    }
    search(){

    }

    toggleSearch(){
        this.showSearch.update(showSearchVal => !showSearchVal)
    }

    handleToggleChange(toggleObj: ToggleReturn){
        console.log("toggleObj: ", toggleObj)
        console.log("global searchable obj: ", this.globalsInjectable.searchables)
        console.log("searchBitString: ", this.searchBitString)
        const index = this.globalsInjectable.searchables[toggleObj.toggleId]
        let newChar 
        if(toggleObj.state){
            newChar = "1"
        }else{
            newChar = "0"
        }
        this.searchBitString = this.searchBitString.substring(0, index) + newChar + this.searchBitString.substring(index + 1)
        console.log("new bitstring: ", this.searchBitString)
    }
}