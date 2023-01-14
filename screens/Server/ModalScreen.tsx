import { StatusBar } from "expo-status-bar";
import {
  Platform,
  Pressable,
  StyleSheet,
  StatusBar as RNStatusBar,
  TouchableHighlight,
  Text,
  View,
} from "react-native";
import StyledButton from "../../components/StyledButton";

import { ChevronRight } from "../../components/VectorIcon";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { RootStackScreenProps } from "../../types";

export default function ModalScreen({
  navigation,
}: RootStackScreenProps<"Modal">) {
  return (
    <View style={styles.container}>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Create Your Server</Text>
        <Text style={styles.subtitle}>
          Your server is where you and your friends hang out. Make yours and
          start talking.
        </Text>

        <View style={styles.template}>
          <StyledButton
            onPressHandler={() => navigation.push("AboutServerInfo")}
          >
            <Text style={{ fontSize: 16 }}>Create My Own</Text>
          </StyledButton>

          <Text style={styles.caption}>START FROM A TEMPLATE</Text>

          <StyledButton
            onPressHandler={() => navigation.push("AboutServerInfo")}
          >
            <Text style={{ fontSize: 16 }}>Gaming</Text>
          </StyledButton>
          <StyledButton
            onPressHandler={() => navigation.push("AboutServerInfo")}
          >
            <Text style={{ fontSize: 16 }}>School Club</Text>
          </StyledButton>
          <StyledButton
            onPressHandler={() => navigation.push("AboutServerInfo")}
          >
            <Text style={{ fontSize: 16 }}>Study Group</Text>
          </StyledButton>
          <StyledButton
            onPressHandler={() => navigation.push("AboutServerInfo")}
          >
            <Text style={{ fontSize: 16 }}>Friends</Text>
          </StyledButton>
          <StyledButton
            onPressHandler={() => navigation.push("AboutServerInfo")}
          >
            <Text style={{ fontSize: 16 }}>Artist & Creators</Text>
          </StyledButton>
          <StyledButton
            onPressHandler={() => navigation.push("AboutServerInfo")}
          >
            <Text style={{ fontSize: 16 }}>Local Community</Text>
          </StyledButton>
        </View>
      </View>
      <View style={styles.navigates}>
        <Text style={styles.h2}>Have an invite already?</Text>
        <TouchableHighlight
          style={styles.joinBtn}
          activeOpacity={0.6}
          underlayColor={Colors.tailwind.blue.shade800}
          onPress={() => navigation.push("JoinServer")}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Join a Server
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingTop: 24 + RNStatusBar.currentHeight!,
    backgroundColor: "#2b2a33",
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  template: {
    marginTop: 12,
    alignItems: "flex-start",
  },
  caption: {
    fontSize: 10,
    fontWeight: "bold",
    color: Colors.tailwind.zinc.shade400,
    marginTop: 8,
    marginVertical: 4,
  },
  h2: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 4,
    color: "white",
  },

  navigates: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },

  joinBtn: {
    height: 44,
    width: "100%",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.tailwind.blue.shade600,
  },
});

/**
 * Sequence of Screen to create a server
 *
 *
 * 1. Server Template:
 * - Create My Own
 * - Gaming
 * - School Club
 * - Study Group
 * - Friends
 * - Artist & Creators
 * - Local Community
 *
 *
 * 2. Tell us more about your server
 *  In order to help you with your setup, is your new server
 *  for just a few friends or a larger community?
 *  - For a club or community
 *  - For me and my friends
 *
 * 3. Input a Server Name and/or upload photo of the server
 *
 *
 */
