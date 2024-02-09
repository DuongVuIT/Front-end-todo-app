import Loader from '@components/shared/loader';
import NavigationBack from '@components/shared/navigation-back';
import SafeAreaWrapper from '@components/shared/safe-area-wrapper';
import {today} from '@components/tasks/task-action';
import {HomeStackParamList} from '@navigation/types';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import axiosIntance, {fetcher} from '@service/config';
import {useTheme} from '@shopify/restyle';
import {ICategory, ITask} from '@types';
import {Box, Text, Theme} from '@utils/theme';
import {format, isToday} from 'date-fns';
import React, {useState} from 'react';
import {FlatList, TextInput, TouchableOpacity} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useSWR, {mutate, useSWRConfig} from 'swr';
import useSWRMutation from 'swr/mutation';
type EditTaskRouteType = RouteProp<HomeStackParamList, 'EditTask'>;

const updateTaskRequest = async (url: string, {arg}: {arg: ITask}) => {
  try {
    await axiosIntance.put(url + '/' + arg._id, {
      ...arg,
    });
  } catch (error) {
    console.log('error in updateTask', error);
  }
};
const deleteTaskRequest = async (url: string, {arg}: {arg: {id: string}}) => {
  try {
    await axiosIntance.delete(url + '/' + arg.id);
  } catch (error) {
    console.log('error in deleteTask', error);
  }
};

const EditTask = () => {
  const theme = useTheme<Theme>();
  const navigation = useNavigation();
  const route = useRoute<EditTaskRouteType>();
  const {task} = route.params;
  const [updatedTask, setUpdatedTask] = useState(task);
  const {trigger} = useSWRMutation('tasks/edit', updateTaskRequest);
  const {trigger: triggerDelete} = useSWRMutation('tasks/', deleteTaskRequest);
  const [isSelectingCategory, setIsSelectingCategory] =
    useState<boolean>(false);
  const [isSelectingDate, setIsSelectingDate] = useState<boolean>(false);

  const {data: categories, isLoading} = useSWR<ICategory[]>(
    'categories',
    fetcher,
  );
  const updateTask = async () => {
    try {
      if (updatedTask.name.length.toString().trim().length > 0) {
        trigger({
          ...updatedTask,
        });
        await mutate('tasks/');
        navigation.goBack();
      }
    } catch (error) {
      console.log('error in updateTask', error);
      throw error;
    }
  };
  const deleteTask = async () => {
    try {
      await triggerDelete({
        id: task._id,
      });
      await mutate('tasks/');
      navigation.goBack();
    } catch (error) {
      console.log('error in deleteTask', error);
      throw error;
    }
  };
  if (isLoading || !categories) {
    return <Loader />;
  }

  const selectedCategory = categories?.find(
    _category => _category._id === updatedTask.categoryId,
  );
  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="4">
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <NavigationBack />
          <TouchableOpacity onPress={deleteTask}>
            <Icon name="delete" size={24} color={theme.colors.rose500} />
          </TouchableOpacity>
        </Box>

        <Box height={20} />

        <Box
          bg="lightGray"
          px="4"
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
            value={updatedTask.name}
            onChangeText={text => {
              setUpdatedTask(prev => {
                return {
                  ...prev,
                  name: text,
                };
              });
            }}
            onSubmitEditing={updateTask}
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
                  {isToday(new Date(updatedTask.date))
                    ? 'Today'
                    : format(new Date(updatedTask.date), 'MMM dd')}
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
                <Text
                  style={{
                    color: selectedCategory?.color.code,
                  }}>
                  {selectedCategory?.name}
                </Text>
              </Box>
            </TouchableOpacity>
          </Box>
        </Box>

        {isSelectingCategory && (
          <Box alignItems="flex-end" my="4" justifyContent="flex-end">
            <FlatList
              data={categories}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setUpdatedTask(prev => {
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
                            updatedTask.categoryId === item._id ? '700' : '400'
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
        {isSelectingDate && (
          <Box>
            <Calendar
              minDate={format(today, 'yy-MM-dd')}
              onDayPress={day => {
                setIsSelectingDate(false);
                const selectDate = new Date(day.dateString).toISOString();
                setUpdatedTask(prev => {
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
    </SafeAreaWrapper>
  );
};

export default EditTask;
