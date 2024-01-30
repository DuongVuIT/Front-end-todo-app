import SafeAreaWrapper from '@components/shared/safe-area-wrapper';
import {fetcher} from '@service/config';
import {Box, Text} from '@utils/theme';
import React from 'react';
import useSWR from 'swr';

const Home = () => {
  const {data} = useSWR('categories', fetcher);
  console.log('data', JSON.stringify(data, null, 5));
  return (
    <SafeAreaWrapper>
      <Box>
        <Text>HomeScreen</Text>
      </Box>
    </SafeAreaWrapper>
  );
};

export default Home;
