import Loader from '@components/shared/loader';
import NavigationBack from '@components/shared/navigation-back';
import SafeAreaWrapper from '@components/shared/safe-area-wrapper';
import TaskComponent from '@components/tasks/task';
import TaskAction from '@components/tasks/task-action';
import {CategoriesStackParamList} from '@navigation/types';
import {RouteProp, useRoute} from '@react-navigation/native';
import {fetcher} from '@service/config';
import {ICategory, ITask} from '@types';
import {Box, Text} from '@utils/theme';
import React from 'react';
import {FlatList} from 'react-native';
import useSWR from 'swr';

type CategoryScreenRouteProp = RouteProp<CategoriesStackParamList, 'Category'>;

const Category = () => {
  const route = useRoute<CategoryScreenRouteProp>();
  const {id} = route.params;
  const {data: category, isLoading: isLoadingCategory} = useSWR<ICategory>(
    `categories/${id}`,
    fetcher,
  );
  const {
    data: tasks,
    isLoading: isLoadingTask,
    mutate: mutateTasks,
  } = useSWR<ITask[]>(`tasks/tasks-by-categories/${id}`, fetcher, {
    refreshInterval: 1000,
  });
  if (isLoadingTask || isLoadingCategory || !category || !tasks) {
    return <Loader />;
  }
  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="4">
        <Box width={40}>
          <NavigationBack />
        </Box>
        <Box height={16} />
        <Box flexDirection="row">
          <Text variant="textXl" fontWeight="700">
            {category.icon.symbol}
          </Text>
          <Text
            variant="textXl"
            fontWeight="700"
            ml="3"
            style={{color: category.color.code}}>
            {category.name}
          </Text>
        </Box>
        <Box height={16} />
        <TaskAction categoryId={id} />
        <Box height={16} />
        <FlatList
          data={tasks}
          renderItem={({item, index}) => {
            return <TaskComponent task={item} mutateTasks={mutateTasks} />;
          }}
          ItemSeparatorComponent={() => <Box height={14} />}
        />
      </Box>
    </SafeAreaWrapper>
  );
};

export default Category;
