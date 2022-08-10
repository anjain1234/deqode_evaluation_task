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
import { useDispatch } from 'react-redux';
import { commonStyles } from '../../utils/Styles';
import TextStrings from '../../utils/TextStrings';
import Database from '../../service/Database';
import { setUser } from '../../redux/reducer/user';

function Login() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  useEffect(() => { }, []);

  const loginUser = async () => {
    Database.databaseLogin(email, pass, (userData) => { dispatch(setUser(userData)); });
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
