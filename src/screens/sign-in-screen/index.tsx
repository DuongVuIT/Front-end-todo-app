import React from 'react';
import {Box, Text} from '@utils/theme';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native';
import {AuthScreenNavigationType, AuthStackParamList} from '@navigation/types';

const SignIn = () => {
  const navigation = useNavigation<AuthScreenNavigationType<'SignIn'>>();
  const navigationToSignUp = () => {
    navigation.navigate('SignUp');
  };
  return (
    <Box>
      <Text>SignIn screen</Text>
      <Button title="Navigation to sign up" onPress={navigationToSignUp} />
    </Box>
  );
};

export default SignIn;
