import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeAreaWrapper from '@components/shared/safe-area-wrapper';

const Today = () => {
  return (
    <SafeAreaWrapper>
      <View>
        <Text>Today</Text>
      </View>
    </SafeAreaWrapper>
  );
};

export default Today;

const styles = StyleSheet.create({});
