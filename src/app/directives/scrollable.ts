import { Directive, HostBinding, HostListener, signal } from "@angular/core";

@Directive({selector: '[scrollable]'})
class ShowScroll {
    @HostBinding('class.hover') hovered = false
    @HostListener('mouseenter', ['$event'])
    onEnter(e: MouseEvent) {
        console.log('mouse entered')
        this.hovered = true
    }

    @HostListener('mouseleave', ['$event'])
    onLeave(e: MouseEvent) {
        console.log('mouse left')
        this.hovered = false
    }
}

export default ShowScroll