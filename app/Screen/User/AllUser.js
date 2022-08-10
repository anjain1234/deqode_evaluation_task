import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';
import { COLORS } from '../../component/Constant/Color';
import { FONTS } from '../../component/Constant/Font';
import { useSelector } from 'react-redux';

import TextStrings from '../../utils/TextStrings';
import Database from '../../service/Database';

const AllUser = () => {

  const { userData } = useSelector(state => state.User);

  const [search, setsearch] = useState('');
  const [allUser, setAllUser] = useState([]);
  const [allUserBackup, setAllUserBackup] = useState([]);

  useEffect(() => {
    Database.getAllUsers(userData, setAllUser, setAllUserBackup);
  }, [])

  const searchUser = (val) => {
    setsearch(val);
    setAllUser(allUserBackup.filter((it) => it.name.match(val)))
  }



  const renderItem = ({ item }) => {
    if (userData.emailId === item.emailId) {
      return;
    }
    return (
      <ListItem
        bottomDivider
        onPress={() => Database.createChatList(item, userData)}
        containerStyle={styles.listItemWrapper}>
        <Avatar
          source={{ uri: item.img }}
          rounded
          title={item.name}
          size="medium"
        />
        <ListItem.Content>
          <ListItem.Title style={styles.nameStyle}>
            {item.name}
          </ListItem.Title>
          <ListItem.Subtitle
            style={styles.emailStyle}
            numberOfLines={1}>
            {item.emailId}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  }

  return (
    <View style={styles.containerWrapper}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <SearchBar
        placeholder={TextStrings.SEARCH_BY_NAME}
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
  containerWrapper: {
    flex: 1,
    backgroundColor: COLORS.white
  },
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
  nameStyle: {
    fontFamily: FONTS.Medium,
    fontSize: 14,
  },
  emailStyle: {
    fontFamily: FONTS.Regular,
    fontSize: 12,
  },
  listItemWrapper: {
    paddingVertical: 7,
    marginVertical: 2
  }
});
