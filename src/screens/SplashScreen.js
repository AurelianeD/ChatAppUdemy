import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import Color from '../utils/Color';
import Images from '../const/Images';
import Constants from '../const/Constants';
import firebase from '../firebase/Firebase';
import Lottie from 'lottie-react-native';

function SplashScreen({navigation}) {
  useEffect(() => {
    NavigateToAuthOrGroupsScreen();
  }, [navigation]);

  function NavigateToAuthOrGroupsScreen() {
    setTimeout(function () {
      firebase.auth().onAuthStateChanged(user => {
        if (user != null) {
          navigation.reset({
            index: 0,
            routes: [{name: 'Groups Screen'}],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{name: 'SignInScreen'}],
          });
        }
      });
    }, 2000);
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={Images.logo} />
      <View style={styles.lottieView}>
        <Lottie source={require('../../assets/chatBox.json')} autoPlay loop />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lottieView: {
    width: '100%',
    height: Constants.screenHeight * 0.6,
  },
  logo: {
    alignSelf: 'center',
    margin: 0.04 * Constants.screenHeight,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.theme,
  },
});

export default SplashScreen;
