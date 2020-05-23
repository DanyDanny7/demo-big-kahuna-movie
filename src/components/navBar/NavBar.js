import React from 'react';
import { Link } from 'react-router-dom';
import {
	Button,
	Navbar,
	Nav,
	Form,
	FormControl,
} from 'react-bootstrap';

const NavBar = () => (
	<div>
		<Navbar collapseOnSelect expand='md' bg='dark' variant='dark'>
			<Navbar.Brand href='#home'>Navbar</Navbar.Brand>
			<Navbar.Toggle aria-controls='responsive-navbar-nav' />
			<Navbar.Collapse id='responsive-navbar-nav'>
				<Nav className='mr-auto'>
					<Link className='nav-link' to='/'>Home</Link>
					<Link className='nav-link' to='/catalogo'>Catálogo de películas</Link>
					<Link className='nav-link' to='/carrito'>Carrito</Link>
					<Link className='nav-link' to='/acercaDe'>Acerca de</Link>
				</Nav>
				<Form inline>
					<FormControl type='text' placeholder='Search' className='mr-sm-2' />
					<Button variant='outline-info'>Search</Button>
				</Form>

			</Navbar.Collapse>
		</Navbar>
	</div>
);

export default NavBar;
