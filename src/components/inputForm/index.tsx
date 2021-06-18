import React, { useState } from 'react';
import { View, ViewStyle } from 'react-native';
import { FieldInputProps,FieldMetaProps } from "formik"
import {Input,InputProps} from 'react-native-elements'
import { color } from '~/theme/colors';

// import { Container } from './styles';


interface InputFormProps extends InputProps{
 error?:any
 editable?: boolean
 disabled?: boolean
}

const STYLES = {
    ERROR_STYLE: {
      color: color.errors,
    } as ViewStyle,
    NO_BORDER: {
      borderColor: "transparent"
    } as ViewStyle
    ,
    BORDER: {
      borderColor: color.secondaryLight
    } as ViewStyle
  }

const InputForm: React.FC<InputFormProps> = ({error,editable = true,disabled,...rest}) => {
    const [focused, setFocused] = useState(false)

    const Focus = () =>{
        setFocused(!focused)
    }

    const inputContainerStyle ={
        ...(focused ? editable && {borderColor: color.white} : !editable && {borderColor: "transparent"} )
    }

  return (
      <Input
        onFocus={Focus}
        onBlur={Focus}
        style={{color:color.white}}
        inputContainerStyle={inputContainerStyle}
        errorStyle={STYLES.ERROR_STYLE}
        editable={editable}
        errorMessage={error ? error : ""}
        disabled={disabled}
        {...rest}
      />
  );
}

export default InputForm;