import React from 'react';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';

const Loading = () => (
	<Wrapper>
		<Spinner animation='grow' />
		<Spinner animation='grow' />
		<Spinner animation='grow' />
	</Wrapper>
);

const LoadingSmall = () => (
	<WrapperSmall>
		<Spinner animation='grow' />
		<Spinner animation='grow' />
		<Spinner animation='grow' />
	</WrapperSmall>
);

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: calc(100vh - 58px);
`;

const WrapperSmall = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 300px;
	width: 100%;
`;

export { Loading, LoadingSmall };
