export interface results {
    vote_count: number,
    id: number,
    video: boolean,
    vote_average: number,
    title: string,
    popularity: number,
    poster_path: string,
    original_language: string,
    original_title: string,
    genre_ids: Array<number>,
    backdrop_path: string,
    adult: boolean,
    overview: string,
    release_date: string
}

export interface TopRatedMovies {
    page: number,
    total_results: number,
    total_pages: number,
    results: results[]
    
}

