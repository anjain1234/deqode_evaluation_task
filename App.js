import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import AppStack from './app/navigation/AppStack';
import AuthStack from './app/navigation/AuthStack';
import { COLORS } from './app/component/Constant/Color';
import Navigation from './app/service/Navigation';
import { NativeBaseProvider } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import Auth from './app/service/Auth';
import { setUser } from './app/redux/reducer/user';

const Stack = createStackNavigator();

export default function App() {

  const dispatch = useDispatch();

  const { userData, login } = useSelector(state => state.User);

  const [loginChk, setLoginChk] = useState(true);

  useEffect(() => {
    getUser();
  }, [])

  const getUser = async () => {
    let data = await Auth.getAccount();
    if (data !== null) {
      dispatch(setUser(data));
      setLoginChk(false);
    } else {
      setLoginChk(false);
    }
  }

  if (loginChk) {
    return null;
  }

  return (
    <NativeBaseProvider>
      <NavigationContainer ref={r => Navigation.setTopLevelNavigator(r)}>
        <Stack.Navigator
          detachInactiveScreens={false}
          initialRouteName="Auth"
          screenOptions={{
            cardStyle: { backgroundColor: COLORS.white },
            gestureEnabled: true,
            backgroundColor: COLORS.button,
            gestureDirection: 'horizontal',
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}>
          {!login
            ? <Stack.Screen name="Auth" component={AuthStack} />
            : <Stack.Screen name="AppStack" component={AppStack} />}
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}