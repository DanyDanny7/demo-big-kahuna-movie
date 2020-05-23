import React,
{
	lazy,
	Suspense,
} from 'react';

import {
	Switch,
	Route,
} from 'react-router-dom';
import Loading from '@pages/Loading';

// pages components
const NavBar = lazy(() => import('@components/navBar/NavBar'));
const Home = lazy(() => import('@pages/home'));
const MovieCatalog = lazy(() => import('@pages/movieCatalog'));
const About = lazy(() => import('@pages/about'));
const Cart = lazy(() => import('@pages/cart'));


const App = () => (
	<Suspense fallback={<Loading />}>
		<NavBar />
		<Switch>
			<Route exact path='/' component={Home} />
			<Route exact path='/catalogo' component={MovieCatalog} />
			<Route exact path='/acercaDe' component={About} />
			<Route exact path='/carrito' component={Cart} />
		</Switch>
	</Suspense>
);

export default App;
