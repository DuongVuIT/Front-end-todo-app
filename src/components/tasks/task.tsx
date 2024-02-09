import {HomeScreenNavigationType} from '@navigation/types';
import {useNavigation} from '@react-navigation/native';
import axiosIntance from '@service/config';
import {ITask} from '@types';
import {AnimatedBox, Box, Text} from '@utils/theme';
import React from 'react';
import {Pressable} from 'react-native';
import {
  FadeInLeft,
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import useSWRMutation from 'swr/mutation';
type TaskProps = {
  task: ITask;
  mutateTasks: () => Promise<ITask[] | undefined>;
};
interface ITaskStatusRequets {
  id: string;
  isCompleted: boolean;
}
const toggleTaskStatusRequest = async (
  url: string,
  {arg}: {arg: ITaskStatusRequets},
) => {
  try {
    await axiosIntance.put(url + '/' + arg.id, {
      ...arg,
    });
  } catch (error) {
    console.log('error in toggleTaskStatusRequest', error);
    throw error;
  }
};

const TaskComponent = ({task, mutateTasks}: TaskProps) => {
  const {trigger} = useSWRMutation('tasks/update', toggleTaskStatusRequest);
  const offset = useSharedValue(1);
  const checkmarkIconSize = useSharedValue(0.8);
  const navigation = useNavigation<HomeScreenNavigationType>();
  const toggleTaskStatus = async () => {
    try {
      const _updatedTask = {
        id: task._id,
        isCompleted: !task.isCompleted,
      };
      await trigger(_updatedTask);
      await mutateTasks();
      if (!_updatedTask.isCompleted) {
        offset.value = 1;
        checkmarkIconSize.value = 0;
      } else {
        offset.value = 1.1;
        checkmarkIconSize.value = 1;
      }
    } catch (error) {
      console.log('error in toggleTaskStatus', error);
      throw error;
    }
  };
  const navigateToEditTask = () => {
    navigation.navigate('EditTask', {
      task,
    });
  };
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{scale: withSpring(offset.value)}],
    };
  });

  const checkMarkIconStyles = useAnimatedStyle(() => {
    return {
      transform: [{scale: withSpring(checkmarkIconSize.value)}],
      opacity: task.isCompleted ? offset.value : 0,
    };
  });

  return (
    <AnimatedBox entering={FadeInRight} exiting={FadeInLeft}>
      <Pressable onPress={toggleTaskStatus} onLongPress={navigateToEditTask}>
        <Box
          p="4"
          bg="lightGray"
          borderRadius="rounded-5xl"
          flexDirection="row">
          <Box flexDirection="row" alignItems="center">
            <AnimatedBox
              style={[animatedStyles]}
              flexDirection="row"
              alignItems="center">
              <Box
                height={26}
                width={26}
                bg={task.isCompleted ? 'gray9' : 'gray300'}
                borderRadius="rounded-xl"
                alignItems="center"
                justifyContent="center">
                {task.isCompleted && (
                  <AnimatedBox style={[checkMarkIconStyles]}>
                    <Icon name="check" size={20} color="white" />
                  </AnimatedBox>
                )}
              </Box>
            </AnimatedBox>
            <Text ml="3" variant="textXl">
              {task.name}
            </Text>
          </Box>
          <Box></Box>
        </Box>
      </Pressable>
    </AnimatedBox>
  );
};

export default TaskComponent;
