import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
} from 'react-native';

import Color from '../utils/Color';

const Button = props => {
  const {
    title = 'Enter',
    style = {},
    textStyle = {},
    onPress,
    isLoading,
  } = props;

  const loader = () => {
    return <ActivityIndicator animating={isLoading} />;
  };

  const button = () => {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.button, style]}>
      {isLoading ? loader() : button()}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    height: 50,
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    // margin: 10,
    backgroundColor: Color.uaStudiosGreen,
    shadowColor: Color.uaStudiosGreen,
    shadowOpacity: 0.4,
    shadowOffset: {height: 10, width: 10},
    shadowRadius: 20,
    color: Color.white,
  },
  text: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: Color.white,
  },
});

export default Button;
