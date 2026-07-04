import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class GlobalsInjectable{
    private _igdbBearerToken = signal("")
    public igdbBearerToken = this._igdbBearerToken.asReadonly();
    private _pfpLink = signal("assets/blank.png")
    public pfpLink = this._pfpLink.asReadonly()

    GlobalsInjectable(){}

    public setIgdbBearerToken(bearerToken: string){
        this._igdbBearerToken.set(bearerToken)
    }

    public setUserProfile(link: string){
        this._pfpLink.set(link);
    }

    
}