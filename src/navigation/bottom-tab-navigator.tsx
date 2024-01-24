import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootBottomTabParamList, RootStackParamList} from './types';
import HomeStackNavigator from './home-stack-navigator';
import Completed from '@screens/completed-screen';
import Today from '@screens/today-screen';
import CategoriesStackNavigator from './categories-stack-navigator';
import Icons from '@components/shared/icon';
import {useTheme} from '@shopify/restyle';

const Tab = createBottomTabNavigator<RootBottomTabParamList>();

const BottomTabNavigator = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: theme.colors.gray550,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={() => ({
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({color}) => <Icons name="home" color={color} />,
        })}
      />
      <Tab.Screen
        name="Completed"
        component={Completed}
        options={() => ({
          title: 'Completed',
          headerShown: false,
          tabBarIcon: ({color}) => <Icons name="completed" color={color} />,
        })}
      />
      <Tab.Screen
        name="Today"
        component={Today}
        options={() => ({
          title: 'Today',
          headerShown: false,
          tabBarIcon: ({color}) => <Icons name="calendar" color={color} />,
        })}
      />
      <Tab.Screen
        name="CategoriesStack"
        component={CategoriesStackNavigator}
        options={() => ({
          title: 'Categories',
          headerShown: false,
          tabBarIcon: ({color}) => <Icons name="categories" color={color} />,
        })}
      />
    </Tab.Navigator>
  );
};
export default BottomTabNavigator;
