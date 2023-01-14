export const Panel = {
  START: "start",
  CENTER: "center",
  END: "end",
} as const;

const AllowedPanels = [Panel.START, Panel.CENTER, Panel.END] as const;

export type Panel = typeof AllowedPanels[number];

export const SwipeDirection = {
  LEFT: "left",
  RIGHT: "right",
} as const;

const AllowedSwipeDirections = [
  SwipeDirection.LEFT,
  SwipeDirection.RIGHT,
] as const;

export type SwipeDirection = typeof AllowedSwipeDirections[number];

export const LockState = {
  OPEN: "open",
  CLOSE: "close",
  UNLOCKED: "unclocked",
} as const;

const AllowedLockState = [
  LockState.OPEN,
  LockState.CLOSE,
  LockState.UNLOCKED,
] as const;

export type LockState = typeof AllowedLockState[number];
