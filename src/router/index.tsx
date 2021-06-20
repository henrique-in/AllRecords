import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'

import {PrivateRoutes} from './private.routes'
import {AuthRoutes} from './auth.routes'
import { useAuth } from '~/hooks/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SplashScreen from 'react-native-splash-screen'

export default function Routes() {
    const {user,loading} = useAuth()

    if(loading){
        
    }else{
        SplashScreen.hide();
    }

    return user ? <PrivateRoutes/> : <AuthRoutes/>
}
