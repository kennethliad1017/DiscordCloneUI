import { StyleSheet, StatusBar, View } from "react-native";
import React from "react";
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { LockState, Panel, SwipeDirection } from "./types";
import Layout from "../../constants/Layout";
import {
  GestureEventPayload,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import Overlay from "./Overlay";

const nonFullWidthSidePanel = Layout.window.width - 8 - 48;

type SidePanelProps = {
  setStartPanelUseFullPortraitWidth: (isFullWidth: boolean) => void;
};

type OverlappingPanelsProps = {
  leftPanel: (props: SidePanelProps) => JSX.Element;
  centerPanel: (props: {
    openStartPanel: (isFling: boolean) => void;
  }) => JSX.Element;
  rightPanel: () => JSX.Element;
  onChanges: (value: number) => void;
};

const OverlappingPanels = ({
  leftPanel,
  centerPanel,
  rightPanel,
  onChanges,
}: OverlappingPanelsProps) => {
  const centerPanelRef = useAnimatedRef<Animated.View>();

  const selectedPanel = useSharedValue<Panel>(Panel.CENTER);
  const swipeDirection = useSharedValue<SwipeDirection | null>(null);
  const centerPanelX = useSharedValue(0);
  const centerPanelAnimationEndX = useSharedValue(0);
  const startPanelOpenedCenterPanelX = useSharedValue(
    nonFullWidthSidePanel + 8
  );
  const endPanelOpenedCenterPanelX = useSharedValue(
    -(nonFullWidthSidePanel + 8)
  );

  const xFromInterceptActionDown = useSharedValue(0);
  const yFromInterceptActionDown = useSharedValue(0);
  const centerPanelDiffX = useSharedValue(0);

  const isScrollingHorizontally = useSharedValue(false);
  const wasActionDownOnClosedCenterPanel = useSharedValue(false);
  const useFullWidthForStartPanel = useSharedValue(false);

  const showStartPanel = useSharedValue(false);
  const showEndPanel = useSharedValue(false);

  const centerPanelElevation = useSharedValue(0);

  const startPanelLockState: SharedValue<LockState> = useSharedValue(
    LockState.UNLOCKED
  );
  const endPanelLockState: SharedValue<LockState> = useSharedValue(
    LockState.UNLOCKED
  );

  const isTouchingCenterPanelWhileSidePanelOpen = (
    event: GestureEventPayload & PanGestureHandlerEventPayload
  ) => {
    "worklet";
    const x = event.x;
    const centerPanel = centerPanelX.value;

    const maxCenterPanelX = Math.max(
      startPanelOpenedCenterPanelX.value,
      endPanelOpenedCenterPanelX.value
    );

    const minCenterPanelX = Math.min(
      startPanelOpenedCenterPanelX.value,
      endPanelOpenedCenterPanelX.value
    );

    const centerPanelRightEdgeXWhenRightPanelFullyOpen =
      minCenterPanelX + Layout.window.width;

    const isTouchingCenterPanelWithLeftPanelOpen = x > maxCenterPanelX;
    const isTouchingCenterPanelWhileRightPanelOpen =
      x < centerPanelRightEdgeXWhenRightPanelFullyOpen;
    const isLeftPanelFullyOpen = centerPanel == maxCenterPanelX;
    const isRightPanelFullyOpen = centerPanel == minCenterPanelX;

    return (
      (isLeftPanelFullyOpen && isTouchingCenterPanelWithLeftPanelOpen) ||
      (isRightPanelFullyOpen && isTouchingCenterPanelWhileRightPanelOpen)
    );
  };

  /**
   * Return an x value that is within the bounds of the center panel's
   * allowed horizontal translation range.
   */
  const getNormalizedX = (targetedX: number) => {
    "worklet";
    let maxX: number;
    let minX: number;

    if (
      selectedPanel.value == Panel.CENTER &&
      swipeDirection.value == SwipeDirection.LEFT
    ) {
      maxX = 0;
    } else {
      maxX = Math.max(
        startPanelOpenedCenterPanelX.value,
        endPanelOpenedCenterPanelX.value
      );
    }

    if (
      selectedPanel.value == Panel.CENTER &&
      swipeDirection.value == SwipeDirection.RIGHT
    ) {
      minX = 0;
    } else {
      minX = Math.min(
        startPanelOpenedCenterPanelX.value,
        endPanelOpenedCenterPanelX.value
      );
    }

    if (targetedX > maxX) {
      return maxX;
    } else if (targetedX < minX) {
      return minX;
    } else {
      return targetedX;
    }
  };

  const handleCenterPanelX = (x: number) => {
    "worklet";
    showStartPanel.value = centerPanelX.value > 0 ? true : false;
    showEndPanel.value = centerPanelX.value < 0 ? true : false;

    if (x == 0) {
      selectedPanel.value = Panel.CENTER;
    } else if (x == startPanelOpenedCenterPanelX.value) {
      selectedPanel.value = Panel.START;
      showStartPanel.value = true;
      showEndPanel.value = false;
    } else if (x == endPanelOpenedCenterPanelX.value) {
      selectedPanel.value = Panel.END;
      showStartPanel.value = false;
      showEndPanel.value = true;
    }

    const isCenterPanelClosed =
      x == endPanelOpenedCenterPanelX.value ||
      x == startPanelOpenedCenterPanelX.value;

    const isCenterPanelInRestingState = x == 0 || isCenterPanelClosed;

    centerPanelElevation.value = isCenterPanelInRestingState ? 0 : 8;
  };

  const updateCenterPanelX = (x: number) => {
    "worklet";
    // const previousX = centerPanelX.value;
    centerPanelX.value = x;
    handleCenterPanelX(x);
  };

  /**
   * [animationDurationMs] should generally be 250ms for opening and 200ms for closing
   * according to https://material.io/design/motion/speed.html#duration
   */
  const updateCenterPanelXWithAnimation = (
    x: number,
    isFling = false,
    animationDurationMs = 250
  ) => {
    "worklet";
    const normalizedX = getNormalizedX(x);
    centerPanelAnimationEndX.value = normalizedX;

    if (isFling) {
      centerPanelX.value = withTiming(normalizedX, {
        easing: Easing.bezier(0.0, 0.0, 0.2, 1.0),
        duration: animationDurationMs,
      });
      handleCenterPanelX(x);
    } else {
      centerPanelX.value = withTiming(normalizedX, {
        easing: Easing.bezier(0.4, 0.0, 0.2, 1.0),
        duration: animationDurationMs,
      });
      handleCenterPanelX(x);
    }
  };

  const openStartPanel = (isFling = false) => {
    "worklet";
    updateCenterPanelXWithAnimation(
      startPanelOpenedCenterPanelX.value,
      isFling,
      250
    );
  };

  const closePanels = (isFling = false) => {
    "worklet";
    updateCenterPanelXWithAnimation(0, isFling, 200);
  };

  const openEndPanel = (isFling = false) => {
    "worklet";
    updateCenterPanelXWithAnimation(
      endPanelOpenedCenterPanelX.value,
      isFling,
      250
    );
  };

  /**
   * Set the lock panel state for the start panel. [LockState.OPEN] means the start panel stays
   * opened, and the center panel cannot be moved. [LockState.CLOSE] means the start panel stays
   * closed, and the selected panel can either be the center panel or the end panel.
   * [LockState.UNLOCKED] is the default [LockState] and means that the center panel can move freely
   * to open either of the two side panels.
   */
  const setStartPanelLockState = (lockState: LockState) => {
    startPanelLockState.value = lockState;
    if (lockState == LockState.OPEN) {
      openStartPanel();
    }
  };

  /**
   * Set the lock panel state for the end panel. [LockState.OPEN] means the end panel stays
   * opened, and the center panel cannot be moved. [LockState.CLOSE] means the end panel stays
   * closed, and the selected panel can either be the center panel or the start panel.
   * [LockState.UNLOCKED] is the default [LockState] and means that the center panel can move freely
   * to open either of the two side panels.
   */
  const setEndPanelLockState = (lockState: LockState) => {
    endPanelLockState.value = lockState;
    if (lockState == LockState.OPEN) {
      openEndPanel();
    }
  };

  /**
   * By default, [OverlappingPanelsLayout] sets the start panel width so that when the start panel
   * is opened, it leaves room to show the partially visible closed center panel. To make the start
   * panel fill the full screen width, call [setStartPanelUseFullPortraitWidth] with
   * [useFullPortraitWidth] set to true.
   */
  const setStartPanelUseFullPortraitWidth = (useFullPortraitWidth: boolean) => {
    useFullWidthForStartPanel.value = useFullPortraitWidth;
  };

  const getTargetedX = (
    event: GestureEventPayload & PanGestureHandlerEventPayload
  ) => {
    "worklet";
    return event.absoluteX + centerPanelDiffX.value;
  };

  const shouldHandleActionMoveEvent = (
    event: GestureEventPayload & PanGestureHandlerEventPayload
  ) => {
    "worklet";
    const targetedX = getTargetedX(event);
    const normalizedX = getNormalizedX(targetedX);
    const greaterThanMinChange =
      Math.abs(normalizedX - centerPanelX.value) > Layout.window.scale;

    return (
      normalizedX == 0 ||
      normalizedX == startPanelOpenedCenterPanelX.value ||
      normalizedX == endPanelOpenedCenterPanelX.value ||
      greaterThanMinChange
    );
  };

  const translateCenterPanel = (
    event: GestureEventPayload & PanGestureHandlerEventPayload
  ) => {
    "worklet";
    const targetedX = getTargetedX(event);

    var normalizedX = getNormalizedX(targetedX);
    updateCenterPanelX(normalizedX);
  };

  const snapOpenOrClose = (
    event: GestureEventPayload & PanGestureHandlerEventPayload
  ) => {
    "worklet";
    const targetedX = getTargetedX(event);

    const pxPerSeconds = event.velocityX;
    const isFling = Math.abs(pxPerSeconds) > 240;
    const isDirectionStartToEnd = pxPerSeconds > 0;

    if (isFling) {
      if (isDirectionStartToEnd) {
        switch (selectedPanel.value as Panel) {
          case Panel.END:
            // close the side panel
            closePanels(true);
            break;

          default:
            // open left panel
            openStartPanel(true);
            break;
        }
      } else {
        switch (selectedPanel.value as Panel) {
          case Panel.START:
            // close the side panel
            closePanels(true);
            break;

          default:
            // open right panel
            openEndPanel(true);
            break;
        }
      }
    }

    const maxCenterPanelX = Math.max(
      startPanelOpenedCenterPanelX.value,
      endPanelOpenedCenterPanelX.value
    );
    const minCenterPanelX = Math.min(
      startPanelOpenedCenterPanelX.value,
      endPanelOpenedCenterPanelX.value
    );

    // if targetedX is more than the half of centerpanelx allowed postions
    // then animate to open left panel
    if (targetedX > maxCenterPanelX / 2) {
      openStartPanel(false);
    }

    // else if targetedX is less than the half of -centerpanelx allowed postions
    // then animate to open right panel
    else if (targetedX < minCenterPanelX / 2) {
      openEndPanel(false);
    }
    // else  close side panels
    else {
      closePanels(false);
    }
  };

  const panGestureEvent = useAnimatedGestureHandler({
    onStart(event) {
      isScrollingHorizontally.value = false;
      wasActionDownOnClosedCenterPanel.value =
        isTouchingCenterPanelWhileSidePanelOpen(event);
      // initialize centerPanelDiffX on start pan gesture
      centerPanelDiffX.value = centerPanelX.value - event.absoluteX;

      xFromInterceptActionDown.value = event.x;
      yFromInterceptActionDown.value = event.y;
    },
    onActive(event) {
      // If the horizontally distance in the MotionEvent is more than
      // the scroll slop, and if the horizontal distance is greater than
      // the vertical distance, start the horizontal scroll for the panels.
      const xDiff = event.x - xFromInterceptActionDown.value;
      const yDiff = event.y - yFromInterceptActionDown.value;

      if (Math.abs(xDiff) > 8 && Math.abs(xDiff) > Math.abs(yDiff)) {
        isScrollingHorizontally.value = true;
      }

      if (Math.abs(xDiff) > 8) {
        if (swipeDirection.value == null) {
          if (xDiff > 0) {
            swipeDirection.value = SwipeDirection.RIGHT;
          } else {
            swipeDirection.value = SwipeDirection.LEFT;
          }
        }
      }

      // check if able to move the center panel
      // then animate the center panel view
      if (shouldHandleActionMoveEvent(event)) {
        // translateCenterPanel(event);
        const targetedX = getTargetedX(event);
        const normalizedX = getNormalizedX(targetedX);
        centerPanelX.value = normalizedX;
        handleCenterPanelX(normalizedX);
      }
    },
    onFinish(event) {
      //  check if click when side panel is opened
      const isClosedCenterPanelClick =
        wasActionDownOnClosedCenterPanel.value &&
        Math.abs(event.x - xFromInterceptActionDown.value) < 8 &&
        !isScrollingHorizontally.value;

      // then closed the side panels
      if (isClosedCenterPanelClick) {
        closePanels();
      }
      // else  snap to one of the following state (e.g. Center, Left, Right)
      else {
        snapOpenOrClose(event);
      }

      wasActionDownOnClosedCenterPanel.value = false;
      isScrollingHorizontally.value = false;
      swipeDirection.value = null;
    },
  });

  const progress = useDerivedValue(() => {
    const panelProgress = interpolate(
      centerPanelX.value,
      [endPanelOpenedCenterPanelX.value, 0, startPanelOpenedCenterPanelX.value],
      [-1, 0, 1]
    );

    runOnJS(onChanges)(panelProgress);
    return interpolate(
      centerPanelX.value,
      [endPanelOpenedCenterPanelX.value, 0, startPanelOpenedCenterPanelX.value],
      [-1, 0, 1]
    );
  });

  const centerStyle = useAnimatedStyle(() => {
    return {
      shadowColor: "#0000",
      shadowOpacity: 0.5,
      shadowRadius: 2,
      backgroundColor: Math.abs(progress.value) > 0.98 ? "#1c1b25" : "#35343d",
      elevation: centerPanelElevation.value,
      zIndex: Math.abs(progress.value) > 0.05 ? 8 : 1,
    };
  });

  const translateX = useDerivedValue(() => {
    return centerPanelX.value;
  });

  const centerAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  const startStyle = useAnimatedStyle(() => {
    const interpolateStartPanel = interpolate(
      showStartPanel.value ? 1 : 0,
      [0, 1],
      [0, 1]
    );
    return {
      display: interpolateStartPanel > 0.12 ? "flex" : "none",
      backgroundColor: progress.value > 0.12 ? "#1c1b25" : "#2b2a33",
    };
  });

  const startPanelWidthAnim = useAnimatedStyle(() => {
    const interpolateStartPanel = interpolate(
      useFullWidthForStartPanel.value ? 1 : 0,
      [0, 1],
      [nonFullWidthSidePanel, Layout.window.width]
    );

    return {
      width: interpolateStartPanel,
    };
  });

  const endStyle = useAnimatedStyle(() => {
    const interpolateEndPanel = interpolate(
      showEndPanel.value ? 1 : 0,
      [0, 1],
      [0, 1]
    );
    return {
      display: interpolateEndPanel > 0.12 ? "flex" : "none",
      backgroundColor: progress.value < -0.12 ? "#1c1b25" : "#2b2a33",
    };
  });

  return (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View style={styles.container}>
        <Animated.View
          style={[
            styles.panel,
            startStyle,
            startPanelWidthAnim,
            {
              left: 0,
              elevation: 0,
              paddingTop: StatusBar.currentHeight,
            },
          ]}
        >
          {leftPanel({ setStartPanelUseFullPortraitWidth })}
        </Animated.View>
        <Animated.View
          ref={centerPanelRef}
          importantForAccessibility={
            progress.value != 0 ? "no-hide-descendants" : "auto"
          }
          style={[
            styles.panel,
            {
              left: 0,
              right: 0,
              paddingTop: StatusBar.currentHeight,
            },
            centerStyle,
            centerAnimStyle,
          ]}
        >
          <View style={{ flex: 1 }}>
            {centerPanel({ openStartPanel })}
            <Overlay progress={progress} />
          </View>
        </Animated.View>
        <Animated.View
          style={[
            styles.panel,
            endStyle,
            {
              right: 0,
              width: nonFullWidthSidePanel,
              elevation: 0,
              paddingTop: StatusBar.currentHeight,
            },
          ]}
        >
          {rightPanel()}
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default OverlappingPanels;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1b25",
  },

  panel: {
    position: "absolute",
    top: 0,
    bottom: 0,
  },
});
