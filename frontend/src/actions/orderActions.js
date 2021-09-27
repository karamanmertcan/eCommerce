import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAILURE,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILURE,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_SUCCESS_RESPONSE,
  ORDER_PAY_FAILURE
} from '../constants/orderConstants';
import axios from 'axios';

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(`/api/orders`, order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;

    dispatch({
      type: ORDER_CREATE_FAILURE,
      payload: message
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;

    dispatch({
      type: ORDER_DETAILS_FAILURE,
      payload: message
    });
  }
};

export const payOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const data = await axios.post(`/create-checkout-session`, order, config);
    const webhookData = await axios.post(`/webhook`, config);

    console.log(webhookData);

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data.data.url
    });

    // dispatch({ type: ORDER_PAY_SUCCESS_RESPONSE, payload: webhookData });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;

    dispatch({
      type: ORDER_PAY_FAILURE,
      payload: message
    });
  }
};
