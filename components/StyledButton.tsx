import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import React from "react";
import { ChevronRight } from "./VectorIcon";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

const StyledButton = ({
  children,
  onPressHandler,
}: {
  /** only accepts Text Element */ children: React.ReactNode;
  onPressHandler?: () => void;
}) => {
  const colorScheme = useColorScheme();

  return (
    <TouchableHighlight
      style={styles.listItem}
      activeOpacity={0.6}
      underlayColor="rgba(255, 255, 255, 0.07)"
      onPress={onPressHandler}
    >
      <View
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          paddingVertical: 12,
          paddingHorizontal: 8,
          borderRadius: 8,
          height: "100%",
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ flex: 1, color: "white" }}>{children}</Text>
        <ChevronRight width={24} height={24} color={Colors[colorScheme].text} />
      </View>
    </TouchableHighlight>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 8,
    height: 56,
    marginVertical: 4,
  },
});
