import axios from 'axios';
import { Income } from '../../types/income.type';

const BASE_URL = 'http://localhost:5000/income';

export const createNewIncome = async (data: Income) => {
  const { day, dayNumber, month, hours } = data;
  const request = {
    method: 'post',
    url: BASE_URL.concat('/'),
    data: { day, dayNumber, month, hours },
  };
  const response = await axios(request);
  return response;
};

export const getIncome = async () => {
  const request = {
    method: 'get',
    url: BASE_URL.concat('/')
  };
  const response = await axios(request);
  return response;
};


export const deleteIncome = async (_id: string) => {
  const request = {
    method: 'delete',
    url: BASE_URL.concat('/'),
    data: { _id }
  };
  const response = await axios(request);
  return response;
};
