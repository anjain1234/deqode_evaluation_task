import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Card } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS } from '../../component/Constant/Color';
import Navigation from '../../service/Navigation';
import Toast from 'react-native-simple-toast';
import database from '@react-native-firebase/database';
import { useDispatch } from 'react-redux';
import Auth from '../../service/Auth';
import { commonStyles } from '../../utils/Styles';
import TextStrings from '../../utils/TextStrings';

function Login() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  useEffect(() => { }, []);

  const loginUser = async () => {
    database()
      .ref('/users/')
      .orderByChild('emailId')
      .equalTo(email)
      .once('value')
      .then(async snapshot => {
        if (snapshot.val() == null) {
          Toast.show('Invalid Email Id');
          return false;
        }
        let userData = Object.values(snapshot.val())[0];
        if (userData?.password !== pass) {
          Toast.show('Invalid Password');
          return false;
        }
        dispatch(setUser(userData));
        await Auth.setAccount(userData);
        Toast.show('Login Successfully!');
      });
  };

  return (
    <ScrollView>
      <StatusBar
        backgroundColor={COLORS.theme}
        barStyle="light-content"
        hidden={false}
      />
      <ScrollView contentContainerStyle={commonStyles.loginRegisterWrapper}>
        <View style={commonStyles.uppercard}>
          <Text style={commonStyles.authWelcomeText}>
            {TextStrings.WELCOME}
          </Text>
        </View>
        <View style={commonStyles.lowerCardWrapper}>
          <Card style={commonStyles.lowerCard}>
            <View style={commonStyles.authCardView}>
              <View>
                <Text style={commonStyles.authLogin}>{TextStrings.LOGIN}</Text>
                <Text />
                <Text />
                <KeyboardAwareScrollView
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}>
                  <View style={commonStyles.inputContainer}>
                    <TextInput
                      style={commonStyles.inputs}
                      placeholder={TextStrings.ENTER_EMAIL_ID}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      onChangeText={value => {
                        setEmail(value);
                      }}
                      value={email}
                      placeholderTextColor={COLORS.liteBlack}
                    />
                  </View>

                  <View style={commonStyles.inputContainer}>
                    <TextInput
                      style={commonStyles.inputs}
                      placeholder={TextStrings.ENTER_PASSWORD}
                      secureTextEntry={true}
                      underlineColorAndroid="transparent"
                      onChangeText={value => {
                        setPass(value);
                      }}
                      value={pass}
                      placeholderTextColor={COLORS.liteBlack}
                    />
                  </View>
                </KeyboardAwareScrollView>
                <Text />

                <TouchableOpacity style={commonStyles.authBtn} onPress={loginUser}>
                  <Text style={commonStyles.authBtnText}>{TextStrings.LOGIN_NOW}</Text>
                </TouchableOpacity>

                <View style={commonStyles.authContactView}>
                  <Text style={commonStyles.authSmallTxt}>{TextStrings.NEW_USER}</Text>
                  <TouchableOpacity
                    style={{ marginLeft: 4 }}
                    onPress={() => Navigation.navigate('Register')}>
                    <Text style={commonStyles.authRegisterStyle}>{TextStrings.REGISTER_NOW}</Text>
                  </TouchableOpacity>
                </View>
                <View></View>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </ScrollView>
  );
}

export default Login;
