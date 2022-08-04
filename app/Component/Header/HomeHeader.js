import { Icon } from 'native-base'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { COLORS } from '../Constant/Color'
import { FONTS } from '../Constant/Font'

const HomeHeader = () => {
    return (
        <View style={{ ...styles.main }}>
            <Text style={styles.logo}>Home Screen</Text>
        </View>
    )
}

export default HomeHeader;

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 15,
        backgroundColor: COLORS.white,
        elevation: 2, paddingVertical: 15
    },
    logo: {
        fontFamily: FONTS.Bold,
        color: COLORS.theme,
        fontSize: 22,
    },
})
