import Navigation from '@navigation/index';
import {ThemeProvider} from '@shopify/restyle';
import theme from '@utils/theme';
import React from 'react';
import {StyleSheet} from 'react-native';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Navigation />
    </ThemeProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
