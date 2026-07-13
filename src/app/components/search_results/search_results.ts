import { Component, inject, Input, signal, input } from "@angular/core";
import { GlobalsInjectable } from "../../injectables/globals_injectable";
@Component({
    selector: 'Searchresults',
    template: `
        <div>
            <p>{{ resultType() }}</p>
            <p>{{ query() }}</p>
        </div>
    `,
    styleUrl: './search_results.css'
})

export class Searchresults{
    resultType = input.required<string>();
    query = input<string>('')
}