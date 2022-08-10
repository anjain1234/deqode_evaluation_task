import React, { useState } from 'react';
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
import uuid from 'react-native-uuid';
import Toast from 'react-native-simple-toast';
import { commonStyles } from '../../utils/Styles';
import TextStrings from '../../utils/TextStrings';
import Database from '../../service/Database';

function Register() {

  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');

  const registerUser = async () => {
    if (name == '' || email == "" || pass == "") {
      Toast.show('please fill in all the fields');
      return false;
    }
    let data = {
      id: uuid.v4(),
      name: name,
      emailId: email,
      password: pass,
      img: "https://images.pexels.com/photos/2811087/pexels-photo-2811087.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    };
    Database.databaseRegister(data, () => {
      setname("")
      setemail("")
      setpass("")
      Navigation.navigate("Login")
    })
  }

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
            <KeyboardAwareScrollView style={{ marginTop: 20 }} showsVerticalScrollIndicator={false}>
              <View style={commonStyles.authCardView}>
                <View style={commonStyles.flex1}>
                  <Text style={commonStyles.authLogin}>{TextStrings.REGISTER}</Text>
                  <Text />
                  <View style={[commonStyles.inputContainer, { marginTop: 10 }]}>
                    <TextInput
                      style={commonStyles.inputs}
                      placeholder={TextStrings.ENTER_FULL_NAME}
                      underlineColorAndroid="transparent"
                      onChangeText={value => setname(value)}
                      value={name}
                      placeholderTextColor={COLORS.liteBlack}
                    />
                  </View>
                  <View style={commonStyles.inputContainer}>
                    <TextInput
                      style={commonStyles.inputs}
                      placeholder={TextStrings.ENTER_EMAIL_ID}
                      underlineColorAndroid="transparent"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onChangeText={value => setemail(value)}
                      value={email}
                      placeholderTextColor={COLORS.liteBlack}
                    />
                  </View>

                  <View style={commonStyles.inputContainer}>
                    <TextInput
                      style={commonStyles.inputs}
                      placeholder={TextStrings.ENTER_PASSWORD}
                      underlineColorAndroid="transparent"
                      onChangeText={value => setpass(value)}
                      value={pass}
                      secureTextEntry={true}
                      placeholderTextColor={COLORS.liteBlack}
                    />
                  </View>
                  <Text />

                  <TouchableOpacity style={commonStyles.authBtn} onPress={registerUser}>
                    <Text style={commonStyles.authBtnText}>{TextStrings.REGISTER_NOW}</Text>
                  </TouchableOpacity>

                  <View style={commonStyles.authContactView}>
                    <Text style={commonStyles.authSmallTxt}>{TextStrings.EXISTING_USER}</Text>
                    <TouchableOpacity
                      style={{ marginLeft: 4 }}
                      onPress={() => Navigation.navigate('Login')}>
                      <Text style={commonStyles.authRegisterStyle}>{TextStrings.LOGIN_NOW}</Text>
                    </TouchableOpacity>
                  </View>
                  <View>

                  </View>
                </View>
              </View>
            </KeyboardAwareScrollView>
          </Card>
        </View>
      </ScrollView>
    </ScrollView>
  );
}

export default Register;