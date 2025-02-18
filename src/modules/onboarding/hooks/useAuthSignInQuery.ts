import { useMutation } from '@tanstack/react-query';
import { mmkvStorage } from '@src/store/storage';
import { useStore } from '@store';
import { signInQuery } from '@api/queries';
import { useState } from 'react';

export const useAuthSignInQuery = () => {
  const [errorQuery, setErrorQuery] = useState<{
    message: string;
  } | null>(null);

  const setAuthenticated = useStore((state) => state.setAuthenticated);

  const handleSuccessSignIn = (data: { token?: string }) => {
    if (data.token) {
      mmkvStorage.setItem('@accessToken', data.token);
      setAuthenticated(true);
      setErrorQuery(null);
      return;
    }
    setErrorQuery({ message: 'Authentication failed' });
  };

  const { mutate: signIn } = useMutation({
    mutationFn: signInQuery,
    onSuccess: handleSuccessSignIn,
  });

  return { signIn, error: errorQuery };
};
