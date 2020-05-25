import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
	Container,
	Navbar,
	Nav,
} from 'react-bootstrap';

import Modal from '@components/modalCart/Modal';

const NavBar = () => {
	const [path, setPath] = useState('/');
	const [visible, setVisible] = useState(false);

	const changeShow = (v) => {
		setVisible(!v);
	};

	return (
		<Wrapper>
			<Container>
				<Modal visible={visible} changeShow={changeShow} />
				<Navbar className='contain' collapseOnSelect expand='sm' bg='dark' variant='dark'>
					<Link className='navbar-brand' to='/' onClick={() => setPath('/')}>
						<img src='/icoIndex.png' alt='' />
						BK Movie
					</Link>
					<Navbar.Toggle aria-controls='responsive-navbar-nav' />
					<Navbar.Collapse id='responsive-navbar-nav'>
						<Nav className='ml-auto'>
							<Link
								className={`nav-link ${path === '/catalogo' && 'active'}`}
								to='/catalogo'
								onClick={() => setPath('/catalogo')}
							>
								Catálogo de películas
							</Link>
							<div
								className={`nav-link ${path === '/carrito' && 'active'}`}
								// to='/carrito'
								onClick={() => { changeShow(visible); setPath('/carrito'); }}
								onKeyPress={() => { changeShow(visible); setPath('/carrito'); }}
								role='button'
								tabIndex='0'
							>
								Carrito
							</div>
							<Link
								className={`nav-link ${path === '/acerca_de' && 'active'}`}
								to='/acerca_de'
								onClick={() => setPath('/acerca_de')}
							>
								Acerca de
							</Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</Container>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	background-color: #343a40;
	min-height: 58px;

	img {
		width: 50px;
   		margin: -10px 10px -5px 0px;
	}
`;

export default NavBar;
