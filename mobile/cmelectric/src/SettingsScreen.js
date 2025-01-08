import React, { useState , useContext } from 'react';
import { View, Text, Switch, Button, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import DarkModeContext from './DarkModeContext';
import { useDarkMode } from './DarkModeContext';

const SettingsScreen = () => {
  // const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  // const [volume, setVolume] = useState(50);
  // const [darkModeEnabled, setDarkModeEnabled] = useState(false); // New state variable for dark mode

  // const handleNotificationToggle = () => {
  //   setNotificationsEnabled(!notificationsEnabled);
  // };

  // const handleVolumeChange = (value) => {
  //   setVolume(value);
  // };

  // const handleDarkModeToggle = () => {
  //   setDarkModeEnabled(!darkModeEnabled);
  // };

  // const handleSaveSettings = () => {
  //   // Implement your logic to save the settings here
  //   console.log('Settings saved:', { notificationsEnabled, volume, darkModeEnabled });
  // };

  // return (
  //   <View style={[styles.container, darkModeEnabled && styles.darkModeContainer]}>
  //  const { darkModeEnabled, setDarkModeEnabled } = useContext(DarkModeContext);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [volume, setVolume] = useState(50);
  const { darkModeEnabled, setDarkModeEnabled } = useDarkMode(); // Use the hook here

  const handleNotificationToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleVolumeChange = (value) => {
    setVolume(value);
  };

  const handleDarkModeToggle = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };
  const handleSaveSettings = () => {
    // Implement your logic to save the settings here
    console.log('Settings saved:', { notificationsEnabled, volume, darkModeEnabled });
  };

  return (
    <View style={[styles.container, darkModeEnabled && styles.darkModeContainer]}>
      <Text style={[styles.heading, darkModeEnabled && styles.darkModeText]}>Settings</Text>

      {/* Notifications */}
      <View style={styles.settingItem}>
        <Text>Enable Notifications</Text>
        <Switch value={notificationsEnabled} onValueChange={handleNotificationToggle} />
      </View>

      {/* Volume */}
      <View style={styles.settingItem}>
        <Text>Volume</Text>
        <Slider
          style={{ width: 200 }}
          value={volume}
          minimumValue={0}
          maximumValue={100}
          step={1}
          onValueChange={handleVolumeChange}
        />
        <Text>{volume}</Text>
      </View>

      {/* Dark Mode Toggle */}
      <View style={styles.settingItem}>
        <Text>Dark Mode</Text>
        <Switch value={darkModeEnabled} onValueChange={handleDarkModeToggle} />
      </View>

      {/* Save button */}
      <Button title="Save Settings" onPress={handleSaveSettings}  color="#ec2727" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkModeContainer: {
    backgroundColor: '#3A3A3A', // Dark mode background color (dark gray)
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  darkModeText: {
    color: 'white', // Dark mode text color (white)
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
   
  },
});

export default SettingsScreen;
