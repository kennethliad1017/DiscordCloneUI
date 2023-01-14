/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import {
  BottomTabBar,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import createTabNavigator from "../components/TabNavigation";
import {
  CloseIcon,
  DiscordIcon,
  FriendIcon,
  NotificationIcon,
  ProfileIcon,
  SearchIcon,
} from "../components/VectorIcon";
import Colors from "../constants/Colors";
import { OverlappingProgressContext } from "../contexts/ProgressContext";
import useColorScheme from "../hooks/useColorScheme";
import HomeScreen from "../screens/HomeScreen";
import ModalScreen from "../screens/Server/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ServerInfoForScreen from "../screens/Server/ServerInfoForScreen";
import JoinScreen from "../screens/Server/JoinScreen";
import ServerInfoScreen from "../screens/Server/ServerInfoScreen";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      // theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      theme={DarkTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const colorScheme = useColorScheme();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="Modal"
          component={ModalScreen}
          options={({ navigation }) => ({
            headerTitle: "",
            headerStyle: {
              backgroundColor: "#2b2a33",
            },
            headerShadowVisible: false,
            headerLeft: ({ tintColor, canGoBack }) => {
              return (
                <CloseIcon
                  width={24}
                  height={24}
                  color={tintColor}
                  onPress={() => canGoBack && navigation.goBack()}
                />
              );
            },
          })}
        />
        <Stack.Screen
          name="AboutServerInfo"
          component={ServerInfoForScreen}
          options={{
            headerTitle: "",
            headerStyle: {
              backgroundColor: "#2b2a33",
            },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="CreateServerInfo"
          component={ServerInfoScreen}
          options={{
            headerTitle: "",
            headerStyle: {
              backgroundColor: "#2b2a33",
            },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="JoinServer"
          component={JoinScreen}
          options={{
            headerTitle: "",
            headerStyle: {
              backgroundColor: "#2b2a33",
            },
            headerShadowVisible: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const progress = React.useContext(OverlappingProgressContext);

  const bottombarAnim = useAnimatedStyle(() => {
    return {
      height:
        progress.value > 0.98
          ? withTiming(56, {
              easing: Easing.bezier(0.0, 0.0, 0.2, 1.0),
              duration: 150,
            })
          : withTiming(0, {
              easing: Easing.bezier(0.0, 0.0, 0.2, 1.0),
              duration: 250,
            }),
    };
  });

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarShowLabel: false,
      }}
      tabBar={(props) => {
        return (
          <Animated.View
            style={
              props.navigation.getState().index == 0
                ? bottombarAnim
                : { height: 56 }
            }
          >
            <BottomTabBar {...props} />
          </Animated.View>
        );
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <DiscordIcon color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Friend"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<"Friend">) => ({
          title: "Friends",
          tabBarIcon: ({ color }) => <FriendIcon color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Search"
        component={AddScreenComponent}
        options={(props) => ({
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <SearchIcon color={color} width={24} height={24} />
          ),
          tabBarButton: ({}) => {
            return <SearchScreen {...props} />;
          },
        })}
      />
      <BottomTab.Screen
        name="Mention"
        component={TabTwoScreen}
        options={{
          title: "Notifications",
          tabBarIcon: ({ color }) => <NotificationIcon color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <ProfileIcon color={color} width={24} height={24} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// const Tab = createTabNavigator();

// function TabNav() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen
//         name="OneTab"
//         component={() => (
//           <View>
//             <Text>First Tab</Text>
//           </View>
//         )}
//       />
//       <Tab.Screen
//         name="OneTab"
//         component={() => (
//           <View>
//             <Text>Second Tab</Text>
//           </View>
//         )}
//       />
//     </Tab.Navigator>
//   );
// }

const AddScreenComponent = () => {
  return null;
};

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>["name"];
  color: string;
}) {
  return <FontAwesome5 size={24} style={{ marginBottom: -3 }} {...props} />;
}
