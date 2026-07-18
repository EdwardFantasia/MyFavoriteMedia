import { Component, inject, signal } from "@angular/core";
import { GlobalsInjectable } from "../../injectables/globals_injectable";
import { Toggle } from "../toggle/toggle";
import { ToggleReturn } from "../../interfaces/interfaces";
import { Router } from "@angular/router";
@Component({
    imports: [Toggle],
    selector: 'Searchbar',
    template: `
        <div>
            <div [style.display] = "showSearch() ? 'block' : 'none'">
                <div>
                    <input type = "text" #searchInput />
                    <button (click) = "search(searchInput.value)">Search</button>
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
    protected router = inject(Router)
    constructor(){
        for(let i = 0; i < this.globalsInjectable.searchablesList.length; i++){
            this.searchBitString += (this.initialStates[this.globalsInjectable.searchablesList[i]] ? '1' : '0')
        }
    }
    search(query: string){
        const searchNum = parseInt(this.searchBitString, 2)
        if(searchNum != 0 && query != ""){
            this.router.navigate([`results/${searchNum}/${query}`])
        }
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