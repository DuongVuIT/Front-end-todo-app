import Button from '@components/button';
import Input from '@components/shared/input';
import SafeAreaWrapper from '@components/shared/safe-area-wrapper';
import {AuthScreenNavigationType} from '@navigation/types';
import {useNavigation} from '@react-navigation/native';
import {Box, Text} from '@utils/theme';
import React from 'react';
import {TouchableOpacity} from 'react-native';

const SignUp = () => {
  const navigation = useNavigation<AuthScreenNavigationType<'SignUp'>>();
  const navigationToSignIn = () => {
    navigation.navigate('SignIn');
  };
  return (
    <SafeAreaWrapper>
      <Box flex={1} px="5.5" mt={'13'}>
        <Text variant="textXl" fontWeight="700">
          Welcome to TodoApp
        </Text>
        <Text variant="textXl" fontWeight="700" mb="6">
          Your journey start here
        </Text>
        <Input label="Name" />
        <Box mb="6" />
        <Input label="Email" />
        <Box mb="6" />
        <Input label="Password" />
        <Box mb="5.5" />
        <TouchableOpacity onPress={navigationToSignIn}>
          <Text color="primary" textAlign="right">
            Log in?
          </Text>
        </TouchableOpacity>
        <Box mb="5.5" />
        <Button label="Register" onPress={navigationToSignIn} uppercase />
      </Box>
    </SafeAreaWrapper>
  );
};

export default SignUp;
