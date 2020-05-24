/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import {
	CardDeck, Row, InputGroup, FormControl,
} from 'react-bootstrap';
import styled from 'styled-components';
import { Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { getMovie } from '@store/actions/moviesActions';
import Layout from '@layout/Layout';
import CartdData from '@components/cartd/CartdData';
import { LoadingSmall } from '@components/Loading';

const Catalog = () => {
	const dispatch = useDispatch();
	const [miData, setMiData] = useState([]);
	const [filter, setFilter] = useState('title');

	const movie = useSelector((state) => state.moviesReducer.getMovie);

	const {
		dataByPriority,
		dataByTitle,
		dataSearchByTitle,
		isLoading,
	} = movie;

	useEffect(() => {
		switch (filter) {
		case 'popularity': setMiData(dataByPriority); break;
		case 'byTitle': setMiData(dataSearchByTitle); break;
		default: setMiData(dataByTitle); break;
		}
	}, [movie]);

	useEffect(() => {
		setFilter('title');
		dispatch(getMovie('title', 1));
	}, []);

	// useEffect(() => {
	// 	window.onscroll = () => {
	// 		const height = document.body.clientHeight;
	// 		const current = window.pageYOffset + window.innerHeight;
	// 		console.log('alto', height);
	// 		console.log('actual', current);
	// 		// if(current === height && !isError) {
	// 		//     getComics(parameters);
	// 		// }
	// 	};
	// }, [window]);
	// console.log(document.body.clientHeight);

	const onPress = (e) => {
		setFilter(e.target.value);
		dispatch(getMovie(e.target.value, 1));
	};

	const transform = (value) => {
		let contenido = '';
		for (let i = 0; i < value.length; i++) {
			contenido += (value.charAt(i) === ' ') ? '+' : value.charAt(i);
		}
		return contenido;
	};

	const onChange = (e) => {
		if (e.target.value.length > 0) {
			setFilter('byTitle');
			dispatch(getMovie('byTitle', 1, transform(e.target.value)));
		} else {
			setFilter('title');
			dispatch(getMovie('title', 1));
		}
	};

	return (
		<Layout title='Catálogo'>
			<Switch>
				<div className='input'>
					<InputGroup size='sm' className='mb-3'>
						<InputGroup.Prepend>
							<InputGroup.Text id='inputGroup-sizing-sm'>Buscar por título</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							aria-label='Small'
							aria-describedby='inputGroup-sizing-sm'
							onChange={onChange}
						/>
					</InputGroup>
				</div>
				<Radio.Group defaultValue={filter} buttonStyle='solid' onChange={onPress}>
					<Radio.Button value='title'>Título</Radio.Button>
					<Radio.Button value='popularity'>Popularidad</Radio.Button>
				</Radio.Group>
			</Switch>
			<CardDeck>
				<Row>
					{
						miData.map((m) => (
							<CartdData key={m.id} movie={m} />
						))
					}
				</Row>
				{isLoading && <LoadingSmall />}
			</CardDeck>
		</Layout>
	);
};

const Switch = styled.div`
	display: flex;
    justify-content: flex-end;
    justify-items: center;
	height: 50px;
	

	.input {
		margin-right: auto;
		width: 30%;
		max-width: 600px;
		min-width: 300px;
		&-group-text {
			background-color: #343a40;
			color: #fff;
		}
	}

	.ant-radio {
		&-button-wrapper-checked:not([class*=' ant-radio-button-wrapper-disabled']).ant-radio-button-wrapper:first-child {
			border-right-color: #343a40 !important;
		}
		&-group-solid .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
			background-color: #343a40 !important;
    		border-color: #343a40 !important;
		}
	}
`;

export default Catalog;
