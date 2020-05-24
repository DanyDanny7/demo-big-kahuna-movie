/* eslint-disable max-len */
import React, { useState } from 'react';
import {
	Card,
	Col,
} from 'react-bootstrap';
import styled from 'styled-components';
import { LikeOutlined } from '@ant-design/icons';
import { number, string, shape } from 'prop-types';

const CartdData = ({ movie }) => {
	const [showMore, setShowMore] = useState(false);
	const [error, setError] = useState(false);
	const base = 'http://image.tmdb.org/t/p/w154';
	const isDefault = 'https://www.apertura.com/__export/1508853721165/sites/revistaap/img/2017/10/24/pelxcula-cine-hollywood.jpg_1913337537.jpg';

	const change = (show) => {
		setShowMore(!show);
	};

	return (
		<Col lg={3} md={4} sm={6} xs={12}>
			<WrapperCart show={showMore}>
				<Card
					onClick={() => change(showMore)}
					onKeyPress={() => change(showMore)}
					role='button'
					tabIndex='0'
				>
					{/* <Card.Img variant='top' src={`${base}${movie.backdrop_path}`} /> */}
					<Card.Img
						variant='top'
						src={error ? `${isDefault}` : `${base}${movie.backdrop_path}`}
						onError={() => setError(true)}
					/>
					<Card.Body className='body'>
						<Card.Title>{movie.original_title}</Card.Title>
						<Card.Text className='overview'>
							{movie.overview}
						</Card.Text>
						<div className='gradient' />
					</Card.Body>
					<Card.Footer>
						<span className='text-muted'>
							<LikeOutlined className='likeIco' />
							<small className='likeText'>
								{movie.popularity < 1 ? 0 : movie.popularity}
							</small>
						</span>
						<small className='text-muted aling'>
							Precio:
							<span className='price'>$5.00</span>
						</small>
					</Card.Footer>
				</Card>
			</WrapperCart>
		</Col>
	);
};

CartdData.defaultProps = {
	movie: {},
};

CartdData.propTypes = {
	movie: shape({
		backdrop_path: string,
		title: string,
		overview: string,
		popularity: number,
	}),
};

const WrapperCart = styled.div`
    margin-bottom: 20px;

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
`;

export default CartdData;
