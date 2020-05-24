import {
	GET_MOVIE_LOADING,
	GET_MOVIE_BY_TITLE_SUCCESS,
	GET_MOVIE_BY_PRIORITY_SUCCESS,
	GET_MOVIE_SEARCH_BY_TITLE_SUCCESS,
	GET_MOVIE_FAILD,
} from '@store/actions/moviesActions';

const initState = {
	getMovie: {
		isLoading: false,
		isSuccessByTitle: false,
		isSuccessByPriority: false,
		isSuccessSearchByTitle: false,
		isError: false,
		dataByTitle: [],
		dataByPriority: [],
		dataSearchByTitle: [],
	},
};

const moviesReducer = (state = initState, action) => {
	switch (action.type) {
	case GET_MOVIE_LOADING:
		return {
			...state,
			getMovie: {
				...state.getMovie,
				isLoading: true,
				isSuccessByTitle: false,
				isSuccessByPriority: false,
				isSuccessSearchByTitle: false,
				isError: false,
			},
		};
	case GET_MOVIE_BY_TITLE_SUCCESS:
		return {
			...state,
			getMovie: {
				...state.getMovie,
				isLoading: false,
				isSuccessByTitle: true,
				isSuccessByPriority: false,
				isSuccessSearchByTitle: false,
				isError: false,
				dataByTitle: action.payload,
			},
		};
	case GET_MOVIE_BY_PRIORITY_SUCCESS:
		return {
			...state,
			getMovie: {
				...state.getMovie,
				isLoading: false,
				isSuccessByTitle: false,
				isSuccessByPriority: true,
				isSuccessSearchByTitle: false,
				isError: false,
				dataByPriority: action.payload,
			},
		};
	case GET_MOVIE_SEARCH_BY_TITLE_SUCCESS:
		return {
			...state,
			getMovie: {
				...state.getMovie,
				isLoading: false,
				isSuccessByTitle: false,
				isSuccessByPriority: false,
				isSuccessSearchByTitle: true,
				isError: false,
				dataSearchByTitle: action.payload,
			},
		};
	case GET_MOVIE_FAILD:
		return {
			...state,
			getMovie: {
				...state.getMovie,
				isLoading: false,
				isSuccessByTitle: false,
				isSuccessByPriority: false,
				isSuccessSearchByTitle: false,
				isError: true,
			},
		};
	default: return state;
	}
};

export default moviesReducer;
