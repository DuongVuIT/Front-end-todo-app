import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {AuthScreenNavigationType} from '@navigation/types';
import {Box, Text} from '@utils/theme';
import {Button} from 'react-native';
import SafeAreaWrapper from '@components/shared/safe-area-wrapper';

const Welcome = () => {
  const navigation = useNavigation<AuthScreenNavigationType<'Welcome'>>();
  const navigateToSignIn = () => {
    navigation.navigate('SignIn');
  };
  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };
  return (
    <SafeAreaWrapper>
      <Box>
        <Text>Welcome Screen</Text>
        <Button title="Navigation to sign in" onPress={navigateToSignIn} />
        <Button title="Navigation to sign up" onPress={navigateToSignUp} />
      </Box>
    </SafeAreaWrapper>
  );
};

export default Welcome;
