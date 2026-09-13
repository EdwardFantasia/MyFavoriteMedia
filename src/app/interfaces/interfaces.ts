export interface ToggleReturn{
    state: boolean,
    toggleId: string
}

export interface SearchbarData{
    initialState: boolean,
    htmlText: string,
    imgSrc: string
}

interface GameArtwork{
    id: number,
    url: string
}

export interface GameData{
    id: number,
    name: string,
    cover?: GameArtwork,
    artworks?: GameArtwork[],
    summary?: string,
    storyline?: string,
    franchise?: number,
    franchises?: {games: number[], id: number, name: string}
}

export interface FilmWidgetData{
    ex: string
}

export type QueryResult = FilmWidgetData | GameData