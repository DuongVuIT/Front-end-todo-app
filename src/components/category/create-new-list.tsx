import {CategoriesNavigationType} from '@navigation/types';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@shopify/restyle';
import {Box, Text, Theme} from '@utils/theme';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
const CreateNewList = () => {
  const navigation = useNavigation<CategoriesNavigationType>();
  const theme = useTheme<Theme>();
  const navigateToCreateCategory = () => {
    navigation.navigate('CreateCategory', {});
  };
  return (
    <TouchableOpacity onPress={navigateToCreateCategory}>
      <Box
        p="4"
        bg="lightGray"
        borderRadius="rounded-5xl"
        flexDirection="row"
        alignItems="center">
        <Icon name="plus" size={24} color={theme.colors.gray550} />
        <Text variant="textXl" fontWeight="600" color="gray650" ml="3">
          Create new list
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default CreateNewList;
