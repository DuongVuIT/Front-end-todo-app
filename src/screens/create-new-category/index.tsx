import Button from '@components/button';
import NavigationBack from '@components/shared/navigation-back';
import SafeAreaWrapper from '@components/shared/safe-area-wrapper';
import {CategoriesStackParamList} from '@navigation/types';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import axiosIntance, {BASE_URL} from '@service/config';
import {useTheme} from '@shopify/restyle';
import {ICategory, ICategoryRequest, IColor, IIcon} from '@types';
import {getColors, getIcons} from '@utils/helper';
import {Box, Text, Theme} from '@utils/theme';
import React, {useState} from 'react';
import {TextInput, TouchableOpacity} from 'react-native';
import {mutate} from 'swr';
import useSWRMutation from 'swr/mutation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const COLORS = getColors();
const ICONS = getIcons();
const DEFAULT_COLOR = COLORS[0];
const DEFAULT_ICON = ICONS[0];

const createCategoryRequest = async (
  url: string,
  {arg}: {arg: ICategoryRequest},
) => {
  try {
    await axiosIntance.post(url, {
      ...arg,
    });
  } catch (error) {
    console.log('error in createCategoryRequest', error);
  }
};
const updateCategoryRequest = async (
  url: string,
  {arg}: {arg: ICategoryRequest},
) => {
  try {
    await axiosIntance.put(url, {
      ...arg,
    });
  } catch (error) {
    console.log('error in updateCategoryRequest', error);
  }
};
const deleteCategoryRequest = async (
  url: string,
  {arg}: {arg: {id: string}},
) => {
  try {
    await axiosIntance.delete(url + '' + arg.id);
  } catch (error) {
    console.log('error in updateCategoryRequest', error);
  }
};
type CreateCategoryRouteTypes = RouteProp<
  CategoriesStackParamList,
  'CreateCategory'
>;
const CreateNewCategory = () => {
  const theme = useTheme<Theme>();
  const navigation = useNavigation();
  const route = useRoute<CreateCategoryRouteTypes>();
  const isEditing = route.params.category ? true : false;
  const {trigger, isMutating} = useSWRMutation(
    'categories/create',
    createCategoryRequest,
  );
  const {trigger: updateTrigger} = useSWRMutation(
    'categories/update',
    updateCategoryRequest,
  );
  const {trigger: deleteTrigger} = useSWRMutation(
    'categories/',
    deleteCategoryRequest,
  );
  const [newCategory, setNewCategory] = useState<
    Omit<ICategory, '_id' | 'user' | 'isEditable'>
  >({
    name: route.params.category?.name ?? '',
    color: route.params.category?.color ?? DEFAULT_COLOR,
    icon: route.params.category?.icon ?? DEFAULT_ICON,
  });
  const createNewCategory = async () => {
    try {
      if (isEditing) {
        const updateCategoryItem = {
          ...route.params.category,
          ...newCategory,
        };
        await updateTrigger({
          ...updateCategoryItem,
        });
      } else {
        await trigger({
          ...newCategory,
        });
      }
      await mutate(BASE_URL + 'categories');
      navigation.goBack();
    } catch (error) {
      console.log('error in createNewCategory', error);
      throw error;
    }
  };
  const updateColor = (color: IColor) => {
    setNewCategory(prev => {
      return {
        ...prev,
        color,
      };
    });
  };
  const updateIcon = (icon: IIcon) => {
    setNewCategory(prev => {
      return {
        ...prev,
        icon,
      };
    });
  };
  const deleteCategory = async () => {
    try {
      if (isEditing && route.params.category?._id)
        await deleteTrigger({
          id: route.params.category?._id,
        });
      await mutate(BASE_URL + 'categories');
      navigation.goBack();
    } catch (error) {
      console.log('error in deleteCatgory');
    }
  };
  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="4">
        <Box height={16} />
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <NavigationBack />
          {isEditing && (
            <TouchableOpacity onPress={deleteCategory}>
              <Icon name="delete" size={24} color={theme.colors.rose500} />
            </TouchableOpacity>
          )}
        </Box>
        <Box height={16} />
        <Box bg="gray250" borderRadius="rounded-2xl">
          <TextInput
            style={{
              fontSize: 20,
              lineHeight: 26,
              padding: 16,
            }}
            value={newCategory.name}
            maxLength={36}
            placeholder="Create new category"
            placeholderTextColor={theme.colors.gray5}
            onChangeText={text => {
              setNewCategory(prev => {
                return {
                  ...prev,
                  name: text,
                };
              });
            }}
          />
        </Box>
        <Box height={24} />
        <Box bg="gray250" p="4" borderRadius="rounded-2xl">
          <Box
            bg="white"
            width={80}
            p="2"
            mb="4"
            borderRadius="rounded-2xl"
            alignItems="center">
            <Text
              variant="textBase"
              fontWeight="600"
              color={newCategory.color.name as any}>
              Colors
            </Text>
          </Box>
          <Box flexDirection="row" justifyContent="space-evenly">
            {COLORS.map(_color => {
              return (
                <TouchableOpacity
                  key={_color.id}
                  onPress={() => {
                    updateColor(_color);
                  }}>
                  <Box
                    style={{backgroundColor: _color.code}}
                    width={24}
                    height={24}
                    borderRadius="rounded-2xl"></Box>
                </TouchableOpacity>
              );
            })}
          </Box>
        </Box>
        <Box height={24} />

        <Box bg="gray250" p="4" borderRadius="rounded-2xl">
          <Box
            bg="white"
            width={80}
            p="2"
            mb="4"
            borderRadius="rounded-2xl"
            alignItems="center">
            <Text variant="textBase" fontWeight="600">
              {newCategory.icon.symbol}
            </Text>
          </Box>

          <Box flexDirection="row" justifyContent="space-evenly">
            {ICONS.map(icon => {
              return (
                <TouchableOpacity
                  key={icon.id}
                  onPress={() => {
                    updateIcon(icon);
                  }}>
                  <Box width={24} height={24} borderRadius="rounded-2xl">
                    <Text>{icon.symbol}</Text>
                  </Box>
                </TouchableOpacity>
              );
            })}
          </Box>
        </Box>

        <Box position="absolute" bottom={4} left={0} right={0}>
          <Button
            label={isEditing ? 'Edit category' : 'Create new category'}
            onPress={createNewCategory}
          />
        </Box>
      </Box>
    </SafeAreaWrapper>
  );
};

export default CreateNewCategory;
