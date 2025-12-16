import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Logo } from "../../assets";
import { getData } from "../../utils/localStorage";

export default class Splash extends Component {
  componentDidMount() {
    setTimeout(async () => {
      const userData = await getData("user");

      if (userData) {
        this.props.navigation.replace("MainApp");
      } else {
        this.props.navigation.replace("Login");
      }
    }, 3000);
  }

  render() {
    return (
      <View style={styles.pages}>
        <IconLogo />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});