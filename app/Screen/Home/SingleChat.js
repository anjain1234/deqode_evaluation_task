import Icon from 'react-native-vector-icons/Ionicons';
import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground, TextInput, TouchableOpacity, FlatList } from 'react-native';
import moment from 'moment';
import { COLORS } from '../../component/Constant/Color';
import ChatHeader from '../../component/Header/ChatHeader';
import { useSelector } from 'react-redux';
import database from '@react-native-firebase/database';
import Toast from 'react-native-simple-toast';
import { launchImageLibrary } from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import RenderMessageBlock from './renderMessageComponent';
import RenderMessageImgComponent from './renderMessageImgComponent';
import { commonStyles } from '../../utils/Styles';
import TextStrings from '../../utils/TextStrings';
import Database from '../../service/Database';

const SingleChat = (props) => {

    const { userData } = useSelector(state => state.User)

    const { data } = props.route.params;

    const [msg, setMsg] = React.useState('');
    const [disabled, setdisabled] = React.useState(false);
    const [allChat, setallChat] = React.useState([]);

    useEffect(() => {
        const onChildAdd = Database.handleOnChildAdd(data, setallChat)

        return () => Database.returnOnChildAdd(onChildAdd)
    }, [data?.roomId])


    const msgValid = txt => txt && txt.replace(/\s/g, '').length;

    const sendMsg = (dataVal) => {
        if (dataVal === "" || msgValid(dataVal) === 0) {
            Toast.show("Enter something....");
            return false;
        }
        setdisabled(true);
        let msgData = {};
        if (msg === "") {
            msgData = {
                roomId: data?.roomId,
                message: "",
                from: userData?.id,
                to: data?.id,
                sendTime: moment().format(),
                image: dataVal,
                msgType: "image",
            }
        } else {
            msgData = {
                roomId: data?.roomId,
                message: msg,
                from: userData?.id,
                to: data?.id,
                sendTime: moment().format(),
                image: "",
                msgType: "text",
            }
        }

        Database.handleSendMsg(data, msg, msgData, userData, setMsg, setdisabled)
    }

    const picImage = () => {
        launchImageLibrary("photo", async (response) => {
            ImgToBase64.getBase64String(response.assets[0].uri)
                .then(async (base64String) => {
                    let source = "data:image/jpeg;base64," + base64String;
                    sendMsg(source)
                })
                .catch(err => { });
        });
    }

    return (
        <View style={commonStyles.flex1}>
            <ChatHeader data={data} />
            <ImageBackground
                source={require('../../assets/Background.jpg')}
                style={commonStyles.flex1}
            >
                <FlatList
                    style={commonStyles.flex1}
                    data={allChat}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index}
                    inverted
                    renderItem={({ item }) => {
                        if (item.image === "") {
                            return (
                                <RenderMessageBlock item={item} data={data} userData={userData} />
                            )
                        } else {
                            return (
                                <RenderMessageImgComponent item={item} sender={item.from === userData.id} />
                            )
                        }
                    }}
                />
            </ImageBackground>

            <View style={styles.inputWrapper}>
                <View style={{ width: 5 }} />
                <TextInput
                    style={styles.inputStyle}
                    placeholder={TextStrings.TYPE_A_MESSAGE}
                    placeholderTextColor={COLORS.black}
                    multiline={true}
                    value={msg}
                    onChangeText={(val) => setMsg(val)}
                />
                <View style={{ width: 8 }} />

                <TouchableOpacity
                    disabled={disabled}
                    onPress={picImage}
                >
                    <Icon
                        color={COLORS.white}
                        name="image"
                        type="Ionicons"
                        size={26}
                    />

                </TouchableOpacity>
                <View style={{ width: 8 }} />

                <TouchableOpacity
                    disabled={disabled}
                    onPress={() => { sendMsg(msg) }}
                >
                    <Icon
                        color={COLORS.white}
                        name="paper-plane-sharp"
                        type="Ionicons"
                        size={26}
                    />

                </TouchableOpacity>
                <View style={{ width: 5 }} />

            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    inputWrapper: {
        backgroundColor: COLORS.theme,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 7,
        justifyContent: 'space-evenly'
    },
    inputStyle: {
        backgroundColor: COLORS.white,
        width: '72%',
        borderRadius: 25,
        borderWidth: 0.5,
        borderColor: COLORS.white,
        paddingHorizontal: 15,
        color: COLORS.black,
    }
});

export default SingleChat;