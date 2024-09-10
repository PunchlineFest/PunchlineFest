// PunchlineFest/App.js

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Punchline Fest!</Text>
      <Text style={styles.subtitle}>The biggest rap festival of the year</Text>
      <Button 
        title="See Events"
        onPress={() => navigation.navigate('Events')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#aaa',
    marginVertical: 10,
  },
});

export default HomeScreen;
