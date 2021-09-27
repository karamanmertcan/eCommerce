import { useEffect, useState } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Message';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants';
import { getOrderDetails } from '../actions/orderActions';
import { payOrder } from '../actions/orderActions';

import Message from '../components/Message';

const OrderScreen = ({ match }) => {
  //order id from params
  const orderId = match.params.id;

  //useDispatch hook
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  console.log(cart);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { orderUrl, orderSuccess, orderError, orderResponse } = orderPay;
  console.log(orderResponse);

  useEffect(() => {
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }

    if (!orderSuccess || order._id !== orderId) {
      // dispatch({ type: ORDER_PAY_RESET });
      console.log('selam');
    } else {
      toast.success('Payment Successful');
      window.location.href = orderUrl;
    }
  }, [order, orderId, orderSuccess]);

  const checkOutHandler = () => {
    dispatch(
      payOrder({ cart: cart.cartItems, taxPrice: cart.taxPrice, shippingPrice: cart.shippingPrice })
    );
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Row>
      <h1>Order Id : {order._id}</h1>
      <Col md={8}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>Items Price : ${order.itemsPrice} </h2>
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Shipping</h2>
            <p>
              <strong>Name : </strong> {order.user.name}
            </p>
            <p>
              <strong>Email : </strong>{' '}
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </p>
            <p>
              <strong>Address: </strong>
              {order.shippingAddress.address}
              {'   '}
              {'   '},{order.shippingAddress.city},{order.shippingAddress.postalCode} ,
              {order.shippingAddress.country},
            </p>
            {order.isDelivered ? (
              <Message variant="success">Order Delivered</Message>
            ) : (
              <Message variant="danger">Not Delivered</Message>
            )}
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Payment Method</h2>
            <p>
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <Message variant="success">Paid on {order.paidAt}</Message>
            ) : (
              <Message variant="danger">Not paid</Message>
            )}
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Order Items</h2>
            {order.orderItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <ListGroup variant="flush">
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item.product}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>
            {/* <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </ListGroup.Item> */}
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>${order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>{error && <Message variant="danger">{error}</Message>}</ListGroup.Item>
            <Button variant="primary" onClick={checkOutHandler}>
              Checkout
            </Button>{' '}
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default OrderScreen;
