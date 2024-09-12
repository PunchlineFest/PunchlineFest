import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface InlineFlashErrorProps {
  message: string;
}

export const InlineFlashError: React.FC<InlineFlashErrorProps> = ({ message }) => {

  return (
    <View style={[styles.container]}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    padding: 10,
    marginVertical: 10, // Espace vertical autour du message
    borderRadius: 5,
  },
  message: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
