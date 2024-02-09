import Loader from '@components/shared/loader';
import SafeAreaWrapper from '@components/shared/safe-area-wrapper';
import TaskComponent from '@components/tasks/task';
import {fetcher} from '@service/config';
import {ITask} from '@types';
import {Box, Text} from '@utils/theme';
import {FlatList} from 'react-native';
import useSWR from 'swr';

const Today = () => {
  const {
    data: tasks,
    isLoading: isLoadingTasks,
    mutate: mutateTasks,
  } = useSWR<ITask[]>(`tasks/today`, fetcher, {
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
            Today
          </Text>
        </Box>
        <Box height={16} />

        <FlatList
          data={tasks}
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

export default Today;
