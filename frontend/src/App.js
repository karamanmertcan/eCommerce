import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SuccessPayment from './screens/SuccessPayment';

const App = () => {
  const stripePromise = loadStripe(
    'pk_test_51JdjP5AjDquacJP3SQO8BzmtBVDdBqEF9jl0Ir6QCqDkVam36FeZ2iUfbXQdiUFfnKuFxRIcd3EROX5ySnqYBtJ300Vq5YApzs'
  );
  return (
    <Elements stripe={stripePromise}>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Route path="/pay/success/:id" component={SuccessPayment} exact />
            <Route path="/order/:id" component={OrderScreen} exact />
            <Route path="/placeorder" component={PlaceOrderScreen} exact />
            <Route path="/payment" component={PaymentScreen} exact />
            <Route path="/shipping" component={ShippingScreen} exact />
            <Route path="/login" component={LoginScreen} exact />
            <Route path="/register" component={RegisterScreen} exact />
            <Route path="/profile" component={ProfileScreen} exact />
            <Route path="/product/:id" component={ProductScreen} exact />
            <Route path="/cart/:id?" component={CartScreen} exact />
            <Route path="/" component={HomeScreen} exact />
          </Container>
        </main>
        <Footer />
      </Router>
    </Elements>
  );
};

export default App;
