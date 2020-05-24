import React,
{
	lazy,
	Suspense,
} from 'react';

import {
	Switch,
	Route,
} from 'react-router-dom';
import { Loading } from '@components/Loading';
import NavBar from '@components/navBar/NavBar';

// pages components
// const NavBar = lazy(() => import('@components/navBar/NavBar'));
const Catalog = lazy(() => import('@pages/catalog'));
const Home = lazy(() => import('@pages/home'));
const About = lazy(() => import('@pages/about'));
const Cart = lazy(() => import('@pages/cart'));


const App = () => (
	<div>
		<Suspense fallback={<Loading />}>
			<NavBar />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/catalogo' component={Catalog} />
				<Route exact path='/acercaDe' component={About} />
				<Route exact path='/carrito' component={Cart} />
			</Switch>
		</Suspense>
	</div>
);

export default App;
