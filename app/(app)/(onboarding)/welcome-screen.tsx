import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import colors from '@src/theme/colors';
import { Button } from '@components/Button';
import { Text } from 'react-native';

export default function WelcomeScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const { navigate } = useRouter();

  const navigateToSignIn = () => {
    navigate('/(app)/(onboarding)/sign-in');
  };

  const navigateToSignUp = () => {
    navigate('/(app)/(onboarding)/sign-up');
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: top + 16, paddingBottom: bottom + 16 },
      ]}
    >
      <View style={styles.mainWrapper}>
        <Text style={styles.titleTypography}>Movies App</Text>
        <Text style={styles.descriptionTypography}>Welcome to Movies App</Text>
      </View>
      <View style={styles.buttonGroup}>
        <Button label='Sign Up' onPress={navigateToSignUp} />
        <Button
          label='Already have an account'
          variant='secondary'
          onPress={navigateToSignIn}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonGroup: {
    gap: 16,
  },
  mainWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  titleTypography: {
    fontSize: 52,
    lineHeight: 52,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    color: colors.primary,
    fontWeight: 700,
    textAlign: 'center',
  },
  descriptionTypography: {
    fontSize: 24,
    lineHeight: 26,
    fontFamily: 'NunitoSansBold',
    color: colors.darkAlternative,
    textAlign: 'center',
  },
});
