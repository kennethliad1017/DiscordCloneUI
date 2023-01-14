import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import {
  createNavigatorFactory,
  DefaultNavigatorOptions,
  ParamListBase,
  TabActionHelpers,
  TabActions,
  TabNavigationState,
  TabRouter,
  TabRouterOptions,
  useNavigationBuilder,
} from "@react-navigation/native";
import {
  View,
  type StyleProp,
  type ViewStyle,
  Pressable,
  Text,
  StyleSheet,
} from "react-native";

// Props accepted by the view
type TabNavigationConfig = {
  tabBarStyle: StyleProp<ViewStyle>;
  contentStyle: StyleProp<ViewStyle>;
};

// The props accepted by the component is a combination of 3 things
type Props = Omit<
  DefaultNavigatorOptions<
    ParamListBase,
    TabNavigationState<ParamListBase>,
    TabNavigationOptions,
    TabNavigationEventMap
  > &
    TabRouterOptions &
    TabNavigationConfig,
  "children"
> & {
  children: JSX.Element[];
};

// Supported screen options
type TabNavigationOptions = {
  title?: string;
};

// Map of event name and the type of data (in event.data)
//
// canPreventDefault: true adds the defaultPrevented property to the
// emitted events.
type TabNavigationEventMap = {
  tabPress: {
    data: { isAlreadyFocused: boolean };
    canPreventDefault: true;
  };
};

function TabNavigator({
  initialRouteName,
  children,
  screenOptions,
  tabBarStyle,
  contentStyle,
}: Props) {
  const { state, navigation, descriptors, NavigationContent } =
    useNavigationBuilder<
      TabNavigationState<ParamListBase>,
      TabRouterOptions,
      TabActionHelpers<ParamListBase>,
      TabNavigationOptions,
      TabNavigationEventMap
    >(TabRouter, {
      children,
      screenOptions,
      initialRouteName,
    });

  return (
    <NavigationContent>
      <View style={[{ flexDirection: "row" }, tabBarStyle]}>
        {state.routes.map((route) => (
          <Pressable
            key={route.key}
            onPress={() => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
                data: {
                  isAlreadyFocused: route.key === state.routes[state.index].key,
                },
              });

              if (!event.defaultPrevented) {
                navigation.dispatch({
                  ...TabActions.jumpTo(route.name),
                  target: state.key,
                });
              }
            }}
            style={{ flex: 1 }}
          >
            <Text>{descriptors[route.key].options.title || route.name}</Text>
          </Pressable>
        ))}
      </View>
      <View style={[{ flex: 1 }, contentStyle]}>
        {state.routes.map((route, i) => {
          return (
            <View
              key={route.key}
              style={[
                StyleSheet.absoluteFill,
                { display: i === state.index ? "flex" : "none" },
              ]}
            >
              {descriptors[route.key].render()}
            </View>
          );
        })}
      </View>
    </NavigationContent>
  );
}

export default createNavigatorFactory<
  TabNavigationState<ParamListBase>,
  TabNavigationOptions,
  TabNavigationEventMap,
  typeof TabNavigator
>(TabNavigator);
