import { StyleSheet, Image } from 'react-native';

type Props = { uri: string };
export const ImageViewer = (props: Props) => {
  const { uri } = props;

  return <Image source={{ uri }} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 340,
    borderRadius: 18,
  },
});
