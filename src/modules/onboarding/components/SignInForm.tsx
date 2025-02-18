import { Alert, StyleSheet, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@components/Button';
import { TextInput } from '@components/TextInput';
import validationSchema from '@utils/validation';
import { ErrorMessage } from '@components/ErrorMessage';
import { useAuthSignInQuery } from '@modules/onboarding/hooks/useAuthSignInQuery';
import { useEffect } from 'react';
import { SignInQueryType } from '@api/queries';

export default function SignInForm() {
  const { signIn, error } = useAuthSignInQuery();

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error?.message);
    }
  }, [error]);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<SignInQueryType>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const handleSignUp = async (values: SignInQueryType) => {
    if (isValid) {
      await signIn({
        email: values.email,
        password: values.password,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        name='email'
        control={control}
        rules={validationSchema.email}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder='Email'
            leftIcon='mail'
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      <ErrorMessage error={errors.email} />
      <Controller
        name='password'
        control={control}
        rules={validationSchema.password}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            secureTextEntry
            placeholder='Password'
            leftIcon='lock-closed-outline'
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      <ErrorMessage error={errors.password} />
      <View style={styles.buttonContainer}>
        <Button label='Sign In' onPress={handleSubmit(handleSignUp)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  buttonContainer: {
    marginTop: 24,
  },
});
