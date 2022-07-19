import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    SafeAreaView,
    Image,
    KeyboardAvoidingView,
} from 'react-native';
import Button from '../components/Button';
import Strings from '../const/Strings';
import Color from '../utils/Color';
import Images from '../const/Images';
import Constants from '../const/Constants';
import Utility from '../utils/Utility';
import DismissKeyboard from '../components/DismissKeyboard';

import EmailTextField from '../components/EmailTextField';
import PasswordTextField from '../components/PasswordTextField';

import firebase from '../firebase/Firebase';

function SignInScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState('');

    function validateEmailAddress() {
        const isValidEmail = Utility.isEmailValid(email);
        isValidEmail
            ? setEmailError('')
            : setEmailError(Strings.InvalidEmailAddress);
        return isValidEmail;
    }

    function validatePasswordField() {
        const isValidField = Utility.isValidField(password);
        isValidField
            ? setPasswordError('')
            : setPasswordError(Strings.PasswordFieldEmpty);
        return isValidField;
    }

    const performAuth = () => {
        const isValidEmail = validateEmailAddress();
        const isValidPassword = validatePasswordField();

        if (isValidEmail && isValidPassword) {
            setEmailError('');
            setPasswordError('');
            registration(email, password);
        }
    };

    const registration = (email, password) => {
        try {
            setIsLoading(true);

            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(user => {
                    setIsLoading(false);
                    Alert.alert('Logged In');
                })
                .catch(error => {
                    firebase
                        .auth()
                        .createUserWithEmailAndPassword(email, password)
                        .then(user => {
                            setIsLoading(false);
                            Alert.alert('Create a new user');
                        })
                        .catch(error => {
                            setIsLoading(false);
                            console.log('error');
                            Alert.alert(error.message);
                        });
                });
        } catch (error) {
            setIsLoading(false);
            Alert.alert(error.message);
        }
    };

    return (
        <DismissKeyboard>
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View>
                    <SafeAreaView>
                        <Image style={styles.logo} source={Images.logo}></Image>
                        <EmailTextField
                            term={email}
                            error={emailError}
                            placeHolder={Strings.EmailPlaceHolder}
                            onTermChange={newEmail => {
                                setEmail(newEmail);
                            }}
                            onValidateEmailAddress={validateEmailAddress}
                        />
                        <PasswordTextField
                            term={password}
                            error={passwordError}
                            placeholder={Strings.PasswordPlaceHolder}
                            onTermChange={newPassword => {
                                setPassword(newPassword);
                            }}
                            onValidatePasswordField={validatePasswordField}
                        />
                        <Button title={Strings.Join} isLoading={isLoading} onPress={performAuth}/>
                    </SafeAreaView>
                </View>
            </KeyboardAvoidingView>
        </DismissKeyboard>
    );
}

const styles = StyleSheet.create({
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

export default SignInScreen;
