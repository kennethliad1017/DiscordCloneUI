import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ViewProps } from "../Themed";

const PanelView = ({
  children,
  style,
  ...restProps
}: React.PropsWithChildren<ViewProps>) => {
  return (
    <View style={[styles.container, style]} {...restProps}>
      {children}
    </View>
  );
};

export default PanelView;

const styles = StyleSheet.create({ container: { flex: 1 } });
