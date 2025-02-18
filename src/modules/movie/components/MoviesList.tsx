import {
  ActivityIndicator,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Animated from 'react-native-reanimated';
import colors from '@src/theme/colors';
import { FlashList } from '@shopify/flash-list';
import { Image } from '@components/Image';
import { ShortMovie } from '@src/types/movie';
import { useCallback } from 'react';

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

type MoviesListProps = {
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  data: ShortMovie[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
};

export const MoviesList = ({
  onScroll,
  data,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}: MoviesListProps) => {
  const { bottom } = useSafeAreaInsets();
  const { navigate } = useRouter();

  const handlePressMovie = (id: string) => {
    navigate(`/movie/${id}`);
  };

  const handleEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={{ gap: 4 }}
        activeOpacity={0.8}
        onPress={() => {
          handlePressMovie(item.id);
        }}
      >
        <View style={{ position: 'relative' }}>
          <Image
            style={{
              width: '100%',
              height: 200,
              borderRadius: 12,
            }}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 12,
              left: 24,
              flexDirection: 'row',
              gap: 8,
            }}
          >
            <View
              style={{
                backgroundColor: colors.white70,
                borderRadius: 4,
                paddingVertical: 4,
                paddingHorizontal: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'NunitoSansBold',
                  color: colors.primary,
                }}
              >
                {item.format}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: colors.white70,
                borderRadius: 4,
                paddingVertical: 4,
                paddingHorizontal: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'NunitoSansBold',
                  color: colors.primary,
                }}
              >
                {item.year}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              color: colors.darkAlternative,
              fontFamily: 'NunitoSansBold',
              fontSize: 24,
              lineHeight: 32,
              letterSpacing: -0.4,
              fontWeight: '700',
            }}
          >
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    ),
    [handlePressMovie]
  );

  const renderFooter = useCallback(() => {
    return isFetchingNextPage ? (
      <View style={styles.fetchingContainer}>
        <ActivityIndicator size='large' />
      </View>
    ) : null;
  }, [isFetchingNextPage]);

  return (
    <AnimatedFlashList
      data={data}
      onScroll={onScroll}
      contentContainerStyle={{
        paddingTop: 16,
        paddingBottom: bottom + 16,
      }}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={styles.separatorStyles} />}
      renderItem={renderItem}
      onEndReached={handleEndReached}
      ListFooterComponent={renderFooter}
      estimatedItemSize={252}
      extraData={isFetchingNextPage}
    />
  );
};

const styles = StyleSheet.create({
  fetchingContainer: {
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separatorStyles: {
    height: 16,
  },
});
