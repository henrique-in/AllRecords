import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../theme/colors';

import {Input, Icon, Button} from 'react-native-elements'
import { styles } from './styles';

import { useFormik, FormikProps } from "formik"
import * as Yup from 'yup'
import InputForm from '~/components/inputForm';

const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Email Invalido'),
    password: Yup.string()
      .min(2, 'Muito curta!')
      .max(10, 'Muito Longa!')
  });

  interface LoginFormValues {
    email: string
    password?: string
  }
  
const Sign: React.FC = () => {

    const [visible, setVisible] = useState(true)


  const initialValues: LoginFormValues = { email: "", password: "" }

    const {
       handleChange,
       handleSubmit,
       values,
       errors,
       isValid
      }: FormikProps<any> = useFormik({
        initialValues,
        validationSchema: SignInSchema,
        validateOnMount: true,
        onSubmit: values => new Promise(async () =>{
          console.log(values.email.toString().trim().toLowerCase(),values.password)
        })
      })
    
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

    
        <InputForm
        placeholder="Email"
        placeholderTextColor={color.primaryLight}
        leftIcon={
            <Icon
            name="email"
            size={24}
            type="material"
            color={color.primaryLight}
            />
        }
        error={errors.email}
        onChangeText={handleChange('email')}
        />

       <InputForm
        placeholder='Password'
        placeholderTextColor={color.primaryLight}
        secureTextEntry={visible}
        error={errors.password}
        onChangeText={handleChange('password')}
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
            onPress={handleSubmit}
            titleStyle={{color:color.background,fontSize:18, fontWeight:'bold'}}
            buttonStyle={{backgroundColor:color.secondaryLight}}
        />
        

        <TouchableOpacity style={{marginTop:20}} onPress={()=>{}}>
            <Text style={{color:color.skyBlue, fontSize:18}}>Cadastre-se</Text>
        </TouchableOpacity>
        
    
  </SafeAreaView>
  
  
  );
}

export default Sign;