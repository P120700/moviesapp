import callApi from '@api/callApi';

export type SignInQueryType = {
  email: string;
  password: string;
};

export const signInQuery = async (value: SignInQueryType) => {
  return callApi('/sessions', {
    method: 'POST',
    body: { ...value },
  });
};

export type SignUpQueryType = {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
};

export const signUpQuery = async (value: SignUpQueryType) => {
  return callApi('/users', {
    method: 'POST',
    body: { ...value },
  });
};

export const getListQuery = async ({ pageParam }: { pageParam: number }) => {
  return (
    await callApi('/movies', {
      method: 'GET',
      query: {
        limit: 10,
        offset: pageParam * 10,
        sort: 'title',
        order: 'ASC',
      },
    })
  ).data;
};

export const getMovieQuery = async (value: string) => {
  return (
    await callApi(`/movies/${value}`, {
      method: 'GET',
    })
  )?.data;
};

export const deleteMovieQuery = async (value: string) => {
  const res = await callApi(`/movies/${value}`, {
    method: 'DELETE',
    body: {},
  });
  return res;
};

export type AddMovieQueryType = {
  title: string;
  year: number;
  format: string;
  actors: string[];
};

export const addMovieQuery = async (value: AddMovieQueryType) => {
  return callApi('/movies', {
    method: 'POST',
    body: { ...value, year: value.year },
  });
};
