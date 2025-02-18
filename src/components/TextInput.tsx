import colors from '@src/theme/colors';
import {
  Pressable,
  StyleSheet,
  TextInputProps,
  TextInput as TextInputRN,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { IconButton } from './IconButton';
import { useRef } from 'react';

type TextInputType = {
  onChange: (text: string) => void;
  value: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  size?: 'small' | 'medium';
} & Omit<TextInputProps, 'onChange' | 'value'>;

export const TextInput = ({
  onChange,
  value,
  leftIcon,
  rightIcon,
  placeholderTextColor = colors.darkAlternative,
  autoCapitalize = 'none',
  autoCorrect = false,
  size = 'medium',
  ...props
}: TextInputType) => {
  const inputSize = size === 'small' ? 48 : 60;

  const ref = useRef<TextInputRN>(null);

  const handlePress = () => {
    ref.current?.focus();
  };
  return (
    <Pressable
      style={[styles.container, { height: inputSize }]}
      onPress={handlePress}
    >
      {leftIcon ? (
        <IconButton
          iconName={leftIcon}
          containerStyle={styles.iconContainer}
          onPress={handlePress}
        />
      ) : null}
      <TextInputRN
        ref={ref}
        style={[
          styles.textInputContainer,
          {
            height: inputSize,
          },
        ]}
        onChangeText={onChange}
        value={value}
        selectionColor={colors.primary}
        placeholderTextColor={placeholderTextColor}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        {...props}
      />
      {rightIcon ? (
        <IconButton
          iconName={rightIcon}
          containerStyle={styles.iconContainer}
          onPress={handlePress}
        />
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.darkAlternative,
    overflow: 'hidden',
    paddingHorizontal: 12,
    gap: 8,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    color: colors.dark,
    fontSize: 18,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    borderWidth: 0,
    flex: 1,
  },
});
