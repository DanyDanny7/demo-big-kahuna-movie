
const key = process.env.REACT_APP_API_KEY;
const base = process.env.REACT_APP_URLBASE;


export const priority = (page) => (
	`${base}/discover/movie?api_key=${key}&language=es-ES&sort_by=popularity.desc&page=${page}`);
export const title = (page) => (
	`${base}/discover/movie?api_key=${key}&language=es-ES&sort_by=original_title.asc&page=${page}`);
export const byTitle = (t, page) => `${base}/search/movie?api_key=${key}&language=es-ES&query=${t}&page=${page}`;
