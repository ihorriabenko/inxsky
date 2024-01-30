import { View, Text, StyleSheet } from 'react-native';
import { useAppSelector } from '../redux/redux.hook';
import { selectUsername } from '../redux/auth/auth.selector';

type Props = { sizeCircle: number; sizeText: number };
export const UserLogo = (props: Props) => {
  const { sizeCircle, sizeText } = props;
  const username = useAppSelector(selectUsername)[0];

  return (
    <>
      <View style={[s.container, { width: sizeCircle, height: sizeCircle }]}>
        <Text style={[s.username, {fontSize: sizeText}]}>{username}</Text>
      </View>
    </>
  );
};

const s = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 99,

    backgroundColor: '#FDB561',
  },
  username: {
    fontWeight: 'bold',

    color: '#fff',
  },
});
