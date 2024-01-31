import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CategoriesStackParamList} from './types';
import Categories from '@screens/categories-screen';
import Category from '@screens/category-screen';
import CreateNewCategory from '@screens/create-new-category';

const Stack = createNativeStackNavigator<CategoriesStackParamList>();

const CategoriesStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Category"
        component={Category}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateCategory"
        component={CreateNewCategory}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default CategoriesStackNavigator;
