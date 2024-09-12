import {ImageBackground, StyleSheet, Text, View} from "react-native";
import React from "react";

const titleBackground = require('../assets/images/blue-background.png');

export const BackgroundTitle = ({
   label,
}: {
  label?: string | undefined
}) => {
  return (

    <View style={styles.titleBg}>
      <ImageBackground source={titleBackground} resizeMode={"cover"} style={{paddingTop: 13, width: 150}}>
        <Text style={[styles.text, styles.sectionTitle]}>{label}</Text>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins"
  },
  sectionTitle: {
    color: "#fff",
    margin: "auto"
  },
  titleBg:{
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 18
  },
})