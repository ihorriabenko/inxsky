import { StyleSheet, Image, ScrollView } from 'react-native';

export const FeedScreen = () => {
  return (
    <ScrollView style={s.scroll}>
      <Image
        source={require('../../../assets/images/feed.jpeg')}
        resizeMode="stretch"
        style={s.image}
      />
      <Image
        source={require('../../../assets/images/feed.jpeg')}
        resizeMode="stretch"
        style={s.image}
      />
      <Image
        source={require('../../../assets/images/feed.jpeg')}
        resizeMode="stretch"
        style={s.image}
      />
      <Image
        source={require('../../../assets/images/feed.jpeg')}
        resizeMode="stretch"
        style={s.image}
      />
      <Image
        source={require('../../../assets/images/feed.jpeg')}
        resizeMode="stretch"
        style={s.image}
      />
    </ScrollView>
  );
};

const s = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 500,
    backgroundColor: '#fff',
  },
});
