import { Alert, StyleSheet, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@components/Button';
import { TextInput } from '@components/TextInput';
import { useAuthSignUpQuery } from '@modules/onboarding/hooks/useAuthSignUpQuery';
import validationSchema from '@utils/validation';
import { ErrorMessage } from '@components/ErrorMessage';
import { useEffect } from 'react';
import { SignUpQueryType } from '@api/queries';

export default function SignUpForm() {
  const { signUp, error } = useAuthSignUpQuery();

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error?.message);
    }
  }, [error]);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
  } = useForm<SignUpQueryType>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const handleSignUp = async (values: SignUpQueryType) => {
    if (isValid) {
      await signUp({
        email: values.email,
        name: values.name,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
    }
  };

  const passwordValue = watch('password');

  return (
    <View style={styles.container}>
      <Controller
        name='name'
        control={control}
        rules={validationSchema.username}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder='Full Name'
            leftIcon='person-outline'
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      <ErrorMessage error={errors.name} />
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
      <Controller
        name='confirmPassword'
        control={control}
        rules={validationSchema.confirmPassword(passwordValue)}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            secureTextEntry
            placeholder='Confirm Password'
            leftIcon='lock-closed-outline'
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      <ErrorMessage error={errors.confirmPassword} />
      <View style={styles.buttonContainer}>
        <Button label='Sign Up' onPress={handleSubmit(handleSignUp)} />
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
