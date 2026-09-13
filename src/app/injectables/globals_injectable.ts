import { Injectable, signal } from "@angular/core";
import config from '../../../config.json'

export enum Searchables{
  game = 0,
  film,
  music,
  user,
  playlists
}
@Injectable({
    providedIn: "root"
})
export class GlobalsInjectable{
    private _pfpLink = signal("assets/blank.png")
    public pfpLink = this._pfpLink.asReadonly()
    readonly searchablesList: string[] = ['game', 'film', 'music', 'user', "playlists"]
    readonly serverBase: string = config.serverBase

    constructor(){
    }

    public setUserProfile(link: string){
        this._pfpLink.set(link);
    }

    private async musicBrainzTestReq(){
    let resp = await fetch("https://musicbrainz.org", {
      method: "GET",
      headers: {
        "User-Agent": "MyMusicDataScript/1.0.0 ( contact@myemail.com )"
      }
    })
    let respJson = await resp.json()
    return respJson
  }

}