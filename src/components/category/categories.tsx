import {ICategory} from '@types';
import {Box, Text} from '@utils/theme';
import React from 'react';

type CategoryProps = {
  category: ICategory;
};
const CategoryComponent = ({category}: CategoryProps) => {
  return (
    <Box bg="lightGray" p="4" borderRadius="rounded-5xl">
      <Box flexDirection="row">
        <Text variant="textBase" fontWeight="600" mr="3">
          {category.icon.symbol}
        </Text>
        <Text variant="textBase" fontWeight="600">
          {category.name}
        </Text>
      </Box>
    </Box>
  );
};

export default CategoryComponent;
