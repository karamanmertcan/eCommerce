import { useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart } from '../actions/cartActions';

const CartScreen = ({ match, history }) => {
  const location = useLocation();
  const productId = match.params.id;

  const qty = new URLSearchParams(location.search).get('qty');

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);

  useEffect(() => {
    if (productId) dispatch(addToCart(productId, qty));
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    console.log('remove');
  };

  const checkOutHandler = () => {
    history.push('/login?redirect=shipping');
    console.log('checkout');
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart Is Empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((cartItem) => (
              <ListGroup.Item key={cartItem.product}>
                <Row>
                  <Col md={2}>
                    <Image src={cartItem.image} alt={cartItem.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${cartItem.product}`} style={{ textDecoration: 'none' }}>
                      {cartItem.name}
                    </Link>
                  </Col>
                  <Col md={2}>${cartItem.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={cartItem.qty}
                      onChange={(e) =>
                        dispatch(addToCart(cartItem.product, Number(e.target.value)))
                      }>
                      {[...Array(cartItem.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button type="button" variant="light" onClick={() => removeFromCartHandler()}>
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}) items</h2>
              ${cartItems.reduce((acc, item) => acc + Number(item.price) * Number(item.qty), 0)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="w-100"
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}>
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
