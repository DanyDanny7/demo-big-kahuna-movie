/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import {
	CardDeck, Row, Col, InputGroup, FormControl,
} from 'react-bootstrap';
import styled from 'styled-components';
import { Radio, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { getMovie } from '@store/actions/moviesActions';
import Layout from '@layout/Layout';
import CartdData from '@components/cartd/CartdData';
import { LoadingSmall } from '@components/Loading';

const Catalog = () => {
	const dispatch = useDispatch();
	const [miData, setMiData] = useState([]);
	const [filter, setFilter] = useState('title');
	const [titleFilter, setTitleFilter] = useState('');
	const [pag, setPag] = useState(1);

	const movie = useSelector((state) => state.moviesReducer.getMovie);

	const {
		dataByPriority,
		dataByTitle,
		dataSearchByTitle,
		isLoading,
		total,
	} = movie;

	useEffect(() => {
		switch (filter) {
		case 'popularity': setMiData(dataByPriority); break;
		case 'byTitle': setMiData(dataSearchByTitle); break;
		default: setMiData(dataByTitle); break;
		}
	}, [JSON.stringify(dataByPriority), JSON.stringify(dataByTitle), JSON.stringify(dataSearchByTitle), filter]);


	useEffect(() => {
		setFilter('title');
		dispatch(getMovie('title', pag));
	}, []);

	useEffect(() => {
		dispatch(getMovie(filter, pag, titleFilter));
	}, [pag, titleFilter, filter]);

	const transform = (value) => {
		let contenido = '';
		for (let i = 0; i < value.length; i++) {
			contenido += (value.charAt(i) === ' ') ? '+' : value.charAt(i);
		}
		return contenido;
	};

	const onPress = (e) => {
		setTitleFilter('');
		setFilter(e.target.value);
		dispatch(getMovie(e.target.value, pag));
	};

	const onChange = (e) => {
		if (e.target.value.length > 0) {
			setFilter('byTitle');
			setTitleFilter(transform(e.target.value));
			setPag(1);
			dispatch(getMovie('byTitle', 1, transform(e.target.value)));
		} else {
			setFilter('title');
			dispatch(getMovie('title', pag));
		}
	};

	const changePag = (pageNumber) => {
		setPag(pageNumber);
	};

	return (
		<Layout title='Catálogo'>
			<Switch>
				<Row className='pr-2 pl-2 '>
					<Col lg={4} md={12} sm={12} xs={12} className='item'>
						<div className='input'>
							<InputGroup size='sm'>
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
					</Col>
					<Col lg={6} md={12} sm={12} xs={12} className='item'>
						<Pagination
							showQuickJumper
							defaultCurrent={1}
							total={total}
							showSizeChanger={false}
							onChange={changePag}
							pageSize={20} // leí la docu y el foro, y me topé con que la api está limitada a 20 resultados, por eso el parametro no es dinamico
						/>
					</Col>
					<Col lg={2} md={12} sm={12} xs={12} className='item'>
						<Radio.Group defaultValue={filter} buttonStyle='solid' onChange={onPress}>
							<Radio.Button value='title'>Título</Radio.Button>
							<Radio.Button value='popularity'>Popularidad</Radio.Button>
						</Radio.Group>
					</Col>
				</Row>
			</Switch>
			<CardDeck>
				<Row className='pr-2 pl-2 '>
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
	min-height: 50px;
	margin: 0px;
	
	.item {
		margin: 0px;
		height: 50px;
		display: flex;
		justify-content: center;
		white-space: nowrap;
	}
	.input {
		width: 70%;
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
