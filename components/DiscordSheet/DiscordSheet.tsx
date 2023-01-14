import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import React from "react";
import { Portal } from "@gorhom/portal";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const DiscordSheet = ({ children, style }: Props) => {
  return (
    <Portal hostName="BottomTabSheet">
      <View style={[StyleSheet.absoluteFill, style]}>{children}</View>
    </Portal>
  );
};

export default DiscordSheet;
