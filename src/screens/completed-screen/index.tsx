import React from 'react';
import SafeAreaWrapper from '@components/shared/safe-area-wrapper';
import useSWR from 'swr';
import {ITask} from '@types';
import {fetcher} from '@service/config';
import Loader from '@components/shared/loader';
import {Box, Text} from '@utils/theme';
import {FlatList} from 'react-native';
import TaskComponent from '@components/tasks/task';

const Completed = () => {
  const {
    data: tasks,
    isLoading: isLoadingTasks,
    mutate: mutateTasks,
  } = useSWR<ITask[]>(`tasks/completed`, fetcher, {
    refreshInterval: 1000,
  });

  if (isLoadingTasks || !tasks) {
    return <Loader />;
  }

  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="4">
        <Box height={16} />
        <Box flexDirection="row">
          <Text variant="textXl" fontWeight="700" ml="3">
            Completed
          </Text>
        </Box>
        <Box height={16} />

        <FlatList
          data={tasks}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return <TaskComponent task={item} mutateTasks={mutateTasks} />;
          }}
          ItemSeparatorComponent={() => <Box height={14} />}
          keyExtractor={item => item._id}
        />
      </Box>
    </SafeAreaWrapper>
  );
};

export default Completed;
