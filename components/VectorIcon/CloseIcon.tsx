import React from "react";
import { Path, Svg, SvgProps } from "react-native-svg";

const CloseIcon = (props: SvgProps) => {
  return (
    <Svg
      height={48}
      width={48}
      viewBox="0 0 48 48"
      preserveAspectRatio="xMidYMid"
      {...props}
    >
      <Path
        fill="currentColor"
        d="M24 26.1 13.5 36.6q-.45.45-1.05.45-.6 0-1.05-.45-.45-.45-.45-1.05 0-.6.45-1.05L21.9 24 11.4 13.5q-.45-.45-.45-1.05 0-.6.45-1.05.45-.45 1.05-.45.6 0 1.05.45L24 21.9l10.5-10.5q.45-.45 1.05-.45.6 0 1.05.45.45.45.45 1.05 0 .6-.45 1.05L26.1 24l10.5 10.5q.45.45.45 1.05 0 .6-.45 1.05-.45.45-1.05.45-.6 0-1.05-.45Z"
      />
    </Svg>
  );
};

export default CloseIcon;
