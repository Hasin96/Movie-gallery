interface backdrops {
    aspect_ratio: number,
    file_path: string,
    height: number,
    iso_639_1: any,
    vote_average: number,
    vote_count: number,
    width: number
}

interface posters {
    aspect_ratio: number,
    file_path: string,
    heigt: number,
    iso_639_1: string,
    vote_average: number,
    vote_count: number,
    width: number
}

export interface Image {
    id: number,
    backdrops: backdrops,
    posters: posters
}