import colors from '@src/theme/colors';
import { StyleSheet, TouchableOpacity, ViewProps } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type ButtonProps = {
  iconName: keyof typeof Ionicons.glyphMap;
  containerStyle?: ViewProps['style'];
  iconColor?: string;
  onPress?: () => void;
};

export const IconButton = ({
  iconName,
  onPress,
  iconColor = colors.darkAlternative,
  containerStyle,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons name={iconName} size={24} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 36,
    fontFamily: 'NunitoSansExtraBold',
  },
});
