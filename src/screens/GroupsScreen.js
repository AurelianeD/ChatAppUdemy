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
import Lottie from 'lottie-react-native';

function GroupsScreen({navigation}) {
  const [groups, setGroups] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false);

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
        <ButtonWithBackground
          onPress={() => {
            signOutUser().then(() => {
              console.log('Sign out successfully');
            });
          }}
          image={Images.logout}
        />
      ),
    });
  });

  const signOutUser = async () => {
    try {
      await firebase.auth().signOut();
      // navigation.reset({
      //   index: 0,
      //   routes: [{name: 'SplashScreen'}],
      // });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  function getChats() {
    const db = firestore;
    const groupArray = [];

    db.collection('groups').onSnapshot(querySnapshot => {
      querySnapshot.docChanges().forEach(function (change) {
        setIsDataLoaded(true);
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

  function showListLoader() {
    return (
      <View style={{flex: 1}}>
        <Lottie
          source={require('../../assets/loader-list.json')}
          autoPlay
          loop
        />
      </View>
    );
  }

  function showGroupsView() {
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
  return (
    <View style={{flex: 1}}>
      {isDataLoaded ? showGroupsView() : showListLoader()}
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
