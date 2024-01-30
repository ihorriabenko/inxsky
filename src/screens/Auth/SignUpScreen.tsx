import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthButton } from '../../components/AuthButton';
import { useAppDispatch } from '../../redux/redux.hook';
import { signUp } from '../../redux/auth/auth.action';

const initialUserState = {
  username: '',
  email: '',
  password: '',
};

export const SignUpScreen = () => {
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState(initialUserState);
  const dispatch = useAppDispatch();

  const handleInputChange = (key: string, value: string) => {
    setUser((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleFormSubmit = () => {
    dispatch(signUp(user));
    setUser(initialUserState);
  };

  return (
    <View style={s.container}>
      <View style={s.form}>
        <Text style={s.title}>Create your account</Text>
        <TextInput
          style={s.input}
          onChangeText={(value) => handleInputChange('username', value)}
          value={user.username}
          autoFocus
          placeholder="Username"
        />
        <TextInput
          style={s.input}
          onChangeText={(value) => handleInputChange('email', value)}
          value={user.email}
          placeholder="Email"
        />
        <TextInput
          style={s.input}
          onChangeText={(value) => handleInputChange('password', value)}
          value={user.password}
          secureTextEntry={true}
          placeholder="Password"
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : 0}
      >
        <View style={{ paddingBottom: insets.bottom }}>
          <AuthButton
            navigate="SignUp"
            onPress={handleFormSubmit}
            text="Sign up"
            color="#fff"
            backgroundColor="#0085ff"
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',

    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 16 : 0,
    paddingBottom: Platform.OS === 'android' ? 16 : 0,

    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 20,

    fontSize: 25,
    fontWeight: '700',
  },
  form: {
    marginBottom: 20,

    width: '100%',
  },
  input: {
    padding: 16,
    marginBottom: 8,

    borderBottomWidth: 1,
    borderBottomColor: '#d2d2d7',
  },
});
