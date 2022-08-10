import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import MsgComponent from '../../component/Chat/MsgComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import database from '@react-native-firebase/database';
import { COLORS } from '../../component/Constant/Color';
import Toast from 'react-native-simple-toast';

export default function RenderMessageBlock({ item, data, userData }) {
    const [isEditCallback, setIsEditCallback] = React.useState(false);

    const handleDelete = () => {
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

    return (
        <TouchableOpacity
            style={{
                backgroundColor: isEditCallback ? "#999" : "transparent",
                justifyContent: 'center', opacity: isEditCallback ? 0.5 : 1
            }}
            onLongPress={() => { setIsEditCallback(true) }}
        >
            <MsgComponent
                sender={item.from === userData.id}
                item={item}
            />
            {isEditCallback ? <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', left: 0 }}>
                <AntDesign
                    style={{
                        marginHorizontal: 10,
                        color: COLORS.black,
                    }}
                    name="edit"
                    type="AntDesign"
                    size={20}
                />
                <AntDesign
                    style={{
                        marginHorizontal: 10,
                        color: COLORS.black,
                    }}
                    name="delete"
                    type="AntDesign"
                    size={20}
                    onPress={handleDelete}
                />
            </View> : <></>}
        </TouchableOpacity>
    );
}