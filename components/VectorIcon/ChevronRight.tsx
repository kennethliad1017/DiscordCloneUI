import React from "react";
import { Path, Svg, SvgProps } from "react-native-svg";

const ChevronRight = (props: SvgProps) => {
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
        d="M17.7 34.9q-.4-.5-.425-1.1-.025-.6.425-1.05l8.8-8.8-8.85-8.85q-.4-.4-.375-1.075.025-.675.425-1.075.5-.5 1.075-.475.575.025 1.025.475l9.95 9.95q.25.25.35.5.1.25.1.55 0 .3-.1.55-.1.25-.35.5l-9.9 9.9q-.45.45-1.05.425-.6-.025-1.1-.425Z"
      />
    </Svg>
  );
};

export default ChevronRight;
