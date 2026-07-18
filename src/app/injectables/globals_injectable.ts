import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class GlobalsInjectable{
    private _igdbBearerToken = signal("")
    public igdbBearerToken = this._igdbBearerToken.asReadonly();
    private _pfpLink = signal("assets/blank.png")
    public pfpLink = this._pfpLink.asReadonly()
    readonly searchablesList = ['game', 'film', 'music', 'user']
    readonly searchables: Record<string, number> = {}

    constructor(){
        for(let i = 0; i < this.searchablesList.length; i++){
            this.searchables[this.searchablesList[i]] = i
        }
    }

    public setIgdbBearerToken(bearerToken: string){
        this._igdbBearerToken.set(bearerToken)
    }

    public setUserProfile(link: string){
        this._pfpLink.set(link);
    }

}