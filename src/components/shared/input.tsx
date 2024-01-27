import React from 'react';
import theme, {Box, Text} from '@utils/theme';
import {TextInput} from 'react-native';

type InputProps = {
  label: string;
  error?: undefined;
};

const Input = ({label}: InputProps) => {
  return (
    <Box flexDirection="column">
      <Text variant="textXs" textTransform="uppercase" mb="3.5">
        {label}
      </Text>
      <TextInput
        style={{
          padding: 16,
          borderWidth: 1,
          borderColor: theme.colors.grey,
          borderRadius: theme.borderRadii['rounded-7xl'],
        }}
        placeholder={'EMAIL'}
      />
    </Box>
  );
};

export default Input;
