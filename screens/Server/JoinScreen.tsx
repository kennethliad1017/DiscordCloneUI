import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Colors from "../../constants/Colors";

const JoinScreen = () => {
  const [joinCode, onJoinCode] = useState("");

  const joinHandler = () => {
    alert(`You have join to ${joinCode}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <View style={{ flex: 1 }}>
        <View style={styles.headerTitle}>
          <Text style={styles.title}>Join a server</Text>
          <Text style={styles.subtitle}>
            Enter an invite below to join an existing server.
          </Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { marginBottom: 4 }]}>INVITE LINK</Text>
          <TextInput
            placeholder="https://example.gg/SDajkAj"
            style={styles.inputfield}
            placeholderTextColor="rgba(255, 255, 255, 0.22)"
            value={joinCode}
            onChangeText={onJoinCode}
          />
        </View>

        <View style={{ marginTop: 12 }}>
          <Text style={styles.caption}>Examples</Text>
          <Text style={styles.caption}>
            Invites should look like{" "}
            <Text style={styles.link}>https://example.gg/SDajkAj</Text>,{" "}
            <Text style={styles.link}>SDajkAj</Text>, or{" "}
            <Text style={styles.link}>https://example.gg/cool-people</Text>
          </Text>
        </View>

        <TouchableHighlight
          style={[
            styles.joinBtn,
            joinCode === "" || !joinCode
              ? { backgroundColor: Colors.tailwind.blue.shade600, opacity: 0.2 }
              : {
                  backgroundColor: Colors.tailwind.blue.shade600,
                },
          ]}
          activeOpacity={0.6}
          disabled={joinCode === "" || !joinCode}
          underlayColor={Colors.tailwind.blue.shade800}
          onPress={joinHandler}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Join Server
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default JoinScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#2b2a33",
  },

  headerTitle: {
    height: "13%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    fontWeight: "normal",
    textAlign: "center",
    color: Colors.tailwind.zinc.shade400,
  },

  caption: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.tailwind.zinc.shade400,
  },

  label: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.tailwind.zinc.shade400,
  },

  link: {
    fontSize: 14,
    fontWeight: "normal",
    color: "white",
  },

  inputfield: {
    color: "white",
    paddingVertical: 8,
    paddingHorizontal: 4,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 4,
  },

  fieldContainer: {
    marginVertical: 16,
  },

  joinBtn: {
    marginTop: 12,
    paddingVertical: 8,
    borderRadius: 4,
    fontWeight: "500",
  },
});
