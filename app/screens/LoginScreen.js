import React, { useState } from 'react';
import { ImageBackground, View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "../../firebaseConfig.js";

function LoginScreen({ navigation }) {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate('HomeScreen');
        } catch (error) {
            alert(error.message);
        }
    }
    
    return (
        <ImageBackground style={styles.container} source={require('../assets/bg.jpg')}>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
            </View>
            <View style={[styles.inputContainer, {marginBottom: 20}]}>
                <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} value={password} onChangeText={setPassword} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: 300,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#2c786c',
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
        marginHorizontal: 10,
        width: 100,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    buttonText: {
        textAlign: "center",
    }
});

export default LoginScreen;

