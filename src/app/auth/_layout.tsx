import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name='Register' options={{
        headerShown: false
      }} />
      <Stack.Screen name='verify_email' options={{
        headerShown: false
      }} />
      <Stack.Screen name='verify_phone' options={{
        headerShown: false
      }} />
      <Stack.Screen name='Login' options={{
        headerShown: false
      }} />

      <Stack.Screen name='ForgotEmail' options={{
        headerShown: false
      }} />

      <Stack.Screen name='ForgotPhone' options={{
        headerShown: false
      }} />

      <Stack.Screen name='NewPassword' options={{
        headerShown: false
      }} />


    </Stack>
  )
}