import axiosIntance, {saveToken, TODO_TOKEN} from './config';

type RegisterUser = IUser;
export const registerUser = async ({email, name, password}: RegisterUser) => {
  try {
    const response = await axiosIntance.post('/user/create', {
      email,
      name,
      password,
    });
    return response.data.user;
  } catch (error) {
    console.log('error in registerUser', error);
    throw error;
  }
};

type LoginUserTypes = Omit<IUser, 'name'>;
export const loginUser = async ({email, password}: LoginUserTypes) => {
  try {
    const response = await axiosIntance.post('/user/login', {
      email,
      password,
    });
    const _token = response.data.token;
    axiosIntance.defaults.headers.common['Authorization'] = _token;
    saveToken(TODO_TOKEN, _token);
    return response.data.user;
  } catch (error) {
    console.log('error in loginUser', error);
    throw error;
  }
};
