import NativeStackNavigation from './src/navigation/Navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <NativeStackNavigation />
    </SafeAreaProvider>
  );
}

