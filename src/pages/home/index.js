import React, { useEffect, useState } from 'react';
import {
	CardDeck, Row, Col, Button,
} from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { getMovie } from '@store/actions/moviesActions';
import Layout from '@layout/Layout';
import CartdData from '@components/cartd/CartdData';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingSmall } from '@components/Loading';

const Home = () => {
	const dispatch = useDispatch();
	const [miData, setMiData] = useState([]);

	const movie = useSelector((state) => state.moviesReducer.getMovie);
	const {
		dataByPriority,
		isLoading,
	} = movie;

	useEffect(() => {
		setMiData(dataByPriority);
	}, [JSON.stringify(dataByPriority)]);

	useEffect(() => {
		dispatch(getMovie('popularity', 1));
	}, [dispatch]);

	return (
		<Layout title='Big Kahuna Movie'>
			<Wrapper>
				<Row className='pr-2 pl-2'>
					<Col lg={11} md={11} sm={10} xs={9}>
						<h1>
							Lo más popular
						</h1>
					</Col>
					<Col lg={1} md={1} sm={2} xs={3} className='ml-auto'>
						<Link to='/catalogo'>
							<Button variant='dark'>
								Ver todo
							</Button>
						</Link>
					</Col>
				</Row>
				<CardDeck>
					<Row>
						{
							miData.slice(0, 5).map((m) => (
								<CartdData key={m.id} movie={m} />
							))
						}
						{isLoading && <LoadingSmall />}
					</Row>
				</CardDeck>
			</Wrapper>
		</Layout>
	);
};

const Wrapper = styled.div`
`;

export default Home;
