import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import LinkText from "../../components/Link";

const ServerInfoScreen = () => {
  const [serverName, onServerName] = React.useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Server</Text>
      <Text style={styles.subtitle}>
        Your server is where you and your friends hang out. Make yours and start
        talking.
      </Text>

      <View style={styles.uploadContainer}>
        <View
          style={{
            height: 88,
            width: 88,
            borderRadius: 88,
            borderWidth: 2,
            padding: 8,
            justifyContent: "center",
            alignItems: "center",
            borderColor: "rgba(255, 255, 255, 0.4)",
            borderStyle: "dashed",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>UPLOAD</Text>
        </View>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={[styles.label, { marginBottom: 4 }]}>SERVER NAME</Text>
        <TextInput
          placeholder="Cool People"
          style={styles.inputfield}
          placeholderTextColor="rgba(255, 255, 255, 0.22)"
          value={serverName}
          onChangeText={onServerName}
        />
        <Text style={[styles.caption, { marginVertical: 4 }]}>
          By creating a server, you agree to Discord's{" "}
          <LinkText>Community Guidelines</LinkText>
        </Text>
      </View>

      <TouchableHighlight
        style={[
          styles.submitBtn,
          serverName === "" || !serverName
            ? { backgroundColor: Colors.tailwind.blue.shade600, opacity: 0.2 }
            : {
                backgroundColor: Colors.tailwind.blue.shade600,
              },
        ]}
        activeOpacity={0.6}
        disabled={serverName === "" || !serverName}
        underlayColor={Colors.tailwind.blue.shade800}
        onPress={() => alert("Successfully create a server")}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Create Server
        </Text>
      </TouchableHighlight>
    </View>
  );
};

export default ServerInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#2b2a33",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginVertical: 4,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "normal",
    color: Colors.tailwind.zinc.shade400,
    textAlign: "center",
    marginVertical: 4,
  },

  uploadContainer: {
    height: "25%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  inputfield: {
    color: "white",
    padding: 8,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 4,
  },

  fieldContainer: {
    marginVertical: 16,
  },

  label: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.tailwind.zinc.shade400,
  },

  caption: {
    fontSize: 12,
    color: Colors.tailwind.zinc.shade400,
  },

  submitBtn: {
    marginTop: 12,
    paddingVertical: 8,
    borderRadius: 4,
    fontWeight: "500",
  },
});
