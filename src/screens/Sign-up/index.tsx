import { useNavigation } from '@react-navigation/native';
import { FormikProps, useFormik } from 'formik';
import React, { useState } from 'react';
import { Alert, SafeAreaView, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';

import * as Yup from 'yup'

import { Button, Icon } from 'react-native-elements';
import InputForm from '~/components/inputForm';
import { color } from '~/theme/colors';
import { styles } from '../Sign-up/styles';

import  * as request from '~/models/requests'



const SignUpSchema = Yup.object().shape({
    name:Yup.string().min(3,'Muito curto').required("Nome é obrigatório"),
    email: Yup.string().email('Email Invalido').required("Email é obrigatório"),
    password: Yup.string()
      .min(2, 'Muito curta!')
      .max(10, 'Muito Longa!')
      .required('Senha é obrigatório')
  });

  interface SignUpFormValues {
    name: string,
    email: string,
    password: string,
  }



export const SignUp: React.FC = () => {

    const navigation = useNavigation()

    const [visible, setVisible] = useState(true)
    const [loading, setLoading] = useState(false)


    const registerAccount = async(data: SignUpFormValues) => {
      setLoading(true)
      try {
        const result = await request.signUp(data)
        navigation.goBack()
      } catch (error) {
        Alert.alert("","Ocorreu um erro ao realizar o cadastro, tente novamente!")
      }
      setLoading(false)
    }
  
  
    const initialValues: SignUpFormValues = { name:"" ,email: "", password: "" }
  
      const {
         handleChange,
         handleSubmit,
         values,
         errors,
         isValid,
         resetForm,
        }: FormikProps<any> = useFormik({
          initialValues,
          validationSchema: SignUpSchema,
          validateOnMount: true,
          onSubmit: values => new Promise(async () =>{
            console.log(values.name,values.email.toString().trim().toLowerCase(),values.password)
            registerAccount({name:values.name,email:values.email ,password:values.password})
          })
        })
    
  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
          <Icon
          name="arrow-back"
          size={30}
          color={color.white}
          onPress={()=> navigation.goBack()}
          style={{marginLeft:20}}
          containerStyle={{width:'100%',alignItems:'flex-start'}}
          />

        <View style={styles.content}>
            <Icon
                name="assignment"
                size={120}
                color={color.secondaryLight}
                />
            </View>


      <View style={{width:"95%",marginBottom:20}}>

        <InputForm
        placeholder="Nome"
        returnKeyLabel="name"
        returnKeyType="next"
        placeholderTextColor={color.primaryLight}
        leftIcon={
            <Icon
            name="person"
            size={24}
            type="material"
            color={color.primaryLight}
            />
        }
        error={errors.name}
        onChangeText={handleChange('name')}
        />

        <InputForm
        placeholder="Email"
        returnKeyLabel="email"
        returnKeyType="next"
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
        returnKeyLabel="password"
        returnKeyType="done"
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
            title="CRIAR CONTA"
            containerStyle={{width:'90%', marginTop:20}}
            onPress={handleSubmit}
            titleStyle={{color:color.background,fontSize:18, fontWeight:'bold'}}
            buttonStyle={{backgroundColor:color.secondaryLight}}
            loading={loading}
        />


      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

