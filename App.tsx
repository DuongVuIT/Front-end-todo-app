import Navigation from '@navigation/index';
import {ThemeProvider} from '@shopify/restyle';
import useUserGlobalStore from '@store/useUserGlobalStore';
import theme from '@utils/theme';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
