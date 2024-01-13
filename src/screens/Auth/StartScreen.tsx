import { View, Text, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthButton } from '../../components';

export const StartScreen = () => {
  const inserts = useSafeAreaInsets();

  return (
    <View
      style={[
        s.container,
        {
          paddingTop: inserts.top,
          paddingBottom: inserts.bottom,
          backgroundColor: '#fff',
        },
      ]}
    >
      <View style={s.imageWrapper}>
        <Image
          style={s.image}
          source={require('../../../assets/images/logo.png')}
        />
        <Text style={s.title}>Freedom</Text>
        <Text style={s.subtitle}>Be free</Text>
      </View>
      <View style={[s.buttonsWrapper, { paddingBottom: inserts.bottom }]}>
        <View style={s.buttonsInnerWrapper}>
          <AuthButton
            navigate="SignUp"
            text="Create a new account"
            color="#fff"
            backgroundColor="#0085ff"
          />
          <View style={s.decorationWrapper}>
            <View style={s.decorationLine}></View>
            <Text style={s.decorationText}>or</Text>
            <View style={s.decorationLine}></View>
          </View>
          <AuthButton
            navigate="SignIn"
            text="Sign in"
            backgroundColor="#f3f3f8"
          />
        </View>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    alignItems: 'center',

    paddingBottom: 160,
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: 'transparent',
  },
  title: {
    marginBottom: 8,

    fontSize: 44,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
  },
  buttonsWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

    paddingHorizontal: 16,
  },
  buttonsInnerWrapper: {
    paddingBottom: 28,
  },
  decorationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
  },
  decorationLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#d2d2d7',
  },
  decorationText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
