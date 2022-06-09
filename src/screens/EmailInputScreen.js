import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, ImageBackground, StatusBar, ActivityIndicator, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import CustomInput from '../components/custom_input';
import CustomButton from '../components/custom_button';
import { COLORS } from '../services/theme';
import { windowWidth } from '../services/utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { emailFound } from '../redux/actions/auth_action';

function EmailInputScreen({ navigation, emailFound }) {

    const [emailError, setEmailError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");

    const handleSubmitOnPress = () => {
        // navigation.navigate("LoginScreen", {
        //     email: email
        // });
        if (email.length === 0) {
            setEmailError("Email is required");
        } else if (!(email.includes("@")) || !(email.includes("gmail.com"))) {
            setEmailError("Invalid Email");
        } else {
            // setLoading(true);
            emailFound(email, (response) => {
                // setLoading(false);
                console.log("\n\n 1111111111111111111111111111111:", response)
                if (response === null) {
                    navigation.navigate("RegisterScreen", {
                        email: email
                    });
                }
                if (response.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    Alert.alert("That email address is already in use!")
                    navigation.navigate("LoginScreen", {
                        email: email
                    });
                }

                if (response.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    Alert.alert("That email address is invalid!")
                }
                if (response.code === 'auth/user-not-found') {
                    console.log('That email address is invalid!');
                    Alert.alert("auth/user-not-found")
                }
            });
            //     auth()
            //         .fetchSignInMethodsForEmail(email)
            //         .then(() => {
            //             setLoading(false);
            //             console.log('User account created & signed in!');
            //             navigation.navigate("RegisterScreen", {
            //                 email: email
            //             });
            //         })
            //         .catch(error => {
            //             setLoading(false);

            //             if (error.code === 'auth/email-already-in-use') {
            //                 console.log('That email address is already in use!');
            //                 Alert.alert("That email address is already in use!")
            //                 navigation.navigate("LoginScreen", {
            //                     email: email
            //                 });
            //             }

            //             if (error.code === 'auth/invalid-email') {
            //                 console.log('That email address is invalid!');
            //                 Alert.alert("That email address is invalid!")
            //             }

            //             console.error(error);
            //         });
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
                    <View style={{ justifyContent: 'center', height: '100%', paddingBottom: 10, backgroundColor: 'rgba(0,0,0,0.5)', }}>
                        <View style={{ marginTop: 100 }} />
                        <View style={styles.header_block}>
                            <Text style={{ fontSize: 30, color: "#fff", fontWeight: "900" }}>
                                Hi!
                            </Text>
                            <View style={{ marginTop: 20 }} />
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <View style={{ ...styles.emailInputBoxStyle }}>
                                <View style={{ alignItems: 'center' }}>
                                    <CustomInput
                                        placeholderText="Email"
                                        iconType="user"
                                        headingText=""
                                        keyboardType={'email-address'}
                                        autoCapitalize='none'
                                        error={emailError}
                                        labelValue={email}
                                        onChangeText={(val) => {
                                            setEmail(val);
                                            setEmailError("");
                                        }}
                                    />
                                </View>

                                <View style={{ marginTop: 20 }} />

                                <CustomButton
                                    fs={16} text={"Continue"} fw={"600"}
                                    textColor={COLORS.white}
                                    bgColor={COLORS.seagreen}
                                    width={"100%"} height={50}
                                    onPress={handleSubmitOnPress}
                                />
                                <View style={{ marginTop: 20 }} />
                            </View>
                        </View>

                        <View style={{ marginTop: 80 }} />
                    </View>
                </ImageBackground>

            </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    header_block: {
        alignItems: 'flex-start',
        width: '100%',
        paddingHorizontal: 24,
    },
    login_logo: {
        width: "80%",
        height: 80,
        marginTop: 20,
        marginBottom: 30,
    },
    emailInputBoxStyle: {
        // backgroundColor: 'rgba(0,0,0,0.7)',
        width: windowWidth - 15,
        padding: 14, margin: 6,
        borderRadius: 16
    }
});

const mapStateToProps = state => {
    return {
        // isLoggedIn: true, user
        userEmailFound: state.loginReducer.userEmailFound
    }
}

const mapDispatchToProps = dispatch => {
    return {
        emailFound: (email, callback) => { dispatch(emailFound(email, callback)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailInputScreen);
