import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { Link } from 'react-router-dom';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = ({ location, match, history }) => {
  const productId = match.params.id;
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: updateSuccess } = productUpdate;

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setValue('name', product?.name);
        setValue('price', product?.price);
        setValue('description', product?.description);
        setValue('brand', product?.brand);
        setValue('category', product?.category);
        setValue('countInStock', product?.countInStock);
        setValue('image', product?.image);
      }
    }
  }, [productId, dispatch, product, history, updateSuccess]);

  const notify = () => toast('User Updated Successfully !!!');

  const onSubmit = (data) => {
    dispatch(
      updateProduct({
        _id: productId,
        name: data.name,
        price: data.price,
        description: data.description,
        brand: data.brand,
        category: data.category,
        countInStock: data.countInStock,
        image: data.image,
        numReviews: 0
      })
    );
    notify();
  };

  return (
    <>
      <Link to={`/admin/productlist`} className="btn btn-light my-3"></Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="email">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter a name" {...register('name')} />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                {...register('description')}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Enter Price" {...register('price')} />
            </Form.Group>
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control type="text" placeholder="Enter brand" {...register('brand')} />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" placeholder="Enter category" {...register('category')} />
            </Form.Group>
            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control type="number" placeholder="Enter stock" {...register('countInStock')} />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control type="text" placeholder="Enter image" {...register('image')} />
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

export default ProductEditScreen;
