import React from "react";
import { Path, Svg, SvgProps } from "react-native-svg";

const ChevronLeft = (props: SvgProps) => {
  return (
    <Svg
      height={48}
      width={48}
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid"
      {...props}
    >
      <Path
        fill="currentColor"
        d="m26.95 34.9-9.9-9.9q-.25-.25-.35-.5-.1-.25-.1-.55 0-.3.1-.55.1-.25.35-.5L27 12.95q.45-.45 1.075-.45t1.075.45q.45.45.425 1.1-.025.65-.475 1.1l-8.8 8.8 8.85 8.85q.45.45.45 1.05 0 .6-.45 1.05-.45.45-1.1.45-.65 0-1.1-.45Z"
      />
    </Svg>
  );
};

export default ChevronLeft;
