import { StyleSheet, View, Pressable } from "react-native";
import React from "react";

import useColorScheme from "../hooks/useColorScheme";
import Logo from "../components/Logo";
import Colors from "../constants/Colors";

import { Text } from "../components/Themed";
import OverlappingPanels from "../components/DiscordPanels/OverlappingPanels";
import PanelView from "../components/DiscordPanels/Panel";
import MdsIcon from "../components/MaterialSymbols/Mds";
import { AddIcon } from "../components/VectorIcon";
import { OverlappingProgressContext } from "../contexts/ProgressContext";
import { RootTabScreenProps } from "../types";

const HomeScreen = ({ navigation, route }: RootTabScreenProps<"Home">) => {
  const colorScheme = useColorScheme();
  const progressPanel = React.useContext(OverlappingProgressContext);

  const changeHandler = React.useCallback(
    (value: number) => {
      progressPanel.value = value;
    },
    [progressPanel]
  );

  return (
    <View style={styles.container}>
      <OverlappingPanels
        onChanges={changeHandler}
        leftPanel={() => <StartPanel navigation={navigation} route={route} />}
        centerPanel={CenterPanel}
        rightPanel={() => (
          <PanelView
            style={{
              width: "100%",
              backgroundColor: "#2b2a33",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              paddingHorizontal: 8,
              paddingVertical: 12,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MdsIcon
                name="tag"
                size={30}
                color={Colors[colorScheme].tabIconDefault}
              />
              <Text
                style={{ fontSize: 18, fontWeight: "700", marginBottom: 4 }}
              >
                general
              </Text>
            </View>
          </PanelView>
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    width: "100%",
    height: 56,
    paddingHorizontal: 8,
    alignItems: "center",
  },
});

const StartPanel = ({ navigation }: RootTabScreenProps<"Home">) => {
  return (
    <PanelView
      style={{
        flex: 1,
        width: "100%",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
          paddingHorizontal: 8,
          paddingVertical: 12,
        }}
      >
        <Pressable
          style={{
            width: 56,
            height: 56,
            borderRadius: 8,
            marginBottom: 8,
            backgroundColor: Colors.tailwind.gray.shade700,
          }}
        >
          <Logo />
        </Pressable>
        <Pressable
          style={{
            width: 56,
            height: 56,
            borderRadius: 8,
            backgroundColor: Colors.tailwind.gray.shade700,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("Modal")}
        >
          <AddIcon color="white" width={40} height={40} />
        </Pressable>
      </View>
      <View
        style={{
          flex: 3,
          backgroundColor: "#2b2a33",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          alignItems: "center",
          paddingHorizontal: 8,
          paddingVertical: 12,
        }}
      >
        <Text>Start Panel</Text>
      </View>
    </PanelView>
  );
};

const CenterPanel = ({
  openStartPanel,
}: {
  openStartPanel: (isFling: boolean) => void;
}) => {
  const colorScheme = useColorScheme();

  return (
    <PanelView
      style={{
        alignItems: "center",
      }}
    >
      <View style={styles.header}>
        <MdsIcon
          name="menu"
          size={30}
          color={Colors[colorScheme].text}
          onPress={() => {
            openStartPanel(false);
          }}
        />
      </View>
      <Text>Center Panel</Text>
    </PanelView>
  );
};
