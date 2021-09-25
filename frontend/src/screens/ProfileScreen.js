import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserDetails, updateUserProfile } from '../actions/userActions';

const ProfileScreen = ({ location, history }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  console.log(error);

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!userInfo.name) {
        dispatch(getUserDetails('profile'));
      } else {
        setValue('name', userInfo.name);
        setValue('email', userInfo.email);
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
      </Col>
    </Row>
  );
};

export default ProfileScreen;
