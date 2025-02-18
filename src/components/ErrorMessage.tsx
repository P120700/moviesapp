import colors from '@src/theme/colors';
import { StyleSheet, Text } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

type ErrorMessageProps = {
  error?: {
    message?: string;
  };
};

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return error ? (
    <Animated.View entering={FadeIn}>
      <Text numberOfLines={1} style={styles.errorText}>
        {error.message}
      </Text>
    </Animated.View>
  ) : null;
};

const styles = StyleSheet.create({
  errorText: {
    fontSize: 10,
    lineHeight: 12,
    color: colors.primaryAlternative,
    fontFamily: 'NunitoSansExtraRegular',
  },
});
