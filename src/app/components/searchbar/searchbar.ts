import { Component, inject, signal } from "@angular/core";
import { GlobalsInjectable } from "../../injectables/globals_injectable";
@Component({
    selector: 'Searchbar',
    template: `
        <div>
            <div [style.display] = "showSearch() ? 'block' : 'none'">
                <div>
                    <input />
                    <button (click) = "searchAll()">Search All</button>
                </div>
                <button class = "searchButton" id = "game" (click) = "searchGames()">Search Games <img class = "search-img" id = "controller" src = "assets/controller.png"></button>
                <button class = "searchButton" id = "tvAndM" (click) = "searchFilm()">Search Shows & Movies <img class = "search-img" id = "cutboard" src = "assets/cutboard.png"></button>
                <button class = "searchButton" id = "music" (click) = "searchMusic()">Search Music <img class = "search-img" id = "note" src = "assets/note.png"></button>
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
    searchGames(){
        
    }

    searchFilm(){

    }

    searchMusic(){

    }

    searchAll(){

    }

    toggleSearch(){
        this.showSearch.update(showSearchVal => !showSearchVal)
    }
}