import { Component, inject, Input, signal, input, linkedSignal, output, OnChanges, SimpleChanges, effect } from "@angular/core";
import { Searchables } from "../../injectables/globals_injectable";
//import { GlobalsInjectable } from "../../injectables/globals_injectable";
@Component({
    selector: 'Score',
    template: `
        <div class = "score-display">
            <div class = "score">
                <p id = "scoreText">{{score()?.toFixed(places())}}</p>
                <svg>
                    <circle cx = "80" cy = "80" r = "70" />
                    <circle [style.stroke] = "strokeColor()" [style.stroke-dashoffset] = "strokeDashOffset()" [style.stroke-dasharray] = "strokeDashVal" cx = "80" cy = "80" r = "70" />
                </svg>
            </div>
        </div>
    `,
    styleUrl: 'score.css'
})

export class Score implements OnChanges{
    score = input<number | undefined>()
    rating_count = input<number | undefined>()
    places = input.required<number>()
    strokeColor = signal<string>("red")
    strokeDashVal: number = 440
    strokeDashOffset = signal<number>(440)
    intervalId: number | undefined = undefined;
    tmpScore: number = 0
    //protected globalsInjectable = inject(GlobalsInjectable)
    constructor(){
    
    }

    wheelProg(){
        this.strokeDashOffset.set(this.strokeDashVal - (this.strokeDashVal * (Math.min(this.tmpScore, this.score() ?? 0))) / 100)
            //console.log("tmp init: ", (Math.min(this.tmpScore, this.score() ?? 0)))
            let additive = 6.5
            const nulColScore = parseFloat((this.score() ?? 0).toFixed(this.places()))
            console.log("nulColScore: ", nulColScore)
            
            if(nulColScore >= 60 && nulColScore < 75){
                this.strokeColor.set("yellow")
            }
            else if(nulColScore >= 75 && nulColScore < 91){
                this.strokeColor.set("green")
            }
            else if(nulColScore >= 91){
                this.strokeColor.set("#DBB42C")
            }

            this.intervalId = setInterval(() => {
                this.tmpScore = Math.min(this.tmpScore + additive, this.score() ?? 0)
                if (additive > 2 && this.tmpScore >= (nulColScore) * .75){
                    console.log("additive: ", additive)
                    additive = additive * .75
                }
                //console.log("tmp score: ", this.tmpScore)
                this.strokeDashOffset.set(this.strokeDashVal - (this.strokeDashVal * this.tmpScore) / 100)

                if(this.tmpScore >= nulColScore){
                    clearInterval(this.intervalId)
                    return
                }
            }, 35)
    }

    ngOnChanges(changes: SimpleChanges): void {
        //console.log("changes: ", changes)
        if(this.score()){
            this.wheelProg()
        }
        else{
            //TODO: set up frown if no score
        }
    }
}