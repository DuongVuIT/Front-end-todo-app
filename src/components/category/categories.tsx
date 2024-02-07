import {CategoriesNavigationType} from '@navigation/types';
import {useNavigation} from '@react-navigation/native';
import {ICategory} from '@types';
import {Box, Text} from '@utils/theme';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
type CategoryProps = {
  category: ICategory;
};
const CategoryComponent = ({category}: CategoryProps) => {
  const navigation = useNavigation<CategoriesNavigationType>();
  const navigationCreateCategory = () => {
    navigation.navigate('CreateCategory', {
      category: category,
    });
  };
  const navigateToCategoryScreen = () => {
    navigation.navigate('Category', {
      id: category._id,
    });
  };
  return (
    <TouchableOpacity onPress={navigateToCategoryScreen}>
      <Box bg="lightGray" p="4" borderRadius="rounded-5xl">
        <Box
          flexDirection="row"
          alignContent="center"
          justifyContent="space-between">
          <Box flexDirection="row">
            <Text variant="textBase" fontWeight="600" mr="3">
              {category.icon.symbol}
            </Text>
            <Text variant="textBase" fontWeight="600">
              {category.name}
            </Text>
          </Box>
          <TouchableOpacity onPress={navigationCreateCategory}>
            <Icon name="ellipsis-v" size={16} />
          </TouchableOpacity>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default CategoryComponent;
