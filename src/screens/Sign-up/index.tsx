import { useNavigation } from '@react-navigation/native';
import { FormikProps, useFormik } from 'formik';
import React, { useState } from 'react';
import { Alert, SafeAreaView, View } from 'react-native';

import * as Yup from 'yup'

import { Button, Icon } from 'react-native-elements';
import InputForm from '~/components/inputForm';
import { color } from '~/theme/colors';
import { styles } from '../Sign-up/styles';



const SignUpSchema = Yup.object().shape({
    nome:Yup.string().min(3,'Muito curto').required("Nome é obrigatório"),
    email: Yup.string().email('Email Invalido').required("Email é obrigatório"),
    password: Yup.string()
      .min(2, 'Muito curta!')
      .max(10, 'Muito Longa!')
      .required('Senha é obrigatório')
  });

  interface SignUpFormValues {
    nome: string,
    email: string,
    password?: string,
  }



export const SignUp: React.FC = () => {

    const navigation = useNavigation()

    const [visible, setVisible] = useState(true)


  
  
    const initialValues: SignUpFormValues = { nome:"" ,email: "", password: "" }
  
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
            console.log(values.nome,values.email.toString().trim().toLowerCase(),values.password)
            Alert.alert("","Conta criada com sucesso")
            navigation.goBack()
          })
        })
    
  return(
      <SafeAreaView style={styles.container}>
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

        <InputForm
        placeholder="Nome"
        placeholderTextColor={color.primaryLight}
        leftIcon={
            <Icon
            name="person"
            size={24}
            type="material"
            color={color.primaryLight}
            />
        }
        error={errors.nome}
        onChangeText={handleChange('nome')}
        />

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
            title="CRIAR CONTA"
            containerStyle={{width:'90%', marginTop:20}}
            onPress={handleSubmit}
            titleStyle={{color:color.background,fontSize:18, fontWeight:'bold'}}
            buttonStyle={{backgroundColor:color.secondaryLight}}
            
        />


      </SafeAreaView>
  );
}

