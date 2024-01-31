import SafeAreaWrapper from '@components/shared/safe-area-wrapper';
import {Box, Text} from '@utils/theme';
import React from 'react';

const CreateNewCategory = () => {
  return (
    <SafeAreaWrapper>
      <Box>
        <Text variant="textXl">Create new category</Text>
      </Box>
    </SafeAreaWrapper>
  );
};

export default CreateNewCategory;
