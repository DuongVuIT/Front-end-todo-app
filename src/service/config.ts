import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export const BASE_URL = 'http://localhost:3000/';
const TIME_OUT = 30000;
export const TODO_TOKEN = 'todo_token';
const axiosIntance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});

export const saveToken = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log('error in saveToken', error);
    throw error;
  }
};

axiosIntance.interceptors.request.use(async req => {
  try {
    const access_token = await AsyncStorage.getItem(TODO_TOKEN);
    req.headers.Authorization = access_token;
    return req;
  } catch (error) {
    return req;
  }
});

export const fetcher = (url: string) =>
  axiosIntance.get(url).then(res => res.data);
export default axiosIntance;
