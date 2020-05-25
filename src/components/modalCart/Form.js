/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Slider, Radio } from 'antd';
import { Row } from 'react-bootstrap';
import {
	number, string, shape, any, arrayOf,
} from 'prop-types';
import { useDispatch } from 'react-redux';

import { getActionLocal } from '@store/actions/moviesActions';
import CartdData from '@components/cartd/CartdData';

const Item = ({ movie }) => {
	const dispatch = useDispatch();
	const [stock, setStock] = useState(0);
	const [cuantity, setCuantity] = useState(1);
	const [price, setPrice] = useState(1);
	const [action, setAction] = useState('buy');

	useEffect(() => {
		setStock(movie.stock > 5 ? 5 : movie.stock);
		setCuantity(movie.cuantity);
		if (movie.action === 'rent') {
			setPrice(movie.rentPrice);
		} else {
			setPrice(movie.salePrice);
		}
	}, [movie.stock, movie.cuantity, movie.action, movie.salePrice, movie.rentPrice]);

	const updateShopping = (c, a) => {
		dispatch(getActionLocal({
			...movie,
			cuantity: c,
			action: a,
		}, 'update'));
	};

	const deleteShopping = (m) => {
		dispatch(getActionLocal(m, 'delete'));
	};

	const onChangeCuantity = (e) => {
		setCuantity(e);
		updateShopping(e, action);
	};

	const onChangeAction = (e) => {
		setPrice(e.target.value === 'rent' ? movie.rentPrice : movie.salePrice);
		setAction(e.target.value);
		updateShopping(cuantity, e.target.value);
	};

	const calcTotal = (p, c) => {
		const numb = p * c;
		return numb.toFixed(2);
	};


	return (
		<Row className='item'>
			<div className='item_card'>
				<CartdData type='single' moreData={false} movie={movie} />
			</div>
			<div className='item_count'>
				<div className='close'>
					<div
						className='closeX'
						onClick={() => deleteShopping(movie)}
						onKeyPress={() => deleteShopping(movie)}
						role='button'
						tabIndex='0'
					>
						<CloseCircleOutlined />
					</div>
				</div>
				<Slider
					className='cuantity'
					value={cuantity}
					max={stock}
					onChange={onChangeCuantity}
				/>
				<div className='action'>
					<Radio.Group className='group' defaultValue='buy' buttonStyle='solid' onChange={onChangeAction}>
						<Radio.Button value='buy'>Comprar</Radio.Button>
						<Radio.Button value='rent'>Alquilar</Radio.Button>
					</Radio.Group>
				</div>
				<div className='total'>
					<span>{`Total: $ ${calcTotal(price, cuantity)}`}</span>
				</div>
			</div>
		</Row>
	);
};

const Form = ({ shoppingList }) => (
	<Wrapper>
		{shoppingList.map((m) => (
			<Item key={m.id} movie={m} />
		))}
	</Wrapper>
);

const shoppingListTypes = {
	id: number,
	backdrop_path: string,
	title: string,
	overview: string,
	popularity: number,
	salePrice: string,
	rentPrice: string,
	stock: number,
	cuantity: number,
	action: string,
	any,
};

Item.defaultProps = {
	movie: [],
};
Form.defaultProps = {
	shoppingList: {},
};

Item.propTypes = {
	movie: shape(shoppingListTypes),
};
Form.propTypes = {
	shoppingList: arrayOf(shape(shoppingListTypes)),
};

const Wrapper = styled.div`

    .item {
        min-height: 200px;
        display: flex;
        &_card {
            width: 50%;
        }
        &_count {
            width: 50%;

            .close {
                font-size: 20px;
                height: 30px;
                width: 90%;
                display: flex;
                justify-content: flex-end;

                .closeX {
                    cursor: pointer;
                }
            }

            .ant-slider {
                &-track {
                    background-color: #343a40;
                }
                &-handle.ant-tooltip-open {
                    border-color: #343a40;
                }
            }
            .cuantity{
                width: 80%;
                padding: 15% 10% 10% 0%;
                margin: 20px auto;
            }
            .total {
                font-size: 25px;
                text-align: center;
                font-weight: bold;
            }
            .action {
                margin-bottom: 20px;
                display: flex;
                .group {
                    margin: auto;
                }
                .ant-radio {
                    &-button-wrapper-checked:not([class*=' ant-radio-button-wrapper-disabled']).ant-radio-button-wrapper:first-child {
                        border-right-color: #343a40 !important;
                    }
                    &-group-solid .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
                        background-color: #343a40 !important;
                        border-color: #343a40 !important;
                    }
                }
            }
        }
    }
`;

export default Form;
