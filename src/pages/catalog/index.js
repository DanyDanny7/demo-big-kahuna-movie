/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import {
	CardDeck, Row, InputGroup, FormControl,
} from 'react-bootstrap';
import axios from 'axios';
import styled from 'styled-components';
import { Radio } from 'antd';

import Layout from '@layout/Layout';
import CartdData from '@components/cartd/CartdData';

const Catalog = () => {
	const [miData, setMiData] = useState([]);
	const [filter, setFilter] = useState('title');

	const getData = async (filt, title) => {
		const path = 'https://api.themoviedb.org/3/movie/top_rated?api_key=510e5395ceb2e557cf3fb72141932029&language=es-ES&page=1';
		const popular = 'http://api.themoviedb.org/3/discover/movie?api_key=510e5395ceb2e557cf3fb72141932029&language=es-ES&sort_by=popularity.desc&page=1';
		const titulo = 'http://api.themoviedb.org/3/discover/movie?api_key=510e5395ceb2e557cf3fb72141932029&language=es-ES&sort_by=original_title.asc&page=1';
		const byTitle = `https://api.themoviedb.org/3/search/movie?api_key=510e5395ceb2e557cf3fb72141932029&language=es-ES&query=${title}&page=1`;

		switch (filt) {
		case 'popularity': {
			const data = await axios.get(popular);
			/*
				sord adicional porque los ordena por popularidad (verificar path) sin embargo,
				por temas de caché del servidor no se actualizan tan frecuentemente
			*/
			const order = data.data?.results.sort((a, b) => b.popularity - a.popularity);
			setMiData(order || []);
		} break;
		case 'byTitle': {
			const data = await axios.get(byTitle);
			setMiData(data.data?.results || []);
		}
			break;
		default: {
			const data = await axios.get(titulo);
			setMiData(data.data?.results || []);
		}
			break;
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const onPress = (e) => {
		setFilter(e.target.value);
		getData(e.target.value);
	};

	const transform = (value) => {
		let contenido = '';
		for (let i = 0; i < value.length; i++) {
			contenido += (value.charAt(i) === ' ') ? '+' : value.charAt(i);
		}
		return contenido;
	};

	const onChange = (e) => {
		console.log('data', e.target.value.length);
		if (e.target.value.length > 0) {
			getData('byTitle', transform(e.target.value));
		} else {
			getData();
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
						miData.map((movie) => (
							<CartdData key={movie.id} movie={movie} />
						))
					}
				</Row>
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
