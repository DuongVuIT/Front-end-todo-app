import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Button from '@components/button';

const App = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>App</Text>
      <Button />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
