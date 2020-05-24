import React, { useEffect, useState } from 'react';
import { CardDeck, Row } from 'react-bootstrap';
import axios from 'axios';
import styled from 'styled-components';

import Layout from '@layout/Layout';
import CartdData from '@components/cartd/CartdData';

const Home = () => {
	const [miData, setMiData] = useState([]);

	const getData = async () => {
		const path = 'https://api.themoviedb.org/3/movie/top_rated?api_key=510e5395ceb2e557cf3fb72141932029&language=es-ES&page=1';
		const popular = 'http://api.themoviedb.org/3/discover/movie?api_key=510e5395ceb2e557cf3fb72141932029&sort_by=popularity.desc&language=es-ES&page=1';
		const data = await axios.get(popular);
		setMiData(data.data?.results || []);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<Layout title='Catálogo'>
			<Wrapper>
				<Row>
					<CardDeck>
						{
							miData.splice(0, 5).map((movie) => (
								<CartdData key={movie.id} movie={movie} />
							))
						}
					</CardDeck>
				</Row>
			</Wrapper>
		</Layout>
	);
};

const Wrapper = styled.div`
`;

export default Home;
