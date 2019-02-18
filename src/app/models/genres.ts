export interface GenreDetails {
    id: number, 
    name: string
}

export interface Genre extends VideoUrl {
    genres: GenreDetails[]
}

export interface VideoUrl {
    id: number,
    results: VideoUrlResults[]
}

export interface VideoUrlResults {
    id: number,
    iso_639_1: string,
    iso_3166_1: string,
    key: string,
    name: string,
    site: string,
    size: number,
    type: string
}