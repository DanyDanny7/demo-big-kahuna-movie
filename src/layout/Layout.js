import React from 'react';
import styled from 'styled-components';
import { node, string } from 'prop-types';

import Footer from '@components/Footer';


const Layout = ({ children, title }) => (
	<Wrapper>
		<head>
			<title>{title}</title>
		</head>
		<div className='contain'>
			{children}
		</div>
		<Footer className='footer' />
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
	height: calc(100vh - 58px );
	overflow: auto;
	.contain {
		min-height: calc(100vh - (58px + 70px) );
		max-width: 1444px;
		width: 100%;
		padding: 50px 0px;
		margin: auto;
	}
	.footer {
		position: fixed;
		bottom: 0px;
	}
`;

export default Layout;
