import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '@screens/sign-in-screen';
import SignUp from '@screens/sign-up-screen';
import Welcome from '@screens/welcome-screen';
import React from 'react';
import {AuthStackParamList} from './types';

const AuthStackNavigator = () => {
  const Stack = createNativeStackNavigator<AuthStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
