import React, { useEffect, useState } from 'react';
import { Modal } from '@components/Modal';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';
import { TextInput } from '@components/TextInput';
import { View } from 'react-native';
import { Button } from '@components/Button';
import colors from '@src/theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import validationSchema from '@utils/validation';
import { useAddMovieQuery } from '@modules/movie/hooks/useAddMovieQuery';
import { IconButton } from '@components/IconButton';
import { ErrorMessage } from '@components/ErrorMessage';
import { Image } from '@components/Image';
import { KeyboardView } from '@components/KeyboardView';
import { deviceWindow } from '@constants/layout';
import { CreateMovieFormType } from '../types/form';

type AddMovieModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

export const AddMovieModal = ({ isVisible, onClose }: AddMovieModalProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { bottom } = useSafeAreaInsets();

  const handleDismiss = () => {
    setIsModalVisible(false);
  };

  const { addMovie, error, isSuccess } = useAddMovieQuery();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm<CreateMovieFormType>({
    defaultValues: {
      title: '',
      year: '',
      format: '',
    },
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'actors',
  });

  const addCastMember = () => {
    append({ value: '' });
  };

  const handleDeleteIconPress = (index: number) => {
    remove(index);
  };

  const handleAddMovie = async (values: CreateMovieFormType) => {
    if (isValid) {
      await addMovie({
        title: values.title,
        year: Number(values.year) || 0,
        format: values.format,
        actors: values.actors?.map((actor) => actor.value) || [],
      });
    }
  };

  useEffect(() => {
    if (isVisible) {
      setIsModalVisible(true);
    }
  }, [isVisible]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    } else if (isSuccess) {
      reset();
      onClose();
    }
  }, [error, isSuccess]);

  if (!isModalVisible) {
    return null;
  }

  return (
    <Modal isVisible={isVisible} onClose={onClose} onDismiss={handleDismiss}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <Image style={styles.headerImage} />
        <View style={styles.iconBack}>
          <IconButton
            iconName='arrow-back'
            onPress={onClose}
            iconColor={colors.primary}
          />
        </View>
        <View
          style={[
            styles.container,
            {
              paddingBottom: bottom + 16,
            },
          ]}
        >
          <Text style={styles.titleTypography}>Add a new movie</Text>
          <Controller
            name='title'
            control={control}
            rules={validationSchema.required}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                size='small'
                placeholder='Name'
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <ErrorMessage error={errors?.title} />
          <Controller
            name='year'
            control={control}
            rules={validationSchema.year}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                size='small'
                placeholder='Year'
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <ErrorMessage error={errors?.year} />
          <Controller
            name='format'
            control={control}
            rules={validationSchema.format}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                size='small'
                placeholder='Type'
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <ErrorMessage error={errors?.format} />
          <View style={styles.castContainer}>
            <Text style={styles.castTypography}>Cast:</Text>
            <IconButton iconName='add-circle' onPress={addCastMember} />
          </View>
          {fields.map((field, index) => (
            <View key={field.id} style={styles.castWrapper}>
              <View style={styles.castInputContainer}>
                <View style={styles.fullFill}>
                  <Controller
                    name={`actors.${index}.value`}
                    control={control}
                    rules={validationSchema.required}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        size='small'
                        placeholder='Cast member'
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                      />
                    )}
                  />
                </View>
                <IconButton
                  iconName='trash-outline'
                  onPress={() => handleDeleteIconPress(index)}
                  iconColor={colors.primary}
                />
              </View>
              <ErrorMessage error={errors?.actors?.[index]?.value} />
            </View>
          ))}
          <Button onPress={handleSubmit(handleAddMovie)} label='Add movie' />
        </View>
      </ScrollView>
      <KeyboardView containerStyle={styles.keyboardStyle} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: 200,
  },
  container: {
    width: '100%',
    padding: 16,
    backgroundColor: 'white',
    gap: 8,
  },
  titleTypography: {
    fontSize: 24,
    fontFamily: 'NunitoSansBold',
    color: colors.primary,
  },
  castContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  castTypography: {
    fontSize: 16,
    fontFamily: 'NunitoSansBold',
    color: colors.darkAlternative,
  },
  castWrapper: { gap: 8 },
  castInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fullFill: {
    flex: 1,
  },
  keyboardStyle: {
    backgroundColor: colors.white,
  },
  iconBack: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
});
