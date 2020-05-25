/* eslint-disable max-len */
import React, { useState } from 'react';
import { Card, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { LikeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import {
	number, string, shape, bool, any,
} from 'prop-types';
import { useDispatch } from 'react-redux';

import { getActionLocal } from '@store/actions/moviesActions';

const CartdData = ({ movie, type, moreData }) => {
	const dispatch = useDispatch();
	const [showMore, setShowMore] = useState(false);
	const [error, setError] = useState(false);
	const base = 'https://image.tmdb.org/t/p/w154';
	const isDefault = 'https://www.apertura.com/__export/1508853721165/sites/revistaap/img/2017/10/24/pelxcula-cine-hollywood.jpg_1913337537.jpg';

	const change = (show) => {
		setShowMore(!show);
	};

	const calcSale = (value) => {
		if (value <= 20) {
			const numb = 5;
			return numb.toFixed(2);
		} if (value > 20 && value < 200) {
			const numb = value * 0.10;
			return numb.toFixed(2);
		}
		const numb = 20;
		return numb.toFixed(2);
	};
	const calcRental = (value) => {
		const numb = calcSale(value) / 5;
		return numb.toFixed(2);
	};
	const calcStock = (value) => {
		if (value <= 1) {
			return 0;
		} if (value > 1 && value < 200) {
			const numb = value * 0.2;
			return numb.toFixed(0);
		}
		return 40;
	};
	const calcAvailable = (value) => {
		if (calcStock(value) > 0) {
			return 'Si';
		}
		return 'No';
	};

	const cT = (value) => {
		const single = !!(type === 'single');
		switch (value) {
		case 'lg': return single ? 12 : 3;
		case 'md': return single ? 12 : 4;
		case 'sm': return single ? 12 : 6;
		default: return 12;
		}
	};

	const addShopping = (m) => {
		dispatch(getActionLocal({
			...m,
			salePrice: calcSale(m.popularity),
			rentPrice: calcRental(m.popularity),
			stock: Number(calcStock(m.popularity)),
			cuantity: 1,
			action: 'buy',
		}, 'add'));
	};


	return (
		<Col lg={cT('lg')} md={cT('md')} sm={cT('sm')} xs={cT('xs')}>
			<WrapperCart show={showMore}>
				<Card>
					<Card.Img
						className='img'
						variant='top'
						src={error ? isDefault : `${base}${movie.backdrop_path}`}
						onError={() => setError(true)}
						onClick={() => change(showMore)}
						onKeyPress={() => change(showMore)}
						role='button'
						tabIndex='0'
					/>
					<Card.Body
						className='body'
						onClick={() => change(showMore)}
						onKeyPress={() => change(showMore)}
						role='button'
						tabIndex='0'
					>
						<Card.Title>{movie.original_title}</Card.Title>
						<Card.Text>
							{movie.overview}
						</Card.Text>
						{moreData && (
							<Card.Text>
								<span className='detail'>
									Precio alquiler:
									<span>{`$ ${calcRental(movie.popularity)}`}</span>
								</span>
								<br />
								<span className='detail'>
									Precio venta:
									<span>{`$ ${calcSale(movie.popularity)}`}</span>
								</span>
								<br />
								<span className='detail'>
									Existencias:
									<span>{`${calcStock(movie.popularity)} Und`}</span>
								</span>
								<br />
								<span className='detail'>
									Disponible:
									<span>{calcAvailable(movie.popularity)}</span>
								</span>
							</Card.Text>
						)}
						<div className='gradient' />
					</Card.Body>
					{moreData && (
						<Card.Footer>
							<span className='text-muted'>
								<LikeOutlined className='likeIco' />
								<small className='likeText'>
									{movie.popularity < 1 ? 0 : movie?.popularity?.toFixed(0)}
								</small>
							</span>
							{calcAvailable(movie.popularity) === 'Si' && (
								<div
									className='cart aling'
									onClick={() => addShopping(movie)}
									onKeyPress={() => addShopping(movie)}
									role='button'
									tabIndex='0'
								>
									<ShoppingCartOutlined />
								</div>
							)}
						</Card.Footer>
					)}
				</Card>
			</WrapperCart>
		</Col>
	);
};

CartdData.defaultProps = {
	movie: {},
	type: 'multi',
	moreData: true,
};

CartdData.propTypes = {
	type: string,
	moreData: bool,
	movie: shape({
		backdrop_path: string,
		title: string,
		overview: string,
		popularity: number,
		any,
	}),
};

const WrapperCart = styled.div`
    margin-bottom: 20px;

	.img {
		&:focus {
                outline: none;
            }
	}
    .body { 
        max-height: ${(props) => (props.show ? 'auto' : '160px')};
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;

        &:focus {
                outline: none;
            }
        .gradient {
            position: absolute;
            bottom: 0px;
            width: 100%;
            height: 50px;
            background: rgba(0,0,0,0);
            background: -webkit-linear-gradient(to bottom, rgba(0,0,0,0) 10%, #fff); 
            background: linear-gradient(to bottom, rgba(0,0,0,0) 10%, #fff);
        }

		.detail {
			width: 175px;
			margin: auto;
			white-space: nowrap;
			span {
				float: right;
				margin-left: 3px;
				color: #000;
				font-weight: bold;
			}
		}
    }
    .likeIco {
        color: #1890ff;
    }
    .likeText {
        margin-left: 5px;
        color: #000;
    }
    .anticon svg {
        vertical-align: 0;
    }
    .aling {
        float: right;
        font-weight: bold;
        .price {
            margin-left: 5px;
            color: #000;
        }
    }
	.cart {
		font-size: 20px;
		cursor: pointer;
		color: green;
	}
`;

export default CartdData;
