import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack>
        <Stack.Screen name="HotelReview" options={{headerShown:false}}/>
        <Stack.Screen name="HotelScreen" options={{headerShown:false}}/>
        <Stack.Screen name="List" options={{headerShown:false}}/>
    </Stack>
  )
}