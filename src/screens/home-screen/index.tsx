import Loader from '@components/shared/loader';
import SafeAreaWrapper from '@components/shared/safe-area-wrapper';
import TaskComponent from '@components/tasks/task';
import TaskAction from '@components/tasks/task-action';
import {fetcher} from '@service/config';
import useUserGlobalStore from '@store/useUserGlobalStore';
import {ITask} from '@types';
import {Box} from '@utils/theme';
import React from 'react';
import {FlatList} from 'react-native';
import useSWR from 'swr';

const Home = () => {
  const {user} = useUserGlobalStore();
  const {
    data: tasks,
    isLoading,
    mutate: mutateTasks,
  } = useSWR<ITask[]>('tasks/', fetcher);
  if (isLoading || !tasks) {
    return <Loader />;
  }
  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="4">
        <Box height={26} />
        <TaskAction categoryId="" />
        <Box height={26} />
        <FlatList
          data={tasks}
          renderItem={({item}) => (
            <TaskComponent task={item} mutateTasks={mutateTasks} />
          )}
          ItemSeparatorComponent={() => <Box height={14} />}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item._id}
        />
      </Box>
    </SafeAreaWrapper>
  );
};

export default Home;
