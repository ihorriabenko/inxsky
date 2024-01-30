import {StyleSheet, Text, View} from "react-native"

export const PostsScreen = () => {
  return (
    <View style={s.container}>
      <Text>Posts are expected :)</Text>
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})