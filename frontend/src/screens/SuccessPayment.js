import React, { useEffect, useState } from 'react';
import { orderIsPaid } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const SuccessPayment = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const orderPay = useSelector((state) => state.orderPay);
  const { orderResponse } = orderPay;
  console.log(orderResponse);

  useEffect(() => {
    dispatch(orderIsPaid(params.id));
  }, [params.id, dispatch]);

  return (
    <div
      className=" d-flex flex-column justify-content-center align-items-center"
      style={{ height: '600px' }}>
      <img src="https://c.tenor.com/_4K_0sndwtEAAAAi/green-white.gif" alt="" />
      <h2 className="pt-5">Your payment has been successfully</h2>
    </div>
  );
};

export default SuccessPayment;
