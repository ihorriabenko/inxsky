import { useNavigation } from '@react-navigation/native';
import { Text, StyleSheet, Pressable, Keyboard } from 'react-native';

type Props = {
  navigate: 'SignUp' | 'SignIn';
  onPress?: () => void;
  text: string;
  color?: string;
  backgroundColor?: string;
};
export const AuthButton = (props: Props) => {
  const { navigate, onPress, text, color, backgroundColor } = props;
  const navigation = useNavigation();

  return (
    <Pressable
      style={({ pressed }) => [
        s.button,
        { backgroundColor, opacity: pressed ? 0.7 : 1 },
      ]}
      onPress={() => {
        if (onPress) onPress()
        navigation.navigate(navigate)
      }}
    >
      <Text style={[s.text, { color }]}>{text}</Text>
    </Pressable>
  );
};

const s = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: 16,

    borderRadius: 30,
  },
  text: {
    fontSize: 19,
  },
});
