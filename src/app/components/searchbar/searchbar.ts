import { Component, inject, signal } from "@angular/core";
import { GlobalsInjectable } from "../../injectables/globals_injectable";
import { Toggle } from "../toggle/toggle";
import { ToggleReturn } from "../../interfaces/interfaces";
import { NavigationEnd, Router } from "@angular/router";
import { SearchbarData } from "../../interfaces/interfaces";
import { Searchables } from "../../injectables/globals_injectable";
import { filter } from 'rxjs/operators';
import { ActivatedRouteSnapshot } from "@angular/router";

@Component({
    imports: [Toggle],
    selector: 'Searchbar',
    template: `
        <div>
            <div [style.display] = "showSearch() ? 'block' : 'none'">
                <div>
                    <input type = "text" #searchInput />
                    <button class = "clickable" id = "searchButton" (click) = "search(searchInput.value)">Search</button>
                </div>
                @for(searchable of globalsInjectable.searchablesList; let i = $index; track i){
                    <Toggle (dataEvent) = "handleToggleChange($event)"
                        [initialState]="initialStates[searchable].initialState"
                        [id]="searchable">
                        <p>{{initialStates[searchable].htmlText}}</p>
                        <img class = "search-img" [id]="searchable" [src]="initialStates[searchable].imgSrc">
                    </Toggle>
                }
            </div>
            <img id="usr-pfp" [src]="globalsInjectable.pfpLink()" alt="User Profile Picture">
            <button (click) = "toggleSearch()" class = "clickable" id = "toggleSearch">
                {{showSearch() ? 'Hide Searchbar' : 'Show Searchbar'}}
            </button>
        </div>
    `,
    styleUrl: 'searchbar.css'
})

export class Searchbar{
    protected globalsInjectable = inject(GlobalsInjectable);
    protected showSearch = signal(true);
    protected searchBitString: string = ''
    protected initialStates: Record<string, SearchbarData> = {
        "game": {
            "initialState": true,
            "htmlText": "Search Games",
            "imgSrc": "assets/controller.png"
        },
        "film": {
            "initialState": true,
            "htmlText": "Search Shows & Movies",
            "imgSrc": "assets/cutboard.png"
        },
        "music": {
            "initialState": true,
            "htmlText": "Search Music",
            "imgSrc": "assets/note.png"
        },
        "user": {
            "initialState": false,
            "htmlText": "Search Users",
            "imgSrc": "assets/blank.png"
        },
        "playlists": {
            "initialState": false,
            "htmlText": "Search Playlists",
            "imgSrc": "assets/blank.png"
        }
    }
    protected router = inject(Router)
    constructor(){
        for(let i = 0; i < this.globalsInjectable.searchablesList.length; i++){
            this.searchBitString += (this.initialStates[this.globalsInjectable.searchablesList[i]].initialState ? '1' : '0')
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
        console.log("searchBitString: ", this.searchBitString)
        const index = Searchables[toggleObj.toggleId as keyof typeof Searchables]
        let newChar 
        if(toggleObj.state){
            newChar = "1"
        }else{
            newChar = "0"
        }
        this.searchBitString = this.searchBitString.substring(0, index) + newChar + this.searchBitString.substring(index + 1)
        console.log("new bitstring: ", this.searchBitString)
    }

    ngOnInit() { //ngOnInit runs after full process of: components are destroyed and taken out of DOM memory and Angular rebuilds new components and inserts them into DOM memory but this does not always happen when changing between routes with the same base but a different id for example, as angular will try to save the component in memory for performance reasons
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe((event: NavigationEnd) => {
            console.log('Searchbar ngOnInit: Route changed to:', event.urlAfterRedirects);
            const rootSnapshot = this.router.routerState.snapshot.root
            if(this.checkRoutePattern(rootSnapshot, "game/:id")){
                this.toggleSearch()
            }
        });
    }

    checkRoutePattern(child: ActivatedRouteSnapshot, targetPattern: string): boolean{
        if(child.routeConfig?.path === targetPattern){
            return true
        }
        else{
            return child.children.some(childRoot => this.checkRoutePattern(childRoot, targetPattern)) //with .some recurive call, if recursion returns true, returns true to base call, else returns false
        }
    }
}