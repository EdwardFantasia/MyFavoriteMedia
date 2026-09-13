import { Component, OnChanges, OnInit, SimpleChanges, signal, inject } from "@angular/core";
import { GlobalsInjectable } from "../../injectables/globals_injectable";
import { Searchbar } from "../../components/searchbar/searchbar";
import { GameData } from "../../interfaces/interfaces";
import { ActivatedRoute } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Gamewidget } from "../../components/game_widget/game_widget";
@Component({
    //imports: [Gamewidget], TODO: use gamewidget for ports and other categories where singular game ids/arrays of game ids are given
    selector: 'GamePage',
    template: `
        @if(gameData(); as data){
            <div>
                <img id = "coverImg" [src] = "this.cover" >
                <p id = "name">{{ data.name }}</p>
                <div id = "summaryDiv" [innerHTML] = "data.summary"></div>
                <p id = "storyline">{{ data.storyline }}</p>
                <div id = "ports">
                </div>
            </div>
        }
        @else if(error()){
            <div>
                <p>There was an error retrieving the data for game with the id {{ gameId }} :(</p>
                <p>Please try again.</p>
            </div>    
        }    
    `,
    styleUrl: 'game_page.css'
})

export class GamePage implements OnInit{
    protected globalsInjectable = inject(GlobalsInjectable)
    gameId: number = NaN
    gameData = signal<GameData | undefined>(undefined)
    error = signal<boolean>(false)
    cover: string | null = null
    constructor(private route: ActivatedRoute){
        this.route.paramMap
        .pipe(takeUntilDestroyed()) //unsubscribes from paramMap Observable event when page exited, as keeping subscription after page exit can lead to memory leaks
        .subscribe(params => {
            this.gameId = parseInt(params.get("id") || "", 10)
            console.log("game_page gameId: ", this.gameId)
        })
        this.route.queryParams
        .pipe(takeUntilDestroyed())
        .subscribe(queryParams => {
            this.cover = queryParams["cover"]
        })
    }

    async ngOnInit(){
        const data = await this.getGameData()
        console.log("gameData: ", data)
        if(data){
            if(data.summary){
                console.log("preparse summary: ", data.summary)
                data.summary = this.parseSummary(data.summary)
            }
            console.log("ngOnInit.cover: ", this.cover)
            this.gameData.set(data)
        }
        else{
            this.error.set(true)
        }
    }

    parseSummary(summary: string){
        const bulletIndex = summary.indexOf('\u2022')
        if(bulletIndex != -1){
            ////TODO: may be able to make this section more precise with the use of a parse with regex instead of a guess of bullet position
            console.log("bulletIndex: ", bulletIndex)
            const splitSum = summary.split('\u2022' + " ")
            console.log("splitSum: ", splitSum)
            let returnString: string = ""
            if(bulletIndex > 1){ //if first bullet is in the middle of summary string and not at the beginning (index positions 0 or 1) of the summary string
                returnString += (splitSum[0])
                splitSum.shift()
            }
            returnString += "<ul>"
            for(let li of splitSum){
                console.log("li: ", li)
                returnString += `<li>${li}</li>`
            }
            return returnString + "</ul>"
            ////END TODO
        }else{
            return `<p>${summary}</p>`
        }
    }

    async getGameData(){
        let result: GameData | undefined = undefined
        try{
            let resp = await fetch(`${this.globalsInjectable.serverBase}/igdbController/searchGameById?id=${this.gameId}`, {
                method: 'GET',
                mode: "cors",
                headers: {
                    'Accept': 'application/json',
                }
            })
            let respJson = await resp.json()
            console.log("respJson: ", respJson)
            if(respJson[0]){
                result = (respJson[0] as GameData)
            }
            else{
                throw new Error("No game data retrieved")
            }
            return result
        }
        catch(e){

        }
        return result
    }
}