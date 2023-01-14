import React from "react";
import Animated, { useSharedValue } from "react-native-reanimated";

export const OverlappingProgressContext = React.createContext<
  Animated.SharedValue<number>
>({ value: 0 });

function OverlappingProgressProvider({ children }: { children: JSX.Element }) {
  const progress = useSharedValue(0);
  return (
    <OverlappingProgressContext.Provider value={progress}>
      {children}
    </OverlappingProgressContext.Provider>
  );
}

export default OverlappingProgressProvider;
