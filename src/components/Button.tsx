import colors from '@src/theme/colors';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type ButtonProps = {
  label: string;
  variant?: 'primary' | 'secondary';
  onPress?: () => void;
};

const getStyles = (variant: ButtonProps['variant']) => {
  switch (variant) {
    case 'secondary':
      return {
        backgroundColor: colors.white,
        borderColor: colors.darkAlternative,
        borderWidth: 2,
      };
    case 'primary':
    default:
      return {
        backgroundColor: colors.primary,
      };
  }
};

const getTypography = (variant: ButtonProps['variant']) => {
  switch (variant) {
    case 'secondary':
      return {
        color: colors.darkAlternative,
      };
    case 'primary':
    default:
      return {
        color: colors.white,
      };
  }
};

export const Button = ({
  label,
  variant = 'primary',
  onPress,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, getStyles(variant)]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, getTypography(variant)]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 36,
    fontFamily: 'NunitoSansExtraBold',
  },
});
