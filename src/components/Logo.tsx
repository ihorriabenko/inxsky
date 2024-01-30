import { Image } from 'react-native';

type Props = {
  height?: number;
  width?: number;
};
export const Logo = (props: Props) => {
  const { height = 50, width = 50 } = props;

  return (
    <Image
      source={require('../../assets/images/logo.png')}
      style={{ width, height }}
    />
  );
};
