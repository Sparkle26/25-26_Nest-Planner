import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import Login from "../components/Login";

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      navigation.navigate("Home");
    } else {
      alert("Invalid credentials\nPlease try again.");
    }
  };

  return (
    <View style={styles.screen}>
      <Image
        style={styles.etownLogo}
        source={require('../assets/ETOWN_Wordmark_2Color_PMS298andPMS2945.png')}
        resizeMode="contain"
      />
      <Image
        style={styles.overlayImage}
        source={require('../assets/nestlogo.png')}
        resizeMode="contain"
      />

      <View style={styles.figmaCard}>
        <View style={styles.row}>
          {/* LEFT SIDE */}
          <View style={styles.leftSide}>
            <Text style={styles.mainHeading}>The Nest</Text>
            <Text style={styles.mainHeading}>Planner</Text>
          </View>

          {/* RIGHT SIDE */}
          <View style={styles.rightSide}>
            <Text style={styles.subHeading}>Login</Text>

            {/* Username */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Username:</Text>
              <TextInput
                style={styles.inputBar}
                placeholder="Enter username"
                value={username}
                onChangeText={setUsername}
                placeholderTextColor="rgba(10,34,64,0.5)"
              />
            </View>

            {/* Password */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Password:</Text>
              <TextInput
                style={styles.inputBar}
                placeholder="Enter password"
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="rgba(10,34,64,0.5)"
                secureTextEntry={true}

                returnKeyType="done" 
                onSubmitEditing={handleLogin} 
              />
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
{/* 
      <View style={styles.navRow}>
        <Text style={styles.navText}>Home</Text>
        <Text style={styles.navText}>Cohort Calendars</Text>
        <Text style={styles.navText}>Profile</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchText}>Search</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  figmaCard: {
    width: '95%',
    maxWidth: 9000,
    height: 550,
    backgroundColor: '#E5F6FF',
    borderRadius: 22,
    padding: 20,
    marginTop: 60,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftSide: {
    flex: 1,
    justifyContent: 'center',
  },
  rightSide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
    
    marginLeft: 250,  // moves the login section to the right
    marginTop: 120,   // moves it slightly down
  },
  mainHeading: {
    color: '#004B98',
    fontSize: 150,
    fontFamily: 'Clarendon Cn BT',
    fontWeight: '700',
    lineHeight: 100,
    marginBottom: -30,
    marginTop: 90,
    marginLeft: 13,
  },
  subHeading: {
    color: '#0A2240',
    fontSize: 29,
    fontFamily: 'Gotham',
    textTransform: 'uppercase',
    fontWeight: '1000',
    marginBottom: 4,
  },
  fieldGroup: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 10,
    width: '70%',
  },
  fieldLabel: {
    color: '#0A2240',
    fontSize: 14,
    fontFamily: 'Gotham',
    marginBottom: 4,
    fontWeight: '500',
  },
  inputBar: {
    width: '100%',
    height: 40,
    backgroundColor: 'rgba(61, 181, 230, 0.20)',
    borderRadius: 6,
    paddingHorizontal: 10,
    fontFamily: 'Gotham',
    fontSize: 14,
    color: '#0A2240',
  },
  loginButton: {
    marginTop: 15,
    width: '30%',
    height: 40,
    backgroundColor: '#0A2240',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Gotham-Bold',
    textTransform: 'uppercase',
  },
  navRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    flexWrap: 'wrap',
    gap: 10,
  },
  // navText: {
  //   color: '#1E1E1E',
  //   fontSize: 12,
  //   fontFamily: 'Gotham',
  //   textTransform: 'uppercase',
  //   marginRight: 12,
  // },
  etownLogo: {
    width: 150,
    height: 200,
    position: 'absolute',
    top: -10,     // controls vertical position
    left: 60,    // controls horizontal position
  },
  overlayImage: {
    width: 70,
    height: 80,
    position: 'absolute',
    top: 40,
    right: 80,
    zIndex: 10,
  },
  searchButton: {
    width: 150,
    height: 17,
    backgroundColor: 'rgba(10, 34, 64, 0.50)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Gotham',
    textTransform: 'uppercase',
  },
});