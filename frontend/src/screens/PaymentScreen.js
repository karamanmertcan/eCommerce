import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  }
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    dispatch(savePaymentMethod(data.paymentMethod));
    history.push('/placeorder');
  };

  useEffect(() => {
    setValue('paymentMethod', 'Paypal');
  }, []);

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Paypal or Credit Card"
              id="PayPal"
              value="PayPal"
              name="paymentMethod"
              checked
              {...register('paymentMethod')}></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" primary="variant" className="mt-4">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
