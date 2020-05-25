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
const Conditions = lazy(() => import('@pages/conditions'));
const Privacy = lazy(() => import('@pages/privacy'));
const About = lazy(() => import('@pages/about'));
const Error404 = lazy(() => import('@components/Error404'));


const App = () => (
	<div>
		<Suspense fallback={<Loading />}>
			<NavBar />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/catalogo' component={Catalog} />
				<Route exact path='/privacidad' component={Privacy} />
				<Route exact path='/terminos_y_condiciones' component={Conditions} />
				<Route exact path='/acerca_de' component={About} />
				<Route exact path='*' component={Error404} />
			</Switch>
			{/* <Footer /> */}
		</Suspense>
	</div>
);

export default App;
