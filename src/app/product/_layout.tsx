import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack>
        <Stack.Screen name="HotelReview" options={{headerShown:false}}/>
        <Stack.Screen name="[id]" options={{headerShown:false}}/>
        <Stack.Screen name="List" options={{headerShown:false}}/>
    </Stack>
  )
}