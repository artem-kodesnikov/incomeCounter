import axios from 'axios';
import { Income } from '../../types/income.type';

const url: string = process.env.REACT_APP_URL || '';

export const createNewIncome = async (data: Income) => {
  const { day, dayNumber, month, hours } = data;
  const request = {
    method: 'post',
    url: url.concat('/'),
    data: { day, dayNumber, month, hours },
  };
  const response = await axios(request);
  return response;
};

export const getIncome = async () => {
  const request = {
    method: 'get',
    url: url.concat('/')
  };
  const response = await axios(request);
  return response;
};


export const deleteIncome = async (_id: string) => {
  const request = {
    method: 'delete',
    url: url.concat('/'),
    data: { _id }
  };
  const response = await axios(request);
  return response;
};
