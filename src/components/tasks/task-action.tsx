import Loader from '@components/shared/loader';
import axiosIntance, {fetcher} from '@service/config';
import {ICategory, ITaskRequest} from '@types';
import {Box, Text} from '@utils/theme';
import {format, isToday} from 'date-fns';
import React, {useState} from 'react';
import {FlatList, TextInput, TouchableOpacity} from 'react-native';
import {Calendar} from 'react-native-calendars';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

type TaskActionProp = {
  categoryId: string;
};
export const today = new Date();
const createTaskRequest = async (url: string, {arg}: {arg: ITaskRequest}) => {
  try {
    await axiosIntance.post(url, {
      ...arg,
    });
  } catch (error) {
    console.log('error in createTask', error);
    throw error;
  }
};
const todaysISODate = new Date().toISOString();
const TaskAction = ({categoryId}: TaskActionProp) => {
  const [newTask, setNewTask] = useState<ITaskRequest>({
    categoryId: categoryId,
    date: todaysISODate,
    isCompleted: false,
    name: '',
  });

  const {data, trigger} = useSWRMutation('tasks/create', createTaskRequest);
  const [isSelectingCategory, setIsSelectingCategory] =
    useState<boolean>(false);
  const [isSelectingDate, setIsSelectingDate] = useState<boolean>(false);
  const {data: categories, isLoading} = useSWR<ICategory[]>(
    'categories',
    fetcher,
  );
  if (isLoading || !categories) {
    return <Loader />;
  }
  const selectedCategory = categories?.find(
    _category => _category._id === newTask.categoryId,
  );
  const onCreateTask = async () => {
    try {
      if (newTask.name.length.toString().trim().length > 0) {
        await trigger({
          ...newTask,
        });
        setNewTask({
          categoryId: newTask.categoryId,
          isCompleted: false,
          date: todaysISODate,
          name: '',
        });
      }
    } catch (error) {
      console.log('error in createTask', error);
      throw error;
    }
  };
  console.log('selectedCategory', JSON.stringify(selectedCategory, null, 2));
  return (
    <Box>
      <Box
        bg="lightGray"
        p="4"
        py="3.5"
        borderRadius="rounded-5xl"
        flexDirection="row"
        position="relative">
        <TextInput
          placeholder="Create a new task"
          style={{
            paddingVertical: 8,
            paddingHorizontal: 8,
            fontSize: 16,
            width: '50%',
          }}
          maxLength={36}
          textAlignVertical="center"
          value={newTask.name}
          onChangeText={text => {
            setNewTask(prev => {
              return {
                ...prev,
                name: text,
              };
            });
          }}
          onSubmitEditing={onCreateTask}
        />
        <Box flexDirection="row" alignItems="center">
          <TouchableOpacity
            onPress={() => {
              setIsSelectingDate(prev => !prev);
            }}>
            <Box
              flexDirection="row"
              alignContent="center"
              bg="white"
              p="2"
              borderRadius="rounded-xl">
              <Text>
                {isToday(new Date(newTask.date))
                  ? 'Today'
                  : format(new Date(newTask.date), 'MMM dd')}
              </Text>
            </Box>
          </TouchableOpacity>
          <Box width={12} />
          <TouchableOpacity
            onPress={() => {
              setIsSelectingCategory(prev => !prev);
            }}>
            <Box
              bg="white"
              flexDirection="row"
              alignItems="center"
              p="2"
              borderRadius="rounded-xl">
              <Box
                width={12}
                height={12}
                borderRadius="rounded"
                borderWidth={2}
                mr="1"
                style={{
                  borderColor: selectedCategory?.color.code,
                }}></Box>
              <Text style={{color: selectedCategory?.color.code}}>
                {selectedCategory?.name}
              </Text>
            </Box>
          </TouchableOpacity>
        </Box>
        {isSelectingCategory && (
          <Box position="absolute" right={40} bottom={-150}>
            <FlatList
              data={categories}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setNewTask(prev => {
                        return {
                          ...prev,
                          categoryId: item._id,
                        };
                      });
                      setIsSelectingCategory(false);
                    }}>
                    <Box
                      bg="gray250"
                      p="2"
                      borderTopStartRadius={
                        index === 0 ? 'rounded-3xl' : 'none'
                      }
                      borderTopEndRadius={index === 0 ? 'rounded-3xl' : 'none'}
                      borderBottomStartRadius={
                        categories?.length - 1 === index
                          ? 'rounded-2xl'
                          : 'none'
                      }
                      borderBottomEndRadius={
                        categories?.length - 1 === index
                          ? 'rounded-2xl'
                          : 'none'
                      }>
                      <Box flexDirection="row">
                        <Text>{item.icon.symbol}</Text>
                        <Text
                          ml="2"
                          fontWeight={
                            newTask.categoryId === item._id ? '700' : '400'
                          }>
                          {item.name}
                        </Text>
                      </Box>
                    </Box>
                  </TouchableOpacity>
                );
              }}
            />
          </Box>
        )}
      </Box>
      {isSelectingDate && (
        <Box>
          <Calendar
            minDate={format(today, 'yy-MM-dd')}
            onDayPress={day => {
              setIsSelectingDate(false);
              const selectDate = new Date(day.dateString).toISOString();
              setNewTask(prev => {
                return {
                  ...prev,
                  date: selectDate,
                };
              });
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default TaskAction;
