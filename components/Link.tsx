import { StyleSheet, Text, TextProps } from "react-native";
import React from "react";
import Colors from "../constants/Colors";

const LinkText = ({ children, style, ...restProps }: TextProps) => {
  return (
    <Text style={[styles.link, style]} {...restProps}>
      {children}
    </Text>
  );
};

export default LinkText;

const styles = StyleSheet.create({
  link: {
    color: Colors.tailwind.blue.shade600,
  },
});
