import Loader from '@components/shared/loader';
import SafeAreaWrapper from '@components/shared/safe-area-wrapper';
import TaskComponent from '@components/tasks/task';
import TaskAction from '@components/tasks/task-action';
import {fetcher} from '@service/config';
import useUserGlobalStore from '@store/useUserGlobalStore';
import {ITask} from '@types';
import {getGreeting} from '@utils/helper';
import {AnimatedText, Box, Text} from '@utils/theme';
import {format} from 'date-fns';
import React from 'react';
import {FlatList} from 'react-native';
import {ZoomInEasyDown} from 'react-native-reanimated';
import useSWR from 'swr';
const greeting = getGreeting({hour: new Date().getHours()});
const today = new Date();
const Home = () => {
  const {user} = useUserGlobalStore();
  const {
    data: tasks,
    isLoading,
    mutate: mutateTasks,
  } = useSWR<ITask[]>('tasks/', fetcher, {
    refreshInterval: 1000,
  });
  if (isLoading || !tasks) {
    return <Loader />;
  }
  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="4">
        <AnimatedText
          variant="textXl"
          fontWeight="500"
          entering={ZoomInEasyDown.delay(500).duration(700)}>
          Good {greeting} {user?.name}
        </AnimatedText>
        <Text variant="textXl" fontWeight="500">
          It's {format(today, 'eeee, LLL dd')} - {tasks.length} tasks
        </Text>
        <Box height={26} />
        <TaskAction categoryId="" />
        <Box height={26} />
        <FlatList
          data={tasks}
          renderItem={({item}) => (
            <TaskComponent task={item} mutateTasks={mutateTasks} />
          )}
          ItemSeparatorComponent={() => <Box height={14} />}
        />
      </Box>
    </SafeAreaWrapper>
  );
};

export default Home;
