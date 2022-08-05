import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SignInScreen from '../screens/SignInScreen';
import GroupsScreen from '../screens/GroupsScreen';
import AddGroupScreen from '../screens/AddGroupScreen';
import ChatScreen from '../screens/ChatScreen';
import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator();

function ChatFlow() {
  return (
    <NavigationContainer>
      <Stack.Navigator name="chat">
        <Stack.Screen
          options={{headerShown: false}}
          name="SplashScreen"
          component={SplashScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="SignInScreen"
          component={SignInScreen}
        />
        <Stack.Screen
          options={{title: 'Groups'}}
          name="Groups Screen"
          component={GroupsScreen}
        />
        <Stack.Screen
          options={{title: 'Add Group'}}
          name="Add Group Screen"
          component={AddGroupScreen}
        />
        <Stack.Screen
          options={{title: 'Chats'}}
          name="Chat Screen"
          component={ChatScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainStackNavigator() {
  return ChatFlow();
}

export default MainStackNavigator;
