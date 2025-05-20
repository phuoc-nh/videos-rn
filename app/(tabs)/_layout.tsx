import { Tabs } from 'expo-router'
import React from 'react'

// const TabIcon = ({ focused, title, icon }: { focused: boolean, title: string, icon: ImageSourcePropType }) => {
// 	if (focused) {

// 		return (
// 			<ImageBackground
// 				source={images.highlight}
// 				className='flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4  justify-center items-center rounded-full overflow-hidden'
// 			>
// 				<Image
// 					source={icon}
// 					className='size-5'
// 					tintColor={"#151312"}
// 				/>
// 				<Text className='text-secondary text-base font-semibold ml-2'>{title}</Text>
// 			</ImageBackground>
// 		)
// 	}

// 	return (
// 		<View className='size-full justify-center items-center mt-4 rounded-full'>
// 			<Image
// 				source={icon}
// 				className='size-5'
// 				tintColor={"#A8B5DB"}
// 			/>

// 		</View>
// 	)
// }

export default function _Layout() {
	return (
		<Tabs
		>
			<Tabs.Screen name="index"
				options={{
					title: 'Home',
					headerShown: false,
				}} />

		</Tabs>
	)
}