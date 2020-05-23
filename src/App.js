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
const Ejemplo = lazy(() => import('@pages/Ejemplo'));


const App = () => (
	<Suspense fallback={<Loading />}>
		<Switch>
			<Route exact path='/' component={Ejemplo} />
		</Switch>
	</Suspense>
);

export default App;
