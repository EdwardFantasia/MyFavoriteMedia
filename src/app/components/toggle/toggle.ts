import { Component, inject, Input, signal, input, linkedSignal, output } from "@angular/core";
import { GlobalsInjectable } from "../../injectables/globals_injectable";
import { ToggleReturn } from "../../interfaces/interfaces";
@Component({
    selector: 'Toggle',
    template: `
        <label class="switch">
            <input (change)="invertState()" [checked]="checkedState()" type="checkbox">
            <span class="slider round"></span>
            <ng-content />
        </label>
    `, //template source: https://www.w3schools.com/howto/howto_css_switch.asp
    styleUrl: 'toggle.css'
})

export class Toggle{
    initialState = input.required<boolean>()
    protected checkedState = linkedSignal(() => this.initialState())
    id = input.required<string>()
    dataEvent = output<ToggleReturn>()

    invertState(){
        this.checkedState.update(currentValue => !currentValue)
        this.dataEvent.emit({
            state: this.checkedState(),
            toggleId: this.id()
        })
    }
}