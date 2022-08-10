import Toast from 'react-native-simple-toast';
import database from '@react-native-firebase/database';
import Auth from '../service/Auth';
import uuid from 'react-native-uuid';
import Navigation from './Navigation';

const databaseLogin = async (email, pass, callback) => {
    return database()
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
            await Auth.setAccount(userData);
            Toast.show('Login Successfully!');
            callback(userData);
        });
}

const getChatList = (userData, setChatList) => {
    database()
        .ref('/chatlist/' + userData?.id)
        .on('value', snapshot => {
            if (snapshot?.val() != null) {
                setChatList(Object.values(snapshot?.val()))
            }
        })
}

const databaseRegister = async (data, callback) => {
    return database()
        .ref('/users/' + data.id)
        .set(data)
        .then((dataVal) => {
            Toast.show('Register Successfully!');
            callback()
        })
        .catch((error) => {
            Toast.show("Something went wrong!")
        })
}

const handleDeleteChat = (data, item, msg, userData, setIsEditCallback) => {
    setIsEditCallback(false)
    const newReference = database().ref('/messages/' + data?.roomId + "/" + item.id).remove();

    newReference
        .then(() => {
            let chatListUpdate = {
                lastMsg: msg,
                sendTime: moment().format(),
            }
            database()
                .ref('/chatlist/' + data.id + "/" + userData.id)
                .update(chatListUpdate)
                .then(() => { Toast.show("Data Updated.") });

            database()
                .ref('/chatlist/' + userData.id + "/" + data.id)
                .update(chatListUpdate)
                .then(() => { Toast.show("Data Updated.") });

        });
}

const handleOnChildAdd = (data, setallChat) => {
    return database()
        .ref('/messages/' + data?.roomId)
        .on('child_added', snapshot => {
            setallChat((state) => [snapshot.val(), ...state]);
        })
}

const returnOnChildAdd = (onChildAdd) => {
    return database().ref('/messages/').off('child_added', onChildAdd);
}

const handleSendMsg = (data, msg, msgData, userData, setMsg, setdisabled) => {
    const newReference = database().ref('/messages/' + data?.roomId).push();

    msgData.id = newReference.key;
    newReference
        .set(msgData)
        .then(() => {
            let chatListUpdate = {
                lastMsg: msg,
                sendTime: msgData.sendTime,
            }
            database()
                .ref('/chatlist/' + data.id + "/" + userData.id)
                .update(chatListUpdate)
                .then(() => { Toast.show("Data Updated.") });

            database()
                .ref('/chatlist/' + userData.id + "/" + data.id)
                .update(chatListUpdate)
                .then(() => { Toast.show("Data Updated.") });

            setMsg("");
            setdisabled(false);
        });
}

const getAllUsers = (userData, setAllUser, setAllUserBackup) => {
    database()
        .ref("/users/")
        .once('value')
        .then(snapshot => {
            setAllUser(Object.values(snapshot.val()).filter((it) => it.id !== userData))
            setAllUserBackup(Object.values(snapshot.val()).filter((it) => it.id !== userData))
        });
}

const createChatList = (data, userData) => {
    database()
        .ref('/chatlist/' + userData.id + "/" + data.id)
        .once('value')
        .then(snapshot => {
            if (snapshot.val() === null) {
                let roomId = uuid.v4();
                let mydata = {
                    roomId,
                    id: userData.id,
                    name: userData?.name,
                    img: userData?.img,
                    emailId: userData?.emailId,
                    lastMsg: "",
                }

                database()
                    .ref("/chatlist/" + data?.id + "/" + userData?.id)
                    .update(mydata)
                    .then(() => { Toast.show("Data Updated.") });

                delete data["password"]
                data.lastMsg = "";
                data.roomId = roomId;

                database()
                    .ref("/chatlist/" + userData?.id + "/" + data?.id)
                    .update(data)
                    .then(() => { Toast.show("Data Updated.") });

                Navigation.navigate("SingleChat", { data: data });
            } else {
                Navigation.navigate("SingleChat", { data: snapshot.val() });
            }
        });
}

export default {
    databaseLogin,
    getChatList,
    databaseRegister,
    handleDeleteChat,
    handleOnChildAdd,
    returnOnChildAdd,
    handleSendMsg,
    getAllUsers,
    createChatList
}