import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Login from "../components/Login";

function LoginScreen({ navigation }) {
  const handleLogin = (username, password) => {
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
        <Text style={styles.mainHeading}>The Nest</Text>
        <Text style={styles.mainHeading}>Planner</Text>
        <Text style={styles.subHeading}>Login In</Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Username:</Text>
          <View style={styles.inputBar} />
        </View>
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Password:</Text>
          <View style={styles.inputBar} />
        </View>

        <Login onLogin={handleLogin} />
      </View>

      <View style={styles.navRow}>
        <Text style={styles.navText}>Home</Text>
        <Text style={styles.navText}>cohort Calendars</Text>
        <Text style={styles.navText}>Profile</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchText}>Search</Text>
        </TouchableOpacity>
      </View>
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
    width: 4100,
    maxWidth: '95%',
    height: 350,
    backgroundColor: '#E5F6FF',
    borderRadius: 22,
    padding: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: -40,
    marginLeft: 10,
  },
  mainHeading: {
    color: '#004B98',
    fontSize: 120,
    fontFamily: 'Clarendon Cn BT',
    fontWeight: '700',
    lineHeight: 100,
    textAlign: 'left',
    marginTop: 30,
  },
  subHeading: {
    color: '#0A2240',
    fontSize: 20,
    fontFamily: 'Gotham',
    fontWeight: '400',
    textTransform: 'uppercase',
    marginTop: 4,
    marginBottom: 12,
  },
  fieldGroup: {
    flexDirection: 'row',
    alignItems: 'right',
    marginTop: 6,
    width: '100%',
    justifyContent: 'space-between',
  },
  fieldLabel: {
    color: '#0A2240',
    fontSize: 11,
    fontFamily: 'Gotham',
    fontWeight: '450',
    width: 77,
  },
  inputBar: {
    width: 182,
    height: 12,
    backgroundColor: 'rgba(61, 181, 230, 0.20)',
    borderRadius: 2,
  },
  submitButton: {
    width: 70,
    height: 17,
    backgroundColor: '#0A2240',
    borderRadius: 10,
    alignItems: 'right',
    justifyContent: 'right',
    marginTop: 10,
  },
  submitText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Gotham',
    fontWeight: '450',
    textTransform: 'uppercase',
  },
  navRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'right',
    justifyContent: 'space-between',
    width: '100%',
    flexWrap: 'wrap',
    gap: 10,
  },
  navText: {
    color: '#1E1E1E',
    fontSize: 12,
    fontFamily: 'Gotham',
    fontWeight: '450',
    textTransform: 'uppercase',
    justifyContent: 'right',
    marginRight: 12,
  },
  etownLogo: {
    width: 200,
    height: 200,
    alignSelf: 'flex-start',
    marginLeft: -15,
    marginTop: -400,
  },
  overlayImage: {
    width: 70,
    height: 80,
    position: 'absolute',
    top: 39,
    right: 50,
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
    fontWeight: '450',
    textTransform: 'uppercase',
  },
});
