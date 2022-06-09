import React, { useState } from 'react';
import { View, ScrollView, ImageBackground, StyleSheet, TouchableHighlight, StatusBar, ActivityIndicator, Alert, Image, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import CustomInput from '../components/custom_input';
import CustomButton from '../components/custom_button';
import { COLORS } from '../services/theme';
import { windowWidth } from '../services/utils';
import { signin } from '../redux/actions/auth_action';
import { connect } from 'react-redux';

function LoginScreen({ route, navigation, signin }) {

    const [passwordError, setPasswordError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [password, setPassword] = useState("");
    const [showEye, setShowEye] = useState("");

    const handleSubmitOnPress = () => {
        if (password.length === 0) {
            setPasswordError("Invalid Password")
        } else if (password.length < 6) {
            setPasswordError("Password must be 6 characters long")
        } else {
            // setLoading(true);
            signin(route.params.email, password, () => {
                // setLoading(false);
                navigation.navigate("HomeScreen");
            });
            // auth()
            //     .createUserWithEmailAndPassword(route.params.email, password)
            //     .then(() => {
            //         setLoading(false);
            //         console.log('User account created & signed in!');
            //         navigation.navigate("HomeScreen");
            //     })
            //     .catch(error => {
            //         setLoading(false);
            //         if (error.code === 'auth/email-already-in-use') {
            //             console.log('That email address is already in use!');
            //             Alert.alert("That email address is already in use!")
            //         }

            //         if (error.code === 'auth/invalid-email') {
            //             console.log('That email address is invalid!');
            //             Alert.alert("That email address is invalid!")
            //         }

            //         console.error(error);
            //     });
        }
    }

    return (
        loading
            ? <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={50} color={COLORS.primary} />
            </View>
            : <ScrollView contentContainerStyle={styles.container}>
                <StatusBar backgroundColor="#000" barStyle='light-content' />
                <ImageBackground
                    source={require("../../assets/images/login-bg.png")}
                    style={{ width: '100%', height: '100%' }}
                >
                    <View style={{ justifyContent: 'center', height: '100%', paddingBottom: 10, backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 24 }}>
                        <View style={{ marginTop: 100 }} />
                        <View style={styles.header_block}>
                            <Text style={{ fontSize: 30, color: "#fff" }}>Log In</Text>
                            <View style={{ marginTop: 30 }} />
                        </View>

                        <View style={{ alignItems: 'center', paddingHorizontal: 10 }}>
                            <View style={{ ...styles.emailInputBoxStyle }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image
                                        source={{ uri: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" }}
                                        style={{ width: 70, height: 70, borderRadius: 100 }}
                                    />
                                    <View style={{ marginLeft: 16 }}>
                                        <Text style={{ fontSize: 14, color: '#fff' }}>Jane Doe</Text>
                                        <Text style={{ fontSize: 13, color: '#fff' }}>janedoe@gmail.com</Text>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'center', marginTop: 0, }}>
                                    <CustomInput
                                        placeholderText="Password"
                                        iconType={showEye ? "eye" : "eyeo"}
                                        headingText=""
                                        error={passwordError}
                                        secureTextEntry={showEye ? false : true}
                                        labelValue={password}
                                        onChangeText={(val) => {
                                            setPassword(val);
                                            setPasswordError("");
                                        }}
                                        onPress={() => { setShowEye(!showEye) }}
                                    />
                                </View>

                                <View style={{ marginTop: 20 }} />

                                <CustomButton
                                    fs={16} text={"Continue"} fw={"600"}
                                    textColor={COLORS.white}
                                    bgColor={COLORS.seagreen}
                                    width={"100%"} height={60}
                                    onPress={handleSubmitOnPress}
                                />

                                <View style={{ marginTop: 20 }} />

                                <View style={{ alignItems: 'flex-start', marginTop: -6 }}>
                                    <TouchableHighlight
                                        style={{ paddingHorizontal: 10, paddingVertical: 6, }}
                                        activeOpacity={0.6} underlayColor={'#f7f7f7'}
                                        onPress={() => { navigation.navigate("ForgotPasswordScreen") }}
                                    >
                                        <Text style={{ fontSize: 15, color: COLORS.seagreen }}>Forgot your Password?</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>


                            <View style={{ marginTop: 80 }} />
                        </View>
                    </View>
                </ImageBackground>

            </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        // paddingHorizontal: 24,
        // paddingTop: 30,
        // paddingBottom: 12,
        flexGrow: 1,
        justifyContent: 'space-between'
    },
    header_block: {
        alignItems: 'flex-start',
        width: '100%',
    },
    login_logo: {
        width: "80%",
        height: 80,
        marginTop: 20,
        marginBottom: 30,
    },
    emailInputBoxStyle: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: windowWidth - 22,
        padding: 26,
        borderRadius: 16,
        paddingVertical: 30
    }
});

const mapStateToProps = state => {
    return {
        userLogin: state.signupReducer.userLogin
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signin: (email, password) => { dispatch(signin(email, password)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);