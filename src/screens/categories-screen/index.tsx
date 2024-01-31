import React from 'react';
import SafeAreaWrapper from '@components/shared/safe-area-wrapper';
import useSWR from 'swr';
import {fetcher} from '@service/config';
import Loader from '@components/shared/loader';
import {Box, Text} from '@utils/theme';
import {FlatList} from 'react-native';
import {ICategory} from '@types';
import CategoryComponent from '@components/category/categories';
import CreateNewList from '@components/category/create-new-list';

const Categories = () => {
  const {data, isLoading, error} = useSWR<ICategory[]>('categories/', fetcher);

  if (isLoading) {
    return <Loader />;
  }

  const renderItem = ({item}: {item: ICategory}) => (
    <CategoryComponent category={item} />
  );

  return (
    <SafeAreaWrapper>
      <Box flex={1} px="4">
        <Text variant="textXl" fontWeight="700" mb="10">
          Categories
        </Text>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          ItemSeparatorComponent={() => <Box height={14} />}
        />
        <CreateNewList />
      </Box>
    </SafeAreaWrapper>
  );
};

export default Categories;
