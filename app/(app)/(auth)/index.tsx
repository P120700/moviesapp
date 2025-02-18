import { StyleSheet, View } from 'react-native';
import { useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '@components/Header';
import { useTopNavigationScroll } from '@hooks/useTopNavigationScroll';
import colors from '@src/theme/colors';
import { TextInput } from '@components/TextInput';
import { AddMovieModal } from '@modules/movie/components/AddMovieModal';
import { useStore } from '@store';
import { useGetListQuery } from '@modules/movie/hooks/useGetListQuery';
import { MoviesList } from '@modules/movie/components/MoviesList';
import { IconButton } from '@components/IconButton';
import { KeyboardView } from '@components/KeyboardView';
import { useDebounceValue } from '@hooks/useDebounceValue';
import { useGetFullInfoListQuery } from '@modules/movie/hooks/useGetFullInfoListQuery';

export default function App() {
  const { top } = useSafeAreaInsets();
  const [isVisible, setIsVisible] = useState(false);
  const [search, setSearch] = useState('');

  const debounceSearch = useDebounceValue(search, 500);
  const setAuthenticated = useStore((state) => state.setAuthenticated);

  const { onScroll, isScrolled } = useTopNavigationScroll();

  const {
    data: moviesInfo,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetListQuery();

  const shortMoviesInfo = useMemo(() => {
    return moviesInfo?.pages.flat();
  }, [moviesInfo]);

  const moviesIds = useMemo(
    () => shortMoviesInfo?.map((item) => item.id) || undefined,
    [shortMoviesInfo]
  );

  const moviesQuery = useGetFullInfoListQuery(moviesIds);

  const fullMoviesInfo = useMemo(() => {
    if (moviesQuery) {
      return moviesQuery.reduce(
        (acc, { data }) => (data ? [...acc, { ...data }] : acc),
        []
      );
    }
    return undefined;
  }, [moviesQuery]);

  const mappedData = useMemo(() => {
    if (debounceSearch) {
      const movies = !fullMoviesInfo?.length ? shortMoviesInfo : fullMoviesInfo;
      return movies?.filter(
        (item) =>
          item.title.toLowerCase().includes(debounceSearch.toLowerCase()) ||
          item.actors.some((actor) =>
            actor?.name.toLowerCase().includes(debounceSearch.toLowerCase())
          )
      );
    }

    return shortMoviesInfo;
  }, [fullMoviesInfo, shortMoviesInfo, debounceSearch]);

  const handleAddMovie = () => {
    setIsVisible(true);
  };

  const handleLogOut = () => {
    setAuthenticated(false);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Header
        title='Movies'
        isScrolled={isScrolled}
        containerStyle={styles.headerContainer}
      >
        <View style={styles.headerRowContainer}>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder='Search'
              leftIcon='search'
              size='small'
              value={search}
              onChange={handleSearchChange}
            />
          </View>
          <IconButton
            iconName='add'
            onPress={handleAddMovie}
            containerStyle={styles.iconButtonStyle}
          />
          <IconButton
            iconName='log-out'
            onPress={handleLogOut}
            containerStyle={styles.iconButtonStyle}
          />
        </View>
      </Header>
      <View style={styles.listContainer}>
        <MoviesList
          data={mappedData}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          onScroll={onScroll}
          isFetchingNextPage={isFetchingNextPage}
        />
        <KeyboardView />
      </View>

      <AddMovieModal isVisible={isVisible} onClose={handleCloseModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollViewContainer: {
    flex: 1,
    paddingTop: 20,
  },
  rowItem: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  headerRowContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    gap: 8,
  },
  searchContainer: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 16,
    flex: 1,
  },
  iconButtonStyle: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.darkAlternative,
  },
  headerContainer: {
    paddingHorizontal: 16,
  },
});
