import axiosIntance from './config';

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
