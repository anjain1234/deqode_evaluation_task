import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../component/Constant/Color";
import { FONTS } from "../component/Constant/Font";

const { width, height } = Dimensions.get('window');

export const commonStyles = StyleSheet.create({
    loginRegisterWrapper: {
        justifyContent: "space-between",
        height: "100%",
    },
    uppercard: {
        width: width,
        height: height / 4,
        backgroundColor: COLORS.theme,
        borderBottomLeftRadius: height / 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lowerCardWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 3 * height / 4,
    },
    lowerCard: {
        backgroundColor: '#fff',
        width: '92%',
        borderRadius: 15,
        marginHorizontal: 18,
    },
    inputContainer: {
        borderRadius: 30,
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        marginBottom: 10,
        elevation: 2,
        marginTop: 10,
    },
    inputs: {
        borderBottomColor: COLORS.white,
        flex: 1,
        color: "#000",
        paddingLeft: 10,
        fontFamily: FONTS.Regular,
        paddingLeft: 20
    },
    authSmallTxt: {
        fontSize: 13,
        color: COLORS.black,
        fontFamily: FONTS.Regular,
        marginTop: 10,
        opacity: 0.5,
        textAlign: 'center',
    },
    authRegisterStyle: {
        fontSize: 13,
        fontFamily: FONTS.SemiBold,
        marginTop: 12,
        textAlign: 'center',
        color: COLORS.textInput,
        textDecorationLine: 'underline'
    },
    authContactView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    authBtnText: {
        color: '#fff',
        fontFamily: FONTS.SemiBold,
        fontSize: 14,
        marginTop: 2,
    },
    authBtn: {
        backgroundColor: COLORS.theme,
        width: '100%',
        height: 50,
        borderRadius: 30,
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    authLogin: {
        alignSelf: 'center',
        fontFamily: FONTS.Medium,
        color: COLORS.textInput,
        fontSize: 20,
        marginTop: 10,
    },
    authCardView: {
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingBottom: 20,
        paddingTop: 20,
    },
    authWelcomeText: {
        color: '#fff',
        fontFamily: FONTS.Bold,
        fontSize: 25,
    },
    flex1: {
        flex: 1
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});