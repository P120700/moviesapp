import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import colors from '@src/theme/colors';
import { Text } from 'react-native';
import { Header } from '@components/Header';
import SignInForm from '@modules/onboarding/components/SignInForm';
import Animated from 'react-native-reanimated';
import { useTopNavigationScroll } from '@hooks/useTopNavigationScroll';
import { KeyboardView } from '@components/KeyboardView';

export default function SignIn() {
  const { top, bottom } = useSafeAreaInsets();
  const { back, canGoBack, replace } = useRouter();
  const { onScroll, isScrolled } = useTopNavigationScroll();

  const handlePressBackButton = () => {
    if (canGoBack()) {
      back();
    }
  };

  const handlePressSignUp = () => {
    replace('/(app)/(onboarding)/sign-up');
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: top + 16, paddingBottom: bottom + 16 },
      ]}
    >
      <View style={styles.headerRowContainer}>
        <Header
          title='Sign In'
          withBackButton
          onBackButtonPress={handlePressBackButton}
          isScrolled={isScrolled}
        />
      </View>

      <Animated.ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        bounces={false}
      >
        <View style={styles.mainContainer}>
          <Text style={styles.descriptionTypography}>
            Let's sign you in to your accounts first.
          </Text>
          <SignInForm />
        </View>
        <View style={styles.centered}>
          <Text style={styles.descriptionTypography}>
            Don’t have an account?{' '}
            <Text style={styles.linkTypography} onPress={handlePressSignUp}>
              Sign Up!
            </Text>
          </Text>
          <KeyboardView />
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  descriptionTypography: {
    fontSize: 16,
    lineHeight: 18,
    fontFamily: 'NunitoSansBold',
    color: colors.darkAlternative,
  },
  mainContainer: {
    flex: 1,
    gap: 16,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkTypography: {
    color: colors.primary,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    gap: 16,
  },
  headerRowContainer: {
    paddingHorizontal: 16,
  },
});
