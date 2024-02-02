import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@shopify/restyle';
import {Box, Theme} from '@utils/theme';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const NavigationBack = () => {
  const navigation = useNavigation();
  const theme = useTheme<Theme>();
  const navigationBack = () => {
    navigation.goBack();
  };
  return (
    <TouchableOpacity onPress={navigationBack}>
      <Box bg="gray100" p="2" borderRadius="rounded-7xl">
        <Icon name="chevron-left" size={24} color={theme.colors.gray9} />
      </Box>
    </TouchableOpacity>
  );
};

export default NavigationBack;
