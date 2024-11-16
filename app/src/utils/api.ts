import axios from 'axios';
import { User } from '../types/user';

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

export const fetchUsers = async (page: number): Promise<User[]> => {
  const { data } = await api.get(`/users?_page=${page}&_limit=5`);
  return data;
};
