import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { color } from '../../theme/colors';

import {Input, Icon, Button} from 'react-native-elements'
import { styles } from './styles';

import { useFormik, FormikProps } from "formik"
import * as Yup from 'yup'
import InputForm from '~/components/inputForm';
import { useNavigation } from '@react-navigation/native';

import {useAuth} from '~/hooks/auth'




const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Email Invalido'),
    password: Yup.string()
      .min(2, 'Muito curta!')
      .max(10, 'Muito Longa!')
  });

  interface SignInFormValues {
    email: string
    password: string
  }
  
export const SignIn: React.FC = () => {

  const [visible, setVisible] = useState(true)
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation()

  const {signIn} = useAuth()

  const initialValues: SignInFormValues = { email: "", password: "" }



  const accountLogin = useCallback (async(data: SignInFormValues) =>{
    setLoading(true)
    try {
       await signIn(data)
    } catch (e) {
     Alert.alert("","Credenciais inválidas")
    }
   setLoading(false)
  },[signIn])

    const {
       handleChange,
       handleSubmit,
       values,
       errors,
       isValid,
       resetForm,
      }: FormikProps<any> = useFormik({
        initialValues,
        validationSchema: SignInSchema,
        validateOnMount: true,
        onSubmit: values => new Promise(async () =>{
          console.log(values.email.toString().trim().toLowerCase(),values.password)
        
          accountLogin({email:values.email, password: values.password})
        })
      })

  useEffect(() => {
    
  }, [])
    
  return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

      <View style={styles.content}>
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

      <View style={{marginBottom:25, width:"95%"}}> 
              <InputForm
              placeholder="Email"
              placeholderTextColor={color.primaryLight}
              returnKeyType="next"
              returnKeyLabel="email"
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
              returnKeyLabel="password"
              placeholder='Password'
              placeholderTextColor={color.primaryLight}
              returnKeyType="done"
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
          
          </View>

            <Button
                title="ENTRAR"
                containerStyle={{width:'90%'}}
                onPress={handleSubmit}
                titleStyle={{color:color.background,fontSize:18, fontWeight:'bold'}}
                buttonStyle={{backgroundColor:color.secondaryLight}}
                loading={loading}
            />
            

            <TouchableOpacity style={{marginTop:20}} onPress={()=> navigation.navigate("SignUp")}>
                <Text style={{color:color.skyBlue, fontSize:18}}>Cadastre-se</Text>
            </TouchableOpacity>
            
        
    </KeyboardAvoidingView>
  </TouchableWithoutFeedback>
  
  );
}
