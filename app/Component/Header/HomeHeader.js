import Icon from 'react-native-vector-icons/AntDesign'
import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { COLORS } from '../Constant/Color'
import { FONTS } from '../Constant/Font'
import Auth from '../../service/Auth'
import { useDispatch } from 'react-redux'
import { removeUser } from '../../redux/reducer/user'
import TextStrings from '../../utils/TextStrings'

const HomeHeader = ({ userData }) => {

    const dispatch = useDispatch();

    const handleLogout = async () => {
        Auth.logout().then(() => {
            dispatch(removeUser([]));
        })
    }

    return (
        <View style={styles.main}>
            <Text style={styles.logo}>{userData.name}</Text>
            <View style={styles.logoutWrapper}>
                <TouchableWithoutFeedback
                    onPress={handleLogout}
                >
                    <Icon
                        name={TextStrings.LOGOUT}
                        type="AntDesign"
                        size={24}
                        style={styles.logoutIcon}
                    />
                </TouchableWithoutFeedback>
                <Avatar
                    source={{ uri: userData.img }}
                    rounded
                    size="small" />
            </View>
        </View>
    )
}

export default HomeHeader;

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15, height: 60,
        backgroundColor: COLORS.white,
    },
    logo: {
        fontFamily: FONTS.Bold,
        color: COLORS.theme,
        fontSize: 22,
    },
    logoutWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    logoutIcon: {
        color: COLORS.theme,
        marginRight: 30
    }
})
