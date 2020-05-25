import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { func, bool } from 'prop-types';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { getActionLocal } from '@store/actions/moviesActions';
import Form from './Form';

const Darwer = ({ visible, changeShow }) => {
	const dispatch = useDispatch();
	const [shoppingList, setShoppingList] = useState([]);
	const dato = useSelector((state) => state.moviesReducer.getLocalMovie);
	const {
		isSuccess,
		data,
	} = dato;

	useEffect(() => {
		dispatch(getActionLocal());
	}, [dispatch]);

	useEffect(() => {
		setShoppingList(data);
	}, [isSuccess, JSON.stringify(data)]);

	let total = 0;
	for (const movie of shoppingList) {
		const salePrice = Number(movie.salePrice);
		const rentPrice = Number(movie.rentPrice);
		const { cuantity, action } = movie;
		if (action === 'rent') {
			total += rentPrice * cuantity;
		} else {
			total += salePrice * cuantity;
		}
	}

	return (
		<>
			<Modal
				title='Carretilla de compras'
				placement='right'
				maskClosable={false}
				onCancel={() => changeShow(visible)}
				visible={visible}
				bodyStyle={{ maxHeight: 600, overflow: 'auto' }}
				centered
				destroyOnClose
				footer={(
					<div style={{
						width: '100%',
						display: 'flex',
						alignItems: 'center',
					}}
					>
						<div style={{
							fontSize: 25,
							color: '#343a40',
							fontWeight: 'bold',
						}}
						>
							{`Total pagar: $ ${total.toFixed(2)}`}
						</div>
						<Button variant='dark' style={{ marginRight: 8, marginLeft: 'auto' }}>
							Adquirir
						</Button>
					</div>
				)}
			>
				<Form shoppingList={shoppingList} />
			</Modal>
		</>
	);
};

Darwer.defaultProps = {
	visible: false,
};

Darwer.propTypes = {
	visible: bool,
	changeShow: func.isRequired,
};

export default Darwer;
