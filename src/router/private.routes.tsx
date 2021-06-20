import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'

import {Dashboard } from '~/screens/index'



const Private = createStackNavigator()

export const PrivateRoutes = () => (
    <Private.Navigator
        screenOptions={{
            headerShown: false
        }}
        initialRouteName="Dashboard"
    >
        <Private.Screen name="Dashboard" component={Dashboard} />
     
    </Private.Navigator>
)

