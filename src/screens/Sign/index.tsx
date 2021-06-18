import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../theme/colors';

import {Input, Icon, Button} from 'react-native-elements'
import { styles } from './styles';
import { RFValue } from 'react-native-responsive-fontsize';


const Sign: React.FC = () => {

    const [visible, setVisible] = useState(true)
    
  return (
  <SafeAreaView style={{flex:1,backgroundColor: color.background, alignItems:'center'}}>

    <View style={styles.container}>
      <Icon
        name="assignment"
        size={120}
        color={color.secondaryLight}
        style={{paddingBottom:20}}
        />
    
        <Text 
        style={styles.title}>
        
        All Records
    
        </Text>
    </View>

    
    
        
        <Input
        placeholderTextColor={color.primaryLight}
        placeholder='Email'
        style={{color: color.white}}
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
        style={{color: color.white}}
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
            color={color.secondaryLight}
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
        

        <TouchableOpacity style={{marginTop:20}}>
            <Text style={{color:color.skyBlue, fontSize:18}}>Cadastre-se</Text>
        </TouchableOpacity>
        
    
  </SafeAreaView>
  
  
  );
}

export default Sign;