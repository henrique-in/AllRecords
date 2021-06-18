import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import App from './App';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaView} from 'react-native-safe-area-context'
import { color } from './theme/colors';

// import { Container } from './styles';

const Index: React.FC = () => {

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  return(
     <>
     <StatusBar barStyle='light-content' backgroundColor={color.background} />
     
     <App/>
     </>
     );
}


export default Index;
