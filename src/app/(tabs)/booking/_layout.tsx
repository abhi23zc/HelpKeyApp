import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
  return (
   <Stack>
    <Stack.Screen name='booking' options={{
        headerShown:false
    }}/>
      <Stack.Screen name='GuestInfo' options={{
      headerShown:false
    }} />
    <Stack.Screen name='Payment' options={{
      headerShown:false
    }} />
   </Stack>
  )
}