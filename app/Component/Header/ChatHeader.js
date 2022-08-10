import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { COLORS } from '../Constant/Color';
import { FONTS } from '../Constant/Font';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import Navigation from '../../service/Navigation';

const ChatHeader = (props) => {
    const { data } = props;

    return (
        <View style={styles.container}>

            <StatusBar barStyle="light-content" backgroundColor={COLORS.theme} translucent={false} />
            <Icon
                style={styles.chevronBackIcon}
                name="chevron-back"
                type="Ionicons"
                size={24}
                onPress={() => Navigation.back()}
            />
            <Avatar
                source={{ uri: data?.img }}
                rounded
                size="small"
            />

            <View style={styles.nameTextWrapper}>
                <Text
                    numberOfLines={1}
                    style={styles.nameText}
                >
                    {data?.name}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 70,
        backgroundColor: COLORS.theme,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    chevronBackIcon: {
        marginHorizontal: 10,
        color: COLORS.white,
    },
    nameTextWrapper: {
        flex: 1, marginLeft: 10
    },
    nameText: {
        color: COLORS.white,
        fontSize: 16,
        fontFamily: FONTS.SemiBold,
        textTransform: 'capitalize'
    }
});

export default ChatHeader;