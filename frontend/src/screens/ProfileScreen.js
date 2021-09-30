import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';

const ProfileScreen = ({ location, history }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { orders, loading: loadingOrders, error: errorOrders } = orderListMy;
  console.log(orders);

  console.log(error);

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!userInfo.name || !userInfo || success) {
        dispatch(getUserDetails('profile'));
      } else {
        setValue('name', userInfo.name);
        setValue('email', userInfo.email);
        dispatch(listMyOrders());
      }
    }
  }, [history, userInfo, dispatch, user]);

  const notify = () => toast("Passwords doesn't match!!!");
  const updateSuccess = () => toast('Profile updated successfully!!!');

  const onSubmit = (data) => {
    console.log(data);
    //Dispat register
    if (data.password !== data.confirmPassword) {
      notify();
    } else {
      let formName = data.name;
      let formEmail = data.email;
      let formPassword = data.password;

      dispatch(
        updateUserProfile({
          id: user._id,
          name: formName,
          email: formEmail,
          password: formPassword
        })
      );
      updateSuccess();
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <ToastContainer />
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="email">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter a name" {...register('name')} />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Addresss</Form.Label>
            <Form.Control type="email" placeholder="Enter email" {...register('email')} />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" {...register('password')} />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              {...register('confirmPassword')}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-4">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
