import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import colors from '@src/theme/colors';
import { Text } from 'react-native';
import { Header } from '@components/Header';
import SignUpForm from '@modules/onboarding/components/SignUpForm';
import { KeyboardView } from '@components/KeyboardView';
import { useTopNavigationScroll } from '@hooks/useTopNavigationScroll';
import Animated from 'react-native-reanimated';

export default function SignUp() {
  const { top, bottom } = useSafeAreaInsets();
  const { back, canGoBack, replace } = useRouter();
  const { onScroll, isScrolled } = useTopNavigationScroll();

  const handlePressBackButton = () => {
    if (canGoBack()) {
      back();
    }
  };

  const handlePressSignIn = () => {
    replace('/(app)/(onboarding)/sign-in');
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
          title='Sign Up'
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
        <View style={styles.contentContainer}>
          <Text style={styles.descriptionTypography}>
            Create an account to get all features and benefits from our app.
          </Text>
          <SignUpForm />
        </View>
        <View style={styles.centered}>
          <Text style={styles.descriptionTypography}>
            Already have an account?{' '}
            <Text style={styles.linkTypography} onPress={handlePressSignIn}>
              Sign In
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
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    gap: 16,
  },
  mainWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  descriptionTypography: {
    fontSize: 16,
    lineHeight: 18,
    fontFamily: 'NunitoSansBold',
    color: colors.darkAlternative,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkTypography: { color: colors.primary },
  contentContainer: {
    flex: 1,
    gap: 16,
  },
  headerRowContainer: {
    paddingHorizontal: 16,
  },
});
