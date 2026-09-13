import { Pipe, PipeTransform } from "@angular/core";
import { QueryResult, GameData, FilmWidgetData } from "../interfaces/interfaces";

@Pipe({
    name: "toGameWidgetData",
    standalone: true
})
export class ToGameWidgetData implements PipeTransform{
    transform(value: QueryResult): GameData{
        return value as GameData
    }
}

@Pipe({
    name: "toFilmWidgetData",
    standalone: true
})
export class ToFilmWidgetData implements PipeTransform{
    transform(value: QueryResult): FilmWidgetData{
        return value as FilmWidgetData
    }
}