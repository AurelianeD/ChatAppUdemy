import React, {useLayoutEffect, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ButtonWithBackground from '../components/ButtonWithBackground';
import Images from '../const/Images';
import GroupsItems from '../components/GroupsItems';
import firebase, {firestore} from '../firebase/Firebase';

function GroupsScreen({navigation}) {
  const [groups, setGroups] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ButtonWithBackground
          onPress={() => {
            navigation.navigate('Add Group Screen');
          }}
          image={Images.add}
        />
      ),
      headerLeft: () => (
        <ButtonWithBackground onPress={() => {}} image={Images.logout} />
      ),
    });
  });

  useEffect(() => {
    getChats();
  }, []);

  function getChats() {
    const db = firestore;
    const groupArray = [];

    db.collection('groups').onSnapshot(querySnapshot => {
      querySnapshot.docChanges().forEach(function (change) {
        if (change.type === 'added') {
          console.log('new group :', change.doc.data());
          groupArray.push(change.doc.data());
        }
        if (change.type === 'modified') {
          console.log('group modified: ', change.doc.data());
        }
        if (change.type === 'removed') {
          console.log('group removed: ', change.doc.data());
        }
        setGroups(groupArray);
      });
    });
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={groups}
        keyExtractor={(item, index) => 'key' + index}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Chat Screen', {item});
              }}>
              <GroupsItems item={item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebebeb',
  },
  text: {
    color: '#101010',
    fontSize: '24',
    fontWeight: 'bold',
  },
});

export default GroupsScreen;
