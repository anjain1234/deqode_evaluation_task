import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { COLORS } from '../../component/Constant/Color';
import { FONTS } from '../../component/Constant/Font';
import HomeHeader from '../../component/Header/HomeHeader';
import Navigation from '../../service/Navigation';
import { useSelector } from 'react-redux';
import database from '@react-native-firebase/database';

const Home = () => {

  const { userData } = useSelector(state => state.User);

  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    getChatList();
  }, [])

  const getChatList = () => {
    database()
      .ref('/chatlist/' + userData?.id)
      .on('value', snapshot => {
        if (snapshot?.val() != null) {
          setChatList(Object.values(snapshot?.val()))
        }
      })
  }

  const renderItem = ({ item }) => {
    return (
      <ListItem
        containerStyle={{ paddingVertical: 8, marginVertical: 0 }}
        onPress={() => Navigation.navigate('SingleChat', { data: item })}>
        <Avatar
          source={{ uri: item.img }}
          rounded
          title={item.name}
          size="medium" />
        <ListItem.Content>
          <ListItem.Title style={{ fontFamily: FONTS.Medium, fontSize: 14 }}>
            {item.name}
          </ListItem.Title>
          {item.lastMsg.length === 0
            ? <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons
                style={{ color: COLORS.black, marginRight: 4 }}
                name="image" type="Ionicons" size={22}
              />
              <ListItem.Subtitle style={{ fontFamily: FONTS.Regular, fontSize: 12 }} numberOfLines={1}>
                Photo
              </ListItem.Subtitle>
            </View>
            : <ListItem.Subtitle style={{ fontFamily: FONTS.Regular, fontSize: 12 }} numberOfLines={1}>
              {item.lastMsg}
            </ListItem.Subtitle>}
        </ListItem.Content>
      </ListItem>
    )
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <HomeHeader userData={userData} />
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={chatList}
        renderItem={renderItem}
      />
      <TouchableOpacity
        style={styles.but}
        onPress={() => Navigation.navigate('AllUser')}>
        <Icon
          name="users"
          type="FontAwesome5"
          style={{ color: COLORS.white, fontSize: 20 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  but: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.theme,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});