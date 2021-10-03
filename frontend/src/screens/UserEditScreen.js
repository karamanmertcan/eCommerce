import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserDetails, updateUser } from '../actions/userActions';
import { Link } from 'react-router-dom';
import { USER_DETAILS_RESET } from '../constants/userConstants';

const UserEditScreen = ({ location, match, history }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const userId = match.params.id;
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: updateLoading, error: updateError, success: updateSuccess } = userUpdate;

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: USER_DETAILS_RESET });
    }
    if (!user.name || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setValue('name', user?.name);
      setValue('email', user?.email);
      setValue('isAdmin', user?.isAdmin);
    }
  }, [userId, dispatch, user, updateSuccess, history]);

  const notify = () => toast('User Updated Successfully !!!');

  const onSubmit = (data) => {
    dispatch(
      updateUser({ _id: userId, name: data.name, email: data.email, isAdmin: data.isAdmin })
    );
    notify();
  };

  return (
    <>
      <Link to={`/admin/userlist`} className="btn btn-light my-3"></Link>
      <FormContainer>
        <h1>Edit User</h1>
        {updateLoading ? (
          <Loader />
        ) : updateError ? (
          <Message variant="danger">{updateError}</Message>
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="email">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter a name" {...register('name')} />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Addresss</Form.Label>
              <Form.Control type="email" placeholder="Enter email" {...register('email')} />
            </Form.Group>
            <Form.Group controlId="isadmin">
              <Form.Check type="checkbox" label="Is Admin " {...register('isAdmin')} />
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
        <ToastContainer />
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
