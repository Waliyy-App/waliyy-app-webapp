import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../services';

const AlreadyAuthorized = ({ Component }) => {
  const navigate = useNavigate();

  const token = getAuthToken();

  const redirect = navigate('/dashboard');

  if (token) {
    return redirect;
  }
  return <Component />;
};

export default AlreadyAuthorized;
