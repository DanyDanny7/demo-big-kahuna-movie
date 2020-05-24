import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Footer = () => (
	<Wrapper>
		<div className='lefth'>
			<span>
				Enlaces:
			</span>
			<a href='https://www.themoviedb.org/' target='blank'>
				<img src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg' alt='themoviedb' />
			</a>
		</div>
		<div className='right'>
			<Link
				to='/privacidad'
			>
				<span>
					Privacidad
				</span>
			</Link>
			<Link
				to='/terminos_y_condiciones'
			>
				<span>
					Términos y condiciones
				</span>
			</Link>
		</div>
	</Wrapper>
);

const Wrapper = styled.div`
    padding: 0px 30px;
	background-color: #343a40;
	height: 60px;
    width: 100%;
    display: flex;
    
    .lefth {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;

        span {
            color: #fff;
        }
        img {
            height: 10px;
        }
    }
    .right {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        flex-direction: column;

        span {
            color: #fff;
        }
    }
`;

export default Footer;
