import React from 'react';
import {TextInput, Text, StyleSheet, View} from 'react-native';
import Color from '../utils/Color';
import Constants from '../const/Constants';

const CustomTextField = ({
                             term,
                             placeholder,
                             onTermChange,
                             onValidateTextField,
                             error,
                         }) => {
    return (
        <View>
            <Text style={styles.ErrorText}>{error}</Text>
            <View style={styles.TextFieldView}>
                <TextInput
                    autoCorrect={false}
                    style={styles.TextField}
                    placeholder={placeholder}
                    value={term}
                    onChangeText={onTermChange}
                    onEndEditing={onValidateTextField}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    TextField: {
        fontSize: 14,
        flex: 1,
        marginHorizontal: 20,
    },
    TextFieldView: {
        height: Constants.screenHeight * 0.06,
        width: Constants.screenWidth * 0.85,
        marginTop: 5,
        marginBottom: 10,
        borderColor: Color.black,
        justifyContent: 'center',
        backgroundColor: Color.smoke,
    },
    ErrorText: {
        fontSize: 12,
        color: 'red',
        marginBottom: -5,
        marginHorizontal: 20,
    },
});

export default CustomTextField;
