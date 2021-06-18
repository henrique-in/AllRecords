import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { color } from '../../theme/colors';

import {Input, Icon, Button} from 'react-native-elements'

import { styles } from './styles';



const Sign: React.FC = () => {

    const [visible, setVisible] = useState(true)
    

  return (
  
  <View style={{flex:1,justifyContent:'center',alignItems:"center",backgroundColor: color.background}}>
        <Icon
        name="assignment"
        size={120}
        color={color.secondaryLight}
        style={{paddingBottom:20}}
        />

        <Text 
        style={{
        color:color.secondaryLight,
        fontSize:28,
        fontWeight:'bold'
        }}>
        
        All Records
            
        
        </Text>
        
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
            title="Entrar"
            containerStyle={{width:'90%'}}
            titleStyle={{color:color.background,fontSize:18, fontWeight:'bold'}}
            buttonStyle={{backgroundColor:color.secondaryLight}}
        />
        
        <Button
            title="Cadastre-se"
            type="clear"
            containerStyle={{width:'90%', marginTop:20}}
            titleStyle={{color:color.secondaryLight,fontSize:18, fontWeight:'bold'}}
            
        />

        

  </View>
  
  
  );
}

export default Sign;