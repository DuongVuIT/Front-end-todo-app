import Loader from '@components/shared/loader';
import SafeAreaWrapper from '@components/shared/safe-area-wrapper';
import {fetcher} from '@service/config';
import {Box, Text} from '@utils/theme';
import React from 'react';
import {StyleSheet} from 'react-native';
import useSWR from 'swr';

const Category = () => {
  const {data, isLoading, error} = useSWR('categories', fetcher);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <SafeAreaWrapper>
      <Box>
        <Text variant="textXl" fontWeight="700">
          Categories
        </Text>
      </Box>
    </SafeAreaWrapper>
  );
};

export default Category;

const styles = StyleSheet.create({});
