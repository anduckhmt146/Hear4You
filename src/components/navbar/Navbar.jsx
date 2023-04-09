import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import AddIcon from '../../../assets/svg/add.svg'
import HomeActiveIcon from '../../../assets/svg/home_active.svg'
import HomeInactiveIcon from '../../../assets/svg/home_inactive.svg'
import ProfileActiveIcon from '../../../assets/svg/profile_active.svg'
import ProfileInactiveIcon from '../../../assets/svg/profile_inactive.svg'
import Context from '../../context/Context'
import Playing from '../playing/Playing'
import styles from './styles'

const Navbar = ({ state, descriptors, navigation }) => {
    return (
        <>
            <Playing />
            <View style={[styles.background]}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key]
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                            ? options.title
                            : route.name

                    const isFocused = state.index === index

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        })

                        if (!isFocused && !event.defaultPrevented) {
                            // The `merge: true` option makes sure that the params inside the tab screen are preserved
                            navigation.navigate({
                                name: route.name,
                                merge: true,
                            })
                        }
                    }

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        })
                    }

                    return (
                        <TouchableOpacity
                            key={route.key}
                            accessibilityRole='button'
                            accessibilityState={
                                isFocused ? { selected: true } : {}
                            }
                            accessibilityLabel={
                                options.tabBarAccessibilityLabel
                            }
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={styles.element}
                        >
                            {label === 'HomeCmp' ? (
                                isFocused ? (
                                    <HomeActiveIcon width={25} height={25} />
                                ) : (
                                    <HomeInactiveIcon width={25} height={25} />
                                )
                            ) : label === 'AddCmp' ? (
                                <AddIcon width={55} height={55} />
                            ) : isFocused ? (
                                <ProfileActiveIcon width={22} height={22} />
                            ) : (
                                <ProfileInactiveIcon width={22} height={22} />
                            )}
                        </TouchableOpacity>
                    )
                })}
            </View>
        </>
    )
}

export default Navbar
