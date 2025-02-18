import { useKeyboardEvent } from '@hooks/useKeyboardEvent';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { StyleSheet, ViewProps } from 'react-native';

type KeyboardViewProps = {
  bottom?: number;
  containerStyle?: ViewProps['style'];
};

export const KeyboardView = ({
  bottom = 0,
  containerStyle,
}: KeyboardViewProps) => {
  const { height } = useKeyboardEvent({
    bottom,
  });

  const aStyles = useAnimatedStyle(() => {
    return {
      height: bottom + height.value,
    };
  });
  return <Animated.View style={[styles.container, aStyles, containerStyle]} />;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
