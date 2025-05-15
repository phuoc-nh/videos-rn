
const TMDB_CONFIG = {
	BASE_URL: 'https://api.themoviedb.org/3',
	API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
	}
}

export const getMovies = async ({ query }: { query: string }) => {
	const endPoint = query ?
		`/search/movie?query=${encodeURIComponent(query)}` :
		'/discover/movie/sort_by=popularity.desc'

	const response = await fetch(
		`${TMDB_CONFIG.BASE_URL}${endPoint}`,
		{
			headers: TMDB_CONFIG.headers,
			method: 'GET'
		}
		
	)
	if (!response.ok) {
		// @ts-ignore
		throw new Error('Failed to fetch movie details', response.statusText)
	}

	const data = await response.json()

	return data.results
}