import Button from '@components/button';
import SafeAreaWrapper from '@components/shared/safe-area-wrapper';
import {AuthScreenNavigationType} from '@navigation/types';
import {useNavigation} from '@react-navigation/native';
import {Box, Text} from '@utils/theme';
import React from 'react';
import {Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const todoapp =
  'https://res.cloudinary.com/dooxt2sgsdooxt2sgs23233/image/upload/v1676809769/youtube/2023/february/blossom/icon_fb36u3.png';

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
      <LinearGradient
        colors={[
          '#ffffff',
          '#fcecff',
          '#f8daff',
          '#fae2ff',
          '#fef9ff',
          '#ffffff',
        ]}
        style={{flex: 1}}>
        <Box flex={1} justifyContent="center">
          <Box alignItems="center">
            <Image
              source={{uri: todoapp, height: 120, width: 120}}
              style={{alignItems: 'center'}}
            />
          </Box>
          <Text textAlign="center" variant="textXl" fontWeight="700">
            Do you want to be more productive?
          </Text>
          <Box mt="3.5" mx="10">
            <Button label="Start your journey" onPress={navigateToSignUp} />
          </Box>
        </Box>
      </LinearGradient>
    </SafeAreaWrapper>
  );
};

export default Welcome;
