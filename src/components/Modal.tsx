import { deviceWindow } from '@constants/layout';
import colors from '@src/theme/colors';
import React, { useEffect } from 'react';
import { Modal as ModalReact, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const DEFAULT_MAX_HEIGHT = deviceWindow.height * 0.8;

type ModalProps = {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  onDismiss?: () => void;
  maxHeight?: number;
};

export const Modal = ({
  isVisible,
  onClose,
  children,
  onDismiss,
  maxHeight = DEFAULT_MAX_HEIGHT,
}: ModalProps) => {
  const translateY = useSharedValue(deviceWindow.height);

  const closeModal = () => {
    onClose?.();
  };

  const modalSlideA = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withTiming(translateY.value, { duration: 500 }) },
      ],
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      translateY.value = 0;
    } else {
      translateY.value = deviceWindow.height;
    }
  }, [isVisible]);

  return (
    <>
      <ModalReact
        animationType='fade'
        visible={isVisible}
        transparent={true}
        onRequestClose={closeModal}
        onDismiss={onDismiss}
      >
        <View style={styles.backdrop} />
        <View style={styles.modalContainer}>
          <Pressable style={styles.backdropPressable} onPress={closeModal} />
          <Animated.View
            style={[
              styles.contentContainer,
              {
                maxHeight,
              },
              modalSlideA,
            ]}
          >
            {children}
          </Animated.View>
        </View>
      </ModalReact>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    backgroundColor: colors.dark70,
  },
  modalContainer: {
    zIndex: 2,
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdropPressable: {
    flex: 1,
  },
  contentContainer: {
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
});
