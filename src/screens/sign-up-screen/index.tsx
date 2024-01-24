import React from 'react';
import {Box, Text} from '@utils/theme';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native';
import {AuthScreenNavigationType, AuthStackParamList} from '@navigation/types';
import SafeAreaWrapper from '@components/shared/safe-area-wrapper';

const SignUp = () => {
  const navigation = useNavigation<AuthScreenNavigationType<'SignUp'>>();
  const navigationToSignIn = () => {
    navigation.navigate('SignIn');
  };
  return (
    <SafeAreaWrapper>
      <Box>
        <Text>SignIn screen</Text>
        <Button title="Navigation to sign in" onPress={navigationToSignIn} />
      </Box>
    </SafeAreaWrapper>
  );
};

export default SignUp;
