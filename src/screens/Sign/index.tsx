import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { color } from '../../theme/colors';

import {Input, Icon, Button} from 'react-native-elements'

import { styles } from './styles';



const Sign: React.FC = () => {

    const [visible, setVisible] = useState(true)
    

  return (
  
  <View style={{flex:1,justifyContent:'center',alignItems:"center",backgroundColor: color.background}}>
        <Input
        placeholderTextColor={color.primaryLight}
        placeholder='Email'
        style={{color: color.text}}
        leftIcon={
            <Icon
            name="email"
            size={24}
            type="material"
            color={color.primaryLight}
            />
        }
        />

        <Input
        placeholderTextColor={color.primaryLight}
        placeholder='Password'
        style={{color: color.text}}
        secureTextEntry={visible}
        leftIcon={
            <Icon
            name="lock"
            size={24}
            type="material"
            color={color.primaryLight}
            />
        }
        rightIcon={
            <Icon
            name={visible ? "eye":"eye-slash"}
            size={24}
            type="font-awesome"
            color={color.primaryDark}
            onPress={()=> setVisible(!visible)}
            />
        }
        />

        <Button
            title="entrar"
            containerStyle={{width:'90%'}}
            
            buttonStyle={{backgroundColor:color.secondaryLight}}

        />
        

        

  </View>
  
  
  );
}

export default Sign;