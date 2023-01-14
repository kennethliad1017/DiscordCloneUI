import { PortalProvider, PortalHost } from "@gorhom/portal";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import OverlappingProgressProvider from "./contexts/ProgressContext";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PortalProvider>
          <OverlappingProgressProvider>
            <SafeAreaProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
              <PortalHost name="BottomTabSheet" />
            </SafeAreaProvider>
          </OverlappingProgressProvider>
        </PortalProvider>
      </GestureHandlerRootView>
    );
  }
}
