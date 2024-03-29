import React from 'react';
import {TextInput, Text, StyleSheet, View} from 'react-native';
import Color from '../utils/Color';
import Constants from '../const/Constants';
import Button from './Button';
import Strings from '../const/Strings';

const MessageFieldView = ({
  term,
  placeholder,
  onTermChange,
  onValidateTextField,
  error,
  onSubmit,
  isJoined,
}) => {
  return (
    <View style={styles.containerView}>
      <View style={styles.fieldView}>
        <TextInput
          autoCorrect={false}
          style={styles.textField}
          placeholder={placeholder}
          value={term}
          onChangeText={onTermChange}
          onEndEditing={onValidateTextField}
        />
        <Button color={Color.white} title={Strings.Send} onPress={onSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    backgroundColor: Color.white,
    width: Constants.screenWidth,
    flex: 1,
    justifyContent: 'space-between',
  },

  fieldView: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Color.uaStudiosGreen,
  },

  textField: {
    fontSize: 14,
    marginRight: 10,
    paddingLeft: 10,
    width: '75%',
    borderColor: Color.gray,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: Color.smoke,
  },

  Button: {
    // alignSelf: 'center',
    width: '25%',
    height: '100%',
  },
});

export default MessageFieldView;
