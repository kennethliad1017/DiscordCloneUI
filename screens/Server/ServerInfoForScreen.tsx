import { StyleSheet, TouchableHighlight, View } from "react-native";
import React, { Children } from "react";

import { Text } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { RootStackScreenProps } from "../../types";
import StyledButton from "../../components/StyledButton";

const ServerInfoForScreen = ({
  navigation,
}: RootStackScreenProps<"AboutServerInfo">) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { textAlign: "center" }]}>
        Tell us more about your server
      </Text>
      <Text style={styles.subtitle}>
        In order to help you with your setup, is your new server for just a few
        friends or a larger community?
      </Text>

      <View>
        <StyledButton
          onPressHandler={() => navigation.push("CreateServerInfo")}
        >
          <Text>For a club or community</Text>
        </StyledButton>
        <StyledButton
          onPressHandler={() => navigation.push("CreateServerInfo")}
        >
          <Text>For me and my friends</Text>
        </StyledButton>
      </View>

      <Text style={styles.subtitle}>
        Not sure? You can{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.push("CreateServerInfo")}
        >
          skip this question
        </Text>{" "}
        for now.
      </Text>
    </View>
  );
};

export default ServerInfoForScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#2b2a33",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 4,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "normal",
    color: Colors.tailwind.zinc.shade400,
    textAlign: "center",
    marginVertical: 4,
  },
  caption: {
    fontSize: 10,
    fontWeight: "bold",
    color: Colors.tailwind.zinc.shade400,
    marginVertical: 4,
  },
  link: {
    color: Colors.tailwind.blue.shade500,
  },
  template: {
    marginTop: 12,
    alignItems: "flex-start",
  },
});
