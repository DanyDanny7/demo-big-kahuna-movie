/* eslint-disable camelcase */
import axios from 'axios';
import {
	priority,
	byTitle,
	title,
} from '@config/paths';

export const GET_MOVIE_LOADING = 'GET_MOVIE_LOADING';
export const GET_MOVIE_BY_TITLE_SUCCESS = 'GET_MOVIE_BY_TITLE_SUCCESS';
export const GET_MOVIE_BY_PRIORITY_SUCCESS = 'GET_MOVIE_BY_PRIORITY_SUCCESS';
export const GET_MOVIE_SEARCH_BY_TITLE_SUCCESS = 'GET_MOVIE_SEARCH_BY_TITLE_SUCCESS';
export const GET_MOVIE_FAILD = 'GET_MOVIE_FAILD';

export const GET_MOVIE_LOCAL_LOADING = 'GET_MOVIE_LOCAL_LOADING';
export const GET_MOVIE_LOCAL_SUCCESS = 'GET_MOVIE_LOCAL_SUCCESS';
export const GET_MOVIE_LOCAL_FAILD = 'GET_MOVIE_LOCAL_FAILD';

const getMovieLoading = () => ({
	type: GET_MOVIE_LOADING,
});
const getMovieByTitleSuccess = (payload) => ({
	type: GET_MOVIE_BY_TITLE_SUCCESS,
	payload,
});
const getMovieByPrioritySuccess = (payload) => ({
	type: GET_MOVIE_BY_PRIORITY_SUCCESS,
	payload,
});
const getMovieSearchByTitleSuccess = (payload) => ({
	type: GET_MOVIE_SEARCH_BY_TITLE_SUCCESS,
	payload,
});
const getMovieFaild = (payload) => ({
	type: GET_MOVIE_FAILD,
	payload,
});

const getMovieLocalLoading = () => ({
	type: GET_MOVIE_LOCAL_LOADING,
});
const getMovieLocalSuccess = (payload) => ({
	type: GET_MOVIE_LOCAL_SUCCESS,
	payload,
});
const getMovieLocalFaild = (payload) => ({
	type: GET_MOVIE_LOCAL_FAILD,
	payload,
});

export const getMovie = (filter, pag, t) => async (dispatch, getState) => {
	const { isLoading } = getState().moviesReducer.getMovie;
	if (!isLoading) {
		dispatch(getMovieLoading());

		try {
			switch (filter) {
			case 'popularity': {
				const data = await axios.get(priority(pag));
				/*
                    sord adicional, porque el endpoind los ordena por popularidad (verificar path) sin embargo,
                    por temas de caché del servidor no se actualizan tan frecuentemente
                */
				const order = data.data.results.sort((a, b) => b.popularity - a.popularity);
				dispatch(getMovieByPrioritySuccess({
					total: data.data?.total_results,
					data: order || [],
				}));
			} break;
			case 'byTitle': {
				const data = await axios.get(byTitle(t, pag));
				console.log({
					total: data.data?.total_results,
					data: data.data?.results || [],
				});
				dispatch(getMovieSearchByTitleSuccess({
					total: data.data?.total_results,
					data: data.data?.results || [],
				}));
			}
				break;
			default: {
				const data = await axios.get(title(pag));
				dispatch(getMovieByTitleSuccess({
					total: data.data?.total_results,
					data: data.data?.results || [],
				}));
			}
				break;
			}
		} catch (error) {
			console.log('error in get movie', error?.response?.data || error);
			dispatch(getMovieFaild(error));
		}
	}
	return Promise.resolve();
};

export const getActionLocal = (movie, action) => async (dispatch, getState) => {
	const { isLoading } = getState().moviesReducer.getLocalMovie;
	if (!isLoading) {
		dispatch(getMovieLocalLoading());
		try {
			const data = JSON.parse(localStorage.getItem('shoppingCart')) || [];
			switch (action) {
			case 'add':
				{
					const exist = !!(data && data.find((sp) => sp.id === movie.id));
					if (!exist) {
						data.push(movie);
					}
					localStorage.setItem('shoppingCart', JSON.stringify(data));
				}
				break;
			case 'update':
				{
					const isLargeNumber = (sp) => sp.id === movie.id;
					const index = data.findIndex(isLargeNumber);
					data.splice(index, 1, movie);
					localStorage.setItem('shoppingCart', JSON.stringify(data));
				}
				break;
			case 'delete':
				{
					const isLargeNumber = (sp) => sp.id === movie.id;
					const index = data.findIndex(isLargeNumber);
					data.splice(index, 1);
					localStorage.setItem('shoppingCart', JSON.stringify(data));
				}
				break;

			default:
				break;
			}
			dispatch(getMovieLocalSuccess(data));
		} catch (error) {
			dispatch(getMovieLocalFaild(error));
		}
	}
	return Promise.resolve();
};
