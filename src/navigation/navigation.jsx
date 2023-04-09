import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useContext } from 'react'
import { View } from 'react-native'
import Navbar from '../components/navbar/Navbar'
import Playing from '../components/playing/Playing'
import Context from '../context/Context'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import MusicPlayer from '../screens/MusicPlayer'
import ProfileScreen from '../screens/ProfileScreen'
import QuestionForm from '../screens/QuestionFormScreen'
import UploadEpisodeScreen from '../screens/UploadEpisodeScreen'
import YourListScreen from '../screens/YourListScreen'

const Tab = createBottomTabNavigator()
const Home = createStackNavigator()
const Add = createStackNavigator()
const Profile = createStackNavigator()

const HomeStackCmp = () => {
    return (
        <>
            <Home.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Home.Screen name='Home' component={HomeScreen} />
                <Home.Screen name='Playing' component={MusicPlayer} />
            </Home.Navigator>
        </>
    )
}

const AddStackCmp = () => {
    const { role } = useContext(Context)

    return (
        <Add.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            {role === 'viewer' ? (
                <Add.Screen name='Add post' component={QuestionForm} />
            ) : (
                <Add.Screen name='Upload' component={UploadEpisodeScreen} />
            )}
        </Add.Navigator>
    )
}

const ProfileStackCmp = () => {
    return (
        <>
            <Profile.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Profile.Screen name='Profile' component={ProfileScreen} />
                <Profile.Screen name='Your list' component={YourListScreen} />
            </Profile.Navigator>
        </>
    )
}

function TabNavigator() {
    return (
        <>
            <Tab.Navigator
                tabBar={(props) => <Navbar {...props} />}
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Tab.Screen name='HomeCmp' component={HomeStackCmp} />
                <Tab.Screen name='AddCmp' component={AddStackCmp} />
                <Tab.Screen name='ProfileCmp' component={ProfileStackCmp} />
            </Tab.Navigator>
        </>
    )
}

export default TabNavigator
