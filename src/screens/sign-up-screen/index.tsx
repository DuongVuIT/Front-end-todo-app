import Button from '@components/button';
import Input from '@components/shared/input';
import SafeAreaWrapper from '@components/shared/safe-area-wrapper';
import {AuthScreenNavigationType} from '@navigation/types';
import {useNavigation} from '@react-navigation/native';
import {registerUser} from '@service/api';
import {Box, Text} from '@utils/theme';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Pressable} from 'react-native';

const SignUp = () => {
  const navigation = useNavigation<AuthScreenNavigationType<'SignUp'>>();
  const navigationToSignIn = () => {
    navigation.navigate('SignIn');
  };
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IUser>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: IUser) => {
    try {
      const {email, name, password} = data;
      await registerUser({
        email,
        name,
        password,
      });
      navigationToSignIn();
    } catch (error) {}
  };

  return (
    <SafeAreaWrapper>
      <Box flex={1} px="5.5" mt={'13'}>
        <Text variant="textXl" fontWeight="700">
          Welcome to ZunTodo!
        </Text>
        <Text variant="textXl" fontWeight="700" mb="6">
          Your journey starts here
        </Text>

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              label="Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Name"
              error={errors.name}
            />
          )}
          name="name"
        />
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
              error={errors.name}
              secureTextEntry
            />
          )}
          name="password"
        />
        <Box mt="5.5" />
        <Pressable onPress={navigationToSignIn}>
          <Text color="primary" textAlign="right">
            Log in?
          </Text>
        </Pressable>
        <Box mb="5.5" />

        <Button label="Register" onPress={handleSubmit(onSubmit)} uppercase />
      </Box>
    </SafeAreaWrapper>
  );
};

export default SignUp;
