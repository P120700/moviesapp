import { StyleSheet, Text, View, ViewProps } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import colors from '@src/theme/colors';
import { IconButton } from './IconButton';

type HeaderProps = {
  title?: string;
  isScrolled?: SharedValue<boolean>;
  withBackButton?: boolean;
  onBackButtonPress?: () => void;
  children?: React.ReactNode;
  containerStyle?: ViewProps['style'];
};

const AnimatedView = Animated.createAnimatedComponent(View);

export const Header = ({
  title,
  isScrolled,
  withBackButton,
  onBackButtonPress,
  children,
  containerStyle,
}: HeaderProps) => {
  const topBorder = useAnimatedStyle(() => {
    return {
      borderColor: isScrolled?.value ? colors.primary : 'transparent',
    };
  });

  return (
    <AnimatedView
      style={[styles.container, topBorder]}
      entering={FadeIn}
      exiting={FadeOut}
    >
      <View style={[styles.rowContainer, containerStyle]}>
        {withBackButton ? (
          <IconButton
            iconName='arrow-back'
            onPress={onBackButtonPress}
            containerStyle={styles.iconContainer}
          />
        ) : null}
        {title ? <Text style={styles.headerTypography}>{title}</Text> : null}
      </View>
      {children}
    </AnimatedView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 8,
    width: '100%',
    borderBottomWidth: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  headerTypography: {
    fontFamily: 'NunitoSansBold',
    fontSize: 24,
    lineHeight: 32,
    color: colors.primary,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
