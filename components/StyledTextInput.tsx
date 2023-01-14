import React from "react";
import {
  TextInput,
  View,
  StyleSheet,
  type TextInputProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

type Props = Omit<TextInputProps, "placeholder"> & {
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  isFloating?: boolean;
  leadingIcon?: (props: {
    focused: boolean;
    color: string;
    size: number;
  }) => JSX.Element;
  trailingIcon?: (props: {
    focused: boolean;
    color: string;
    size: number;
  }) => JSX.Element;
};

const StyledTextInput = ({
  placeholder,
  containerStyle,
  style,
  onFocus,
  onBlur,
  isFloating = true,
  leadingIcon,
  trailingIcon,
  ...restProps
}: Props) => {
  const colorScheme = useColorScheme();

  const animatedFocused = useSharedValue(0);

  const animateLabel = useAnimatedStyle(() => {
    const labelInterpolate = interpolate(
      animatedFocused.value,
      [0, 1],
      [16, 8]
    );
    const labelFontInterpolate = interpolate(
      animatedFocused.value,
      [0, 1],
      [16, 10]
    );

    return {
      top: labelInterpolate,
      fontSize: labelFontInterpolate,
      color:
        animatedFocused.value == 1
          ? Colors[colorScheme].text
          : Colors[colorScheme].textPlaceholder,
    };
  });

  return (
    <View
      style={[
        containerStyle,
        styles.inputContainer,
        {
          backgroundColor: Colors[colorScheme].textInput,
          paddingTop: isFloating ? 12 : undefined,
          height: isFloating ? 54 : 44,
          flexDirection: "row",
        },
      ]}
    >
      {leadingIcon && (
        <View style={styles.inputIcon}>
          {leadingIcon({
            focused: animatedFocused.value == 1 ? true : false,
            color:
              animatedFocused.value == 1
                ? Colors[colorScheme].text
                : Colors[colorScheme].textPlaceholder,
            size: 24,
          })}
        </View>
      )}
      <TextInput
        {...restProps}
        onFocus={(e) => {
          animatedFocused.value = withTiming(1, {
            duration: 200,
          });
          onFocus?.(e);
        }}
        onBlur={(e) => {
          animatedFocused.value = withTiming(0, {
            duration: 200,
          });
          onBlur?.(e);
        }}
        placeholder={!isFloating ? placeholder : ""}
        placeholderTextColor={Colors[colorScheme].textPlaceholder}
        style={[style, { flex: 1, color: Colors[colorScheme].text }]}
      />
      {isFloating && (
        <Animated.Text style={[styles.inputLabel, animateLabel]}>
          {placeholder}
        </Animated.Text>
      )}

      {trailingIcon && (
        <View style={styles.inputIcon}>
          {trailingIcon({
            focused: animatedFocused.value == 1 ? true : false,
            color:
              animatedFocused.value == 1
                ? Colors[colorScheme].text
                : Colors[colorScheme].textPlaceholder,
            size: 24,
          })}
        </View>
      )}
    </View>
  );
};

export default StyledTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    borderRadius: 4,
    paddingLeft: 8,
  },

  inputLabel: {
    position: "absolute",
    left: 8,
  },

  inputIcon: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
});
