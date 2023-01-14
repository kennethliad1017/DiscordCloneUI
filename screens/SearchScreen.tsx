import { Pressable, StyleSheet } from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";

import { Text, View } from "../components/Themed";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Portal, PortalHost } from "@gorhom/portal";

import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

import { SearchIcon } from "../components/VectorIcon";
import { RootTabScreenProps } from "../types";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import { FullWindowOverlay } from "react-native-screens";
import { MonoText } from "../components/StyledText";
import StyledTextInput from "../components/StyledTextInput";

export default function SearchScreen({
  navigation,
}: RootTabScreenProps<"Search">) {
  const colorScheme = useColorScheme();
  const [showBottomSheet, setShowBottomSheet] = React.useState(false);
  const [search, onSearchText] = React.useState("");

  // Creates a reference to the DOM element that we can interact with
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  // Setting the points to which we want the bottom sheet to be set to
  // Using '-30' here so that it is not seen when it is not presented
  const snapPoints = React.useMemo(() => ["88%"], []);

  // Callback function that gets called when the bottom sheet changes
  const handleSheetChanges = React.useCallback((index: number) => {
    console.log("handleSheetChanges", index);
    if (index == -1) {
      setShowBottomSheet(false);
    }
  }, []);

  // Expands the bottom sheet when our button is pressed
  const onAddButtonPress = () => {
    setShowBottomSheet(true);
    bottomSheetRef.current?.expand();
  };

  return (
    <>
      <TouchableWithoutFeedback
        onPress={onAddButtonPress}
        containerStyle={styles.tabBar}
      >
        <SearchIcon
          color={
            navigation.getState().index === 1
              ? Colors[colorScheme].tabIconSelected
              : Colors[colorScheme].tabIconDefault
          }
          width={24}
          height={24}
        />
      </TouchableWithoutFeedback>

      <Portal hostName="BottomTabSheet">
        {showBottomSheet && (
          <View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: "transparent" },
            ]}
          >
            <Pressable
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                flex: 1,
              }}
              onPress={() => {
                bottomSheetRef.current?.close();
              }}
            />
            <BottomSheet
              ref={bottomSheetRef}
              enablePanDownToClose
              snapPoints={snapPoints}
              onChange={handleSheetChanges}
              backgroundComponent={null}
              handleIndicatorStyle={{
                width: "12.5%",
                backgroundColor:
                  colorScheme == "dark"
                    ? "rgba(255, 255, 255, 0.5)"
                    : "rgba(0, 0, 0, 0.5)",
              }}
            >
              <View
                style={[
                  styles.container,
                  { backgroundColor: "#2b2a33", paddingHorizontal: 16 },
                ]}
              >
                <Text style={styles.title}>Tab Three</Text>
                <StyledTextInput
                  value={search}
                  onChangeText={onSearchText}
                  placeholder="Search something"
                  isFloating={false}
                  trailingIcon={({ color, size }) => (
                    <SearchIcon width={size} height={size} color={color} />
                  )}
                />
                <View
                  style={styles.separator}
                  lightColor="#eee"
                  darkColor="rgba(255,255,255,0.1)"
                />
                <View style={styles.getStartedContainer}>
                  <Text
                    style={styles.getStartedText}
                    lightColor="rgba(0,0,0,0.8)"
                    darkColor="rgba(255,255,255,0.8)"
                  >
                    Open up the code for this screen:
                  </Text>

                  <View
                    style={[
                      styles.codeHighlightContainer,
                      styles.homeScreenFilename,
                    ]}
                    darkColor="rgba(255,255,255,0.2)"
                    lightColor="rgba(0,0,0,0.05)"
                  >
                    <MonoText>/screens/SearchScreen.tsx</MonoText>
                  </View>

                  <Text
                    style={styles.getStartedText}
                    lightColor="rgba(0,0,0,0.8)"
                    darkColor="rgba(255,255,255,0.8)"
                  >
                    Change any of the text, save the file, and your app will
                    automatically update.
                  </Text>
                </View>

                <View style={styles.helpContainer}>
                  <TouchableOpacity
                    onPress={handleHelpPress}
                    style={styles.helpLink}
                  >
                    <Text
                      style={styles.helpLinkText}
                      lightColor={Colors.light.tint}
                    >
                      Tap here if your app doesn't automatically update after
                      making changes
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </BottomSheet>
          </View>
        )}
      </Portal>
    </>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },

  // EditScreenInfo styles
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
    backgroundColor: "transparent",
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
    backgroundColor: "transparent",
  },
});
