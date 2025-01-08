

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useDarkMode } from './DarkModeContext';

const HomeScreen = () => {
  const { darkModeEnabled } = useDarkMode();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Welcome to CMElectric</Text>

      <View style={[styles.container, darkModeEnabled && styles.darkModeContainer]}>
      {/* <Text style={[styles.heading, darkModeEnabled && styles.darkModeText]}>Inspection Screen</Text> */}

      {/* <View style={styles.section}> */}
        <Text style={styles.sectionHeading}>About Us</Text>
        <Text style={styles.sectionText}>
          The CM Electricals is an electrical company which was founded in 2008.
          The company was founded by Mr Mashigo who was first a manager for a certain company that offered electrical services before realising that there was a demand for electricians who offered various services in his area. When it comes to electrical services, our company stands out from the competition. We are a team of dedicated professionals with years of experience in the industry, and we take great pride in our work. Our aim is to provide the highest quality electrical services to our customers, and to do so in a way that is safe, efficient, and affordable.
          At our company, we understand the importance of electrical systems in both residential and commercial settings. From lighting and heating to security and productivity, our electrical systems are an essential part of our daily lives. That's why we take our work so seriously. Our team of electricians is highly trained and experienced, and we use only the best materials and equipment to ensure that our work is of the highest quality.
          But we don't just focus on the technical aspects of our work. We also place a high value on customer service. We understand that electrical issues can be stressful and disruptive, which is why we work hard to make the process as smooth and stress-free as possible. From the initial consultation to the final inspection, we keep our customers informed every step of the way, and we always strive to exceed their expectations.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Our Services</Text>
        <Text style={styles.sectionText}>
          - COC{"\n"}
          - Borehole motors{"\n"}
          - Car lifting{"\n"}
          - Generator{"\n"}
          - Solar systems{"\n"}
          - House wiring{"\n"}
          - Electric fence{"\n"}
          - Aircorn
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Contact Us</Text>
        <Text style={styles.sectionText}>
          For all your electrical service inquiries or to schedule an appointment, please contact us at:{"\n"}
          Phone: (+27) 76 457-4995{"\n"}
          Email: info@cmelectric.com{"\n"}
          Address:744 Kamagugu, Mbombela, 1200
        </Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>&copy; {new Date().getFullYear()} CMELECTRIC. All rights reserved.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  footer: {
    marginTop: 'auto',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
  },
});

export default HomeScreen;
