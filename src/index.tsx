import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import App from './App';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { color } from './theme/colors';

// import { Container } from './styles';




const Index: React.FC = () => {

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  return(
     <NavigationContainer >
        <StatusBar barStyle='light-content' backgroundColor={color.background} />
        <App/>
     </NavigationContainer>
     );
}


export default Index;
