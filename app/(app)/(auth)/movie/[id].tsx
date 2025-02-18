import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import colors from '@src/theme/colors';
import { Image } from '@components/Image';
import { useGetMovieQuery } from '@modules/movie/hooks/useGetMovieQuery';
import { IconButton } from '@components/IconButton';
import { useDeleteMovieQuery } from '@modules/movie/hooks/useDeleteMovieQuery';
import { useEffect } from 'react';

export default function MovieDetailScreen() {
  const { top } = useSafeAreaInsets();
  const { canGoBack, back } = useRouter();
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const handlePressBackButton = () => {
    if (canGoBack()) {
      back();
    }
  };

  const { data: currentMovie } = useGetMovieQuery(id);

  const { deleteMovie, isSuccess, isError } = useDeleteMovieQuery();

  const handleConfirmDeletePress = () => {
    deleteMovie(id);
  };

  const handleDeleteIconPress = () =>
    Alert.alert(
      `Confirm Delete`,
      `Are you sure you want to delete the "${currentMovie?.title}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: handleConfirmDeletePress,
          style: 'destructive',
        },
      ]
    );

  useEffect(() => {
    if (isSuccess) {
      back();
    }
    if (isError) {
      Alert.alert('Error', 'An error occurred while deleting the movie.');
    }
  }, [isSuccess, isError]);

  return (
    <View style={styles.container}>
      <View
        style={[
          {
            top: top + 16,
          },
          styles.headerContainer,
        ]}
      >
        <IconButton iconName='arrow-back' onPress={handlePressBackButton} />
        <IconButton
          iconName='trash-outline'
          onPress={handleDeleteIconPress}
          iconColor={colors.primary}
        />
      </View>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <Image style={styles.imageStyle} />
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{currentMovie?.title}</Text>
          <Text style={styles.textBold}>
            Release date:{' '}
            <Text style={styles.textRegular}>{currentMovie?.year}</Text>
          </Text>
          {currentMovie?.actors?.length ? (
            <Text style={styles.textBold}>
              Stars:{' '}
              <Text style={styles.textRegular}>
                {currentMovie?.actors
                  .map((actor: string) => actor.name)
                  .join(', ')}
              </Text>
            </Text>
          ) : null}
          <Text style={styles.textBold}>
            Format:{' '}
            <Text style={styles.textRegular}>{currentMovie?.format}</Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    position: 'relative',
  },
  headerContainer: {
    position: 'absolute',
    height: 48,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    zIndex: 2,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  imageStyle: {
    width: '100%',
    height: '55%',
  },
  textWrapper: {
    padding: 16,
  },
  title: {
    color: colors.darkAlternative,
    fontFamily: 'NunitoSansBold',
    fontSize: 32,
    lineHeight: 42,
  },
  textBold: {
    color: colors.darkAlternative,
    fontFamily: 'NunitoSansBold',
    fontSize: 18,
    lineHeight: 24,
  },
  textRegular: {
    color: colors.darkAlternative,
    fontFamily: 'NunitoSansRegular',
    fontSize: 18,
    lineHeight: 24,
  },
});
