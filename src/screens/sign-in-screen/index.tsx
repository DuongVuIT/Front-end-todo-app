import Button from '@components/button';
import Input from '@components/shared/input';
import SafeAreaWrapper from '@components/shared/safe-area-wrapper';
import {AuthScreenNavigationType} from '@navigation/types';
import {useNavigation} from '@react-navigation/native';
import {loginUser} from '@service/api';
import useUserGlobalStore from '@store/useUserGlobalStore';
import {Box, Text} from '@utils/theme';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {TouchableOpacity} from 'react-native';

const SignIn = () => {
  const navigation = useNavigation<AuthScreenNavigationType<'SignIn'>>();
  const navigationToSignUp = () => {
    navigation.navigate('SignUp');
  };
  const {updateUser} = useUserGlobalStore();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<Omit<IUser, 'name'>>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = async (data: Omit<IUser, 'name'>) => {
    try {
      const {email, password} = data;
      const _user = await loginUser({
        email: email.toLowerCase(),
        password: password.toLowerCase(),
      });
      updateUser({
        email: _user.email,
        name: _user.name,
      });
    } catch (error) {}
  };
  return (
    <SafeAreaWrapper>
      <Box flex={1} px="5.5" justifyContent="center">
        <Text variant="textXl" fontWeight="700">
          Welcome Back
        </Text>
        <Box mb="6" />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              label="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Email"
              error={errors.email}
            />
          )}
          name="email"
        />
        <Box mb="6" />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              label="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Password"
              error={errors.password}
              secureTextEntry
            />
          )}
          name="password"
        />
        <Box mt="5.5" />
        <TouchableOpacity onPress={navigationToSignUp}>
          <Text color="primary" textAlign="right">
            Register?
          </Text>
        </TouchableOpacity>
        <Box mb="5.5" />

        <Button label="Login" onPress={handleSubmit(onSubmit)} uppercase />
      </Box>
    </SafeAreaWrapper>
  );
};

export default SignIn;
