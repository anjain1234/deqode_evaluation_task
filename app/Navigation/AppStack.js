import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { COLORS } from '../component/Constant/Color';
import Home from '../screen/home';
import AllUser from '../screen/user/AllUser';
import SingleChat from '../screen/home/SingleChat';
const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: COLORS.button },
        gestureEnabled: true,
        backgroundColor: COLORS.button,
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false
      }}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AllUser" component={AllUser} />
      <Stack.Screen name="SingleChat" component={SingleChat} />
    </Stack.Navigator>
  );
}
