import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, ImageBackground, StatusBar, ActivityIndicator, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import CustomTextComponent from '../components/custom_text_component';
import CustomInput from '../components/custom_input';
import CustomButton from '../components/custom_button';
import { COLORS } from '../services/theme';
import { windowWidth } from '../services/utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { signup } from '../redux/actions/auth_action';

function RegisterScreen({ route, navigation, signup }) {

    const [nameError, setNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [showEye, setShowEye] = useState("");

    const handleSubmitOnPress = () => {
        if (name.length === 0) {
            setNameError("Name is required");
        } if (password.length === 0) {
            setPasswordError("Invalid Password")
        } else if (password.length < 6) {
            setPasswordError("Password must be 6 characters long")
        } else {
            // setLoading(true);
            signup(route.params.email, password, (response) => {
                // setLoading(false);
                if (response === null) {
                    navigation.navigate("HomeScreen");
                } else {
                    alert(response)
                }
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
                    <View style={{ justifyContent: 'center', height: '100%', paddingBottom: 10 }}>
                        <View style={{ marginTop: 100 }} />
                        <View style={styles.header_block}>
                            <Text style={{ fontSize: 30, color: "#fff" }}>Sign Up</Text>
                            <View style={{ marginTop: 30 }} />
                        </View>

                        <View style={{ alignItems: 'center', paddingHorizontal: 10 }}>
                            <View style={{ ...styles.emailInputBoxStyle }}>
                                <Text style={{ fontSize: 13, color: "#fff", fontWeight: "600" }}>
                                    Looks like you don't have an account.
                                </Text>
                                <View style={{ marginTop: 2 }} />
                                <Text style={{ fontSize: 13, color: "#fff", fontWeight: "600" }}>
                                    Let's create a new account for
                                </Text>
                                <View style={{ marginTop: 2 }} />
                                <Text style={{ fontSize: 13, color: "#fff", fontWeight: "600" }}>
                                    {route.params.email}
                                </Text>
                                <View style={{ marginTop: 5 }} />

                                <View style={{ alignItems: 'center' }}>
                                    <CustomInput
                                        placeholderText="Name"
                                        iconType="user"
                                        headingText=""
                                        autoCapitalize='none'
                                        error={nameError}
                                        labelValue={name}
                                        onChangeText={(val) => {
                                            setName(val);
                                            setNameError("");
                                        }}
                                    />
                                </View>

                                <View style={{ alignItems: 'center', marginTop: -16, }}>
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
                                <Text style={{ fontSize: 13, color: "#fff", fontWeight: "600" }}>
                                    By selecting Agree and continue below,
                                </Text>

                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                    <Text style={{ fontSize: 13, color: "#fff", fontWeight: "600" }}>
                                        I agree to
                                    </Text>
                                    <View style={{ width: 4 }} />
                                    <TouchableOpacity>
                                        <Text style={{ fontSize: 13, color: COLORS.seagreen, fontWeight: "600" }}>
                                            Terms of Service and Privacy Policy
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ marginTop: 24 }} />

                                <CustomButton
                                    fs={16} text={"Agree and continue"} fw={"600"}
                                    textColor={COLORS.white}
                                    bgColor={COLORS.seagreen}
                                    width={"100%"} height={58}
                                    onPress={handleSubmitOnPress}
                                />
                                <View style={{ marginTop: 10 }} />
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
        justifyContent: 'space-between'
    },
    header_block: {
        alignItems: 'flex-start',
        width: '100%',
        paddingHorizontal: 24
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
        userSignup: state.loginReducer.userSignup
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signup: (email, password, callback) => { dispatch(signup(email, password, callback)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
