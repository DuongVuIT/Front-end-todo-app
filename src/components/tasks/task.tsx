import axiosIntance from '@service/config';
import {ITask} from '@types';
import {Box, Text} from '@utils/theme';
import React from 'react';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import useSWRMutation from 'swr/mutation';
type TaskProps = {
  task: ITask;
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

const TaskComponent = ({task}: TaskProps) => {
  const {trigger} = useSWRMutation('tasks/update', toggleTaskStatusRequest);
  const toggleTaskStatus = async () => {
    try {
      const _updateTask = {
        id: task._id,
        isCompleted: !task.isCompleted,
      };
      await trigger(_updateTask);
    } catch (error) {
      console.log('error in toggleStatus', error);
    }
  };
  return (
    <Pressable onPress={toggleTaskStatus}>
      <Box p="4" bg="lightGray" borderRadius="rounded-5xl" flexDirection="row">
        <Box flexDirection="row" alignItems="center">
          <Box
            height={26}
            width={26}
            bg={task.isCompleted ? 'gray9' : 'gray300'}
            borderRadius="rounded-xl"
            alignItems="center"
            justifyContent="center">
            <Icon name="check" size={20} color="white" />
          </Box>
          <Text ml="3" variant="textBase">
            {task.name}
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
};

export default TaskComponent;