import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {AuthScreenNavigationType} from '@navigation/types';
import {Box, Text} from '@utils/theme';
import {Button} from 'react-native';

const Welcome = () => {
  const navigation = useNavigation<AuthScreenNavigationType<'Welcome'>>();
  const navigateToSignIn = () => {
    navigation.navigate('SignIn');
  };
  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };
  return (
    <Box>
      <Text>Welcome Screen</Text>
      <Button title="Navigation to sign in" onPress={navigateToSignIn} />
      <Button title="Navigation to sign up" onPress={navigateToSignUp} />
    </Box>
  );
};

export default Welcome;
