import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Alert,
  Button,
} from 'react-native';
import firebase, {firestore} from '../firebase/Firebase';
import MessageFieldView from '../components/MessageFieldView';
import Strings from '../const/Strings';
import DismissKeyboard from '../components/DismissKeyboard';
import MessageItems from '../components/MessageItems';
import Lottie from 'lottie-react-native';

function ChatScreen({route, navigation}) {
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState('');
  const [isJoined, setIsJoined] = useState(false);

  const {item} = route.params;

  const userID = firebase.auth().currentUser.uid;

  useEffect(() => {
    console.log(item);
    getUserJoinedAlreadyOrNot();
    getMessages();
  }, []);

  function getUserJoinedAlreadyOrNot() {
    firestore
      .collection('members')
      .doc(item.groupID)
      .collection('member')
      .where('userID', '==', userID)
      .get()
      .then(function (querySnapshot) {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach(function (doc) {
            if (doc.data() != null) {
              setIsJoined(true);
            } else {
              setIsJoined(false);
              showAlertToJoinGroup();
            }
          });
        } else {
          showAlertToJoinGroup();
        }
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  }

  function showAlertToJoinGroup() {
    Alert.alert(
      Strings.JoinChat,
      Strings.JoinChatConfirmMessage,
      [
        {
          text: 'Yes',
          onPress: () => {
            joinGroup();
          },
        },
        {
          text: 'Non',
          onPress: () => {},
        },
      ],
      {cancelable: false},
    );
  }

  function joinGroup() {
    const groupMemberRef = firestore
      .collection('members')
      .doc(item.groupID)
      .collection('member')
      .doc();
    groupMemberRef
      .set({
        userID: userID,
      })
      .then(function (docRef) {
        setIsJoined(true);
        Alert.alert(Strings.joinMessage);
        setMessage('');
      })
      .catch(function (error) {
        setIsJoined(false);
        Alert.alert(Strings.JoinGroupError);
      });
  }

  function getMessages() {
    const db = firestore;
    let messages = [];

    db.collection('message')
      .doc(item.groupID)
      .collection('messages')
      .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === 'added') {
            console.log('New Message: ', change.doc.data());
            messages.push(change.doc.data());
          }
          if (change.type === 'modified') {
            console.log('Modified message', change.doc.data());
          }
          if (change.type === 'removed') {
            console.log('Removed message: ', change.doc.data());
          }
          setMessageList(messages);
        });
      });
  }

  function sendMessagesToChat() {
    const MessageRef = firestore
      .collection('message')
      .doc(item.groupID)
      .collection('messages')
      .doc();
    const userEmail = firebase.auth().currentUser.email;

    MessageRef.set({
      messageID: MessageRef.id,
      message: message,
      senderId: userID,
      senderEmail: userEmail,
    })
      .then(function (docRef) {
        console.log('Document written with ID: ', MessageRef.id);
        setMessage('');
      })
      .catch(function (error) {
        Alert.alert(error.message);
        console.log('Error: ', error);
      });
  }

  function showJoinView() {
    return (
      <View style={{flex: 1}}>
        <Lottie source={require('../../assets/chatBox.json')} autoPlay loop />
      </View>
    );
  }

  function showChatView() {
    return (
      <DismissKeyboard>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
          }}
          behavior="padding"
          enabled
          keyboardVerticalOffset={100}>
          <View style={styles.container}>
            <FlatList
              style={styles.flatList}
              data={messageList}
              keyExtractor={(item, index) => 'key' + index}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity onPress={() => {}}>
                    <MessageItems item={item} />
                  </TouchableOpacity>
                );
              }}
            />
            <View style={styles.messageFieldView}>
              <MessageFieldView
                term={message}
                placeholder={Strings.TypeYourMessage}
                onTermChange={message => setMessage(message)}
                onSubmit={sendMessagesToChat}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    );
  }

  return (
    <View style={{flex: 1}}>{isJoined ? showChatView() : showJoinView()}</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  flatList: {
    marginBottom: 10,
    flex: 0.9,
  },
  messageFieldView: {
    flex: 0.1,
  },
});

export default ChatScreen;
