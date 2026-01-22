import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { useState } from 'react';


const Login = ({onLogin}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        //console.log(username, password); here for testing purposes
        onLogin(username, password);


    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                placeholderTextColor="#000"
                style={styles.logininput}
            />

            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#000"
                style={styles.logininput}
            />

            <View style={styles.submitWrapper}>
                <View style={styles.redBubble} pointerEvents="none" />
                <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
                    <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};



export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 35,
        paddingTop: 10,
    },
    logininput: {
        height: 40,
        borderColor: 'lightgray', 
        borderWidth: 0.5, 
        marginBottom: 10, 
        paddingLeft: 10,
        color: '#000000ff',
    },
        submittext: {
        color: '#c1c3c5ff',
        fontFamily: 'Roboto',
        fontSize: 29,
        textAlign: 'left',
        fontWeight: '800',
        lineHeight: 32,
        marginTop: 0,
        alignSelf: 'flex-start',
        marginLeft: 35,
  },
    submitWrapper: {
        marginTop: 12,
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: 44,
        marginLeft: 35,
    },
    redBubble: {
        position: 'absolute',
        left: -35,
        width: 90,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#E53935',
        opacity: 0.9,
    },
    submitButton: {
        paddingHorizontal: 24,
        paddingVertical: 10,
        backgroundColor: 'transparent',
        borderRadius: 8,
    },
    submitText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
        marginLeft: -40,
    },
});