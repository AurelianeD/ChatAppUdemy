import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import CustomTextField from '../components/CustomTextField';
import Button from '../components/Button';
import Strings from '../const/Strings';
import Utility from '../utils/Utility';
import firebase, {firestore} from '../firebase/Firebase';

function AddGroupScreen({navigation}) {
  const [groupName, setGroupName] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const ValidateField = () => {
    const isValidField = Utility.isValidField(groupName);
    isValidField ? setFieldError('') : setFieldError(Strings.GroupNameEmpty);
    return isValidField;
  };

  function createGroupToFirebase() {
    setIsLoading(true);
    const groupsRef = firestore.collection('groups').doc();
    const userID = firebase.auth().currentUser.uid;

    groupsRef
      .set({
        groupID: groupsRef.id,
        groupName: groupName,
        userID: userID,
      })
      .then(function (docRef) {
        setIsLoading(false);
        console.log('Document written with ID:', groupsRef.id);
        addMembersOfChatToFirebase(groupsRef.id, userID);
      })
      .catch(function (error) {
        Alert.alert(error.message);
        setIsLoading(false);
        console.error('error adding document:', error);
      });
  }

  function addMembersOfChatToFirebase(groupID, userID) {
    const membersRef = firestore
      .collection('members')
      .doc(groupID)
      .collection('member')
      .doc();
    membersRef
      .set({
        userID: userID,
      })
      .then(function (docRef) {
        navigation.goBack();
      })
      .catch(function (error) {
        setIsLoading(false);
        console.error('Error adding document:', error);
      });
  }

  const performCreateGroup = () => {
    const isValidField = ValidateField();
    if (isValidField) {
      createGroupToFirebase();
    }
  };

  return (
    <View style={styles.container}>
      <CustomTextField
        term={groupName}
        error={fieldError}
        placeholder={Strings.EnterYourGroupName}
        onTermChange={newGroupName => setGroupName(newGroupName)}
        onValidateTextField={ValidateField}
      />
      <Button
        title={Strings.CreateGroup}
        onPress={performCreateGroup}
        isLoading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddGroupScreen;
