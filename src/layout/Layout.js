import React from 'react';
import styled from 'styled-components';
import { node, string } from 'prop-types';

const Layout = ({ children, title }) => (
	<Wrapper>
		<head>
			<title>{title}</title>
		</head>
		<div className='contain'>
			{children}
		</div>
	</Wrapper>
);

Layout.defaultProps = {
	title: 'Big-Kahuna Movie',
};

Layout.propTypes = {
	title: string,
	children: node.isRequired,
};

const Wrapper = styled.div`
	height: calc(100vh - 58px);
	overflow: auto;
	
	.contain {
		max-width: 1444px;
		padding: 50px 0px;
		margin: auto;
	}
`;

export default Layout;
