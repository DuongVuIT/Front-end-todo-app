import React from 'react';
import {Box, Text} from '@utils/theme';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native';
import {AuthScreenNavigationType, AuthStackParamList} from '@navigation/types';

const SignUp = () => {
  const navigation = useNavigation<AuthScreenNavigationType<'SignUp'>>();
  const navigationToSignIn = () => {
    navigation.navigate('SignIn');
  };
  return (
    <Box>
      <Text>SignIn screen</Text>
      <Button title="Navigation to sign in" onPress={navigationToSignIn} />
    </Box>
  );
};

export default SignUp;
