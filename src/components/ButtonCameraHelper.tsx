import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = { name: keyof typeof Ionicons.glyphMap; onPress: () => void };
export const ButtonCameraHelper = (props: Props) => {
  const { name, onPress } = props;

  return (
    <Pressable
      style={({ pressed }) => [
        {
          width: 35,
          height: 35,
          backgroundColor: 'grey',
          borderRadius: 99,
          opacity: pressed ? 0.4 : 0.7,
        },
      ]}
      onPress={onPress}
    >
      <Ionicons name={name} size={34} color="white" />
    </Pressable>
  );
};
