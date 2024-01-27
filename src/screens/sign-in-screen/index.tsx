import React from 'react';
import {Box, Text} from '@utils/theme';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {AuthScreenNavigationType, AuthStackParamList} from '@navigation/types';
import SafeAreaWrapper from '@components/shared/safe-area-wrapper';
import Input from '@components/shared/input';
import Button from '@components/button';

const SignIn = () => {
  const navigation = useNavigation<AuthScreenNavigationType<'SignIn'>>();
  const navigationToSignUp = () => {
    navigation.navigate('SignUp');
  };
  return (
    <SafeAreaWrapper>
      <Box flex={1} px="5.5" justifyContent="center">
        <Text variant="textXl" fontWeight="700">
          Welcome Back
        </Text>
        <Box mb="6" />
        <Input label="Email" />
        <Box mb="6" />
        <Input label="Password" />
        <Box mb="5.5" />
        <TouchableOpacity onPress={navigationToSignUp}>
          <Text color="primary" textAlign="right">
            Register?
          </Text>
        </TouchableOpacity>
        <Box mb="5.5" />
        <Button label="Login" onPress={navigationToSignUp} uppercase />
      </Box>
    </SafeAreaWrapper>
  );
};

export default SignIn;
