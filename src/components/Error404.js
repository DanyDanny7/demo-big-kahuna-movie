import React from 'react';
import { Result } from 'antd';
import { Button } from 'react-bootstrap';

import Layout from '@layout/Layout';
import { Link } from 'react-router-dom';

const Error404 = () => (
	<Layout title='Catálogo'>
		<Result
			status='404'
			title='404'
			subTitle='Lo sentimos, la página a la que intenta acceder no existe.'
			extra={<Link to='/'><Button variant='dark'>Salir de aquí</Button></Link>}
		/>
	</Layout>
);


export default Error404;
