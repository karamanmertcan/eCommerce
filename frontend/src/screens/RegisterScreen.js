import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from '../actions/userActions';

const RegisterScreen = ({ location, history }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo, message } = userLogin;
  console.log(error);

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const notify = () => toast("Passwords doesn't match!!!");

  const onSubmit = (data) => {
    console.log(data);
    //Dispat register
    if (data.password !== data.confirmPassword) {
      notify();
    } else {
      dispatch(registerUser(data.name, data.email, data.password));
      console.log(redirect);

      // history.push(redirect);
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <ToastContainer />
      {message && <Message variant="danger">{message}</Message>}
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
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account ?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
