import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';
import { COLORS } from '../../component/Constant/Color';
import { FONTS } from '../../component/Constant/Font';
import database from '@react-native-firebase/database';
import { useSelector } from 'react-redux';
import Navigation from '../../service/Navigation';
import uuid from 'react-native-uuid';

const AllUser = () => {

  const { userData } = useSelector(state => state.User);

  const [search, setsearch] = useState('');
  const [allUser, setAllUser] = useState([]);
  const [allUserBackup, setAllUserBackup] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, [])

  const getAllUsers = () => {
    database()
      .ref("/users/")
      .once('value')
      .then(snapshot => {
        setAllUser(Object.values(snapshot.val()).filter((it) => it.id !== userData))
        setAllUserBackup(Object.values(snapshot.val()).filter((it) => it.id !== userData))
      });
  }

  const searchUser = (val) => {
    setsearch(val);
    setAllUser(allUserBackup.filter((it) => it.name.match(val)))
  }

  const createChatList = (data) => {
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

  const renderItem = ({ item }) => {
    if (userData.emailId === item.emailId) {
      return;
    }
    return (
      <ListItem
        bottomDivider
        onPress={() => createChatList(item)}
        containerStyle={{ paddingVertical: 7, marginVertical: 2 }}>
        <Avatar
          source={{ uri: item.img }}
          rounded
          title={item.name}
          size="medium"
        />
        <ListItem.Content>
          <ListItem.Title style={{ fontFamily: FONTS.Medium, fontSize: 14 }}>
            {item.name}
          </ListItem.Title>
          <ListItem.Subtitle
            style={{ fontFamily: FONTS.Regular, fontSize: 12 }}
            numberOfLines={1}>
            {item.emailId}
            {/* {"Hey there, how are you?"} */}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <SearchBar
        placeholder="Search by name..."
        placeholderTextColor="#999"
        onChangeText={searchUser}
        value={search}
        containerStyle={styles.searchContainer}
        inputStyle={styles.searchInput}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={allUser}
        renderItem={renderItem}
      />
    </View>
  );
};

export default AllUser;

const styles = StyleSheet.create({
  searchContainer: {
    elevation: 2,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
  },
  searchInput: {
    fontSize: 15,
    fontFamily: FONTS.Regular,
    color: COLORS.black,
    opacity: 0.7,

  },
});
