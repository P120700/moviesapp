import { useMutation } from '@tanstack/react-query';
import { mmkvStorage } from '@src/store/storage';
import { useStore } from '@store';
import { signUpQuery } from '@api/queries';
import { useState } from 'react';

export const useAuthSignUpQuery = () => {
  const [errorQuery, setErrorQuery] = useState<{ message: string } | null>(
    null
  );

  const setAuthenticated = useStore((state) => state.setAuthenticated);

  const handleSuccessSignUp = (data: { token?: string }) => {
    if (data.token) {
      mmkvStorage.setItem('@accessToken', data.token);
      setAuthenticated(true);
      setErrorQuery(null);
      return;
    }
    setErrorQuery({ message: 'Registration failed' });
  };

  const { mutate: signUp } = useMutation({
    mutationFn: signUpQuery,
    onSuccess: handleSuccessSignUp,
  });

  return { signUp, error: errorQuery };
};
