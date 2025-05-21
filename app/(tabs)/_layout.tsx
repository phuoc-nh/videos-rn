import { Tabs } from 'expo-router'
import React from 'react'


export default function _Layout() {
	return (
		<Tabs>
			<Tabs.Screen name="index"
				options={{
					title: 'Home',
					headerShown: false,
				}} />
		</Tabs>
	)
}