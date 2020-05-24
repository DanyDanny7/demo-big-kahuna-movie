import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
	Container,
	Navbar,
	Nav,
} from 'react-bootstrap';

const NavBar = () => {
	const [path, setPath] = useState('/');

	return (
		<Wrapper>
			<Container>
				<Navbar classNam='contain' collapseOnSelect expand='sm' bg='dark' variant='dark'>
					<Link className='navbar-brand' to='/' onClick={() => setPath('/')}>Big Kahuna Movie</Link>
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
							<Link
								className={`nav-link ${path === '/carrito' && 'active'}`}
								to='/carrito'
								onClick={() => setPath('/carrito')}
							>
								Carrito
							</Link>
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
`;

export default NavBar;
