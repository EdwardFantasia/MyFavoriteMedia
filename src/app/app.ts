import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { GlobalsInjectable } from './injectables/globals_injectable';
import { Searchbar } from './components/searchbar/searchbar';
import tmpJson from '../../tmpconfig.json'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Searchbar],
  template: `
    <main class="main">
    <Searchbar></Searchbar>
    <router-outlet />
    <div class = "testing div">
      <button (click) = "increment()">Increment Test</button>
      <button (click) = "switchScreen()">Switch Screen</button>
    </div>
    </main>
  `,
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('my-favorite-media');
  counter = signal(0)
  /*TODO: replace this section with Process.Env variables via docker usage*/
  igdbClientId = tmpJson.igdbClientId //TODO: replace with Process.Env variable
  igdbClientSecret = tmpJson.igdbClientSecret//TODO: replace with Process.Env variable
  tmdbApiKey = tmpJson.tmdbApiKey
  /*END TODO*/
  protected globalsInjectable = inject(GlobalsInjectable)
  //TODO: may need to use an enum for api selection
  protected router = inject(Router)

  async ngOnInit(){
    this.globalsInjectable.setIgdbBearerToken(await this.requestBearerToken());
    console.log("bearer token: ", this.globalsInjectable.igdbBearerToken())
    let test = await this.tmdbTestReq()
    console.log("test: ", test)
    let musicBrainzReq = await this.musicBrainzTestReq()
    console.log("musicbrainz test: ", musicBrainzReq)
  }

  async requestBearerToken(){
    let resp = await fetch("https://id.twitch.tv/oauth2/token?client_id=" + this.igdbClientId + "&client_secret=" + this.igdbClientSecret + "&grant_type=client_credentials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
    let respJson = await resp.json()
    return respJson["access_token"]
  }

  async tmdbTestReq(){
    let resp = await fetch("https://api.themoviedb.org/3/trending/all/day?language=en-US", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + this.tmdbApiKey,
        "Content-Type": "application/json"
      }
    })
    let respJson = await resp.json()
    return respJson
  }

  async musicBrainzTestReq(){
    let resp = await fetch("https://musicbrainz.org", {
      method: "GET",
      headers: {
        "User-Agent": "MyMusicDataScript/1.0.0 ( contact@myemail.com )"
      }
    })
    let respJson = await resp.json()
    return respJson
  }

  increment(): void{
    this.counter.update((value) => value += 1)
    console.log(this.counter())
  }

  switchScreen(): void{
    this.router.navigate(['results/0/kendrick'])
  }
}