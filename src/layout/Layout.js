import React from 'react';
import styled from 'styled-components';

const About = ({ children, title }) => (
	<Wrapper>
		<head>
			<title>{title}</title>
		</head>
		{children}
	</Wrapper>
);

const Wrapper = styled.div`
	min-height: calc(100vh - 56px);
`;

export default About;
