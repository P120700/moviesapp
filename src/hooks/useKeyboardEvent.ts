import {
  AnimatedKeyboardOptions,
  useAnimatedKeyboard,
  useAnimatedStyle,
} from 'react-native-reanimated';

type UseKeyboardEventOptions = AnimatedKeyboardOptions & {
  bottom?: number;
};
export function useKeyboardEvent(
  options?: UseKeyboardEventOptions | undefined
) {
  const animatedKeyboard = useAnimatedKeyboard(options);
  const keyboardHeightStyle = useAnimatedStyle(() => {
    return {
      height: animatedKeyboard.height.value - (options?.bottom ?? 0),
    };
  });

  return {
    ...animatedKeyboard,
    keyboardHeightStyle,
  };
}
