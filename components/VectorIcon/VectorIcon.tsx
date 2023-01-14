import { ImageRequireSource, StyleSheet } from "react-native";
import React from "react";
import VectorImage, { type VectorImageProps } from "react-native-vector-image";

type VectorIconProps = Omit<VectorImageProps, "source"> & {
  /** The image source, must be a local .svg asset. */
  src: ImageRequireSource;
};

const VectorIcon = ({ src, ...restProps }: VectorIconProps) => {
  return (
    <VectorImage
      source={src}
      {...restProps}
      style={[styles.icon, restProps.style]}
    />
  );
};

export default VectorIcon;

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
