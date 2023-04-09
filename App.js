import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import React, { useContext, useEffect } from 'react'
import Playing from './src/components/playing/Playing'
import Context, { Provider } from './src/context/Context'
import { checkAuth } from './src/firebase/auth'
import TabNavigator from './src/navigation/navigation'
import LoginScreen from './src/screens/LoginScreen'

const LightTheme = {
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        background: 'white',
    },
}

function App() {
    const [login, setLogin] = React.useState(false)
    const ctx = useContext(Context)

    useEffect(() => {
        return checkAuth(setLogin, ctx)
    }, [])

    return login ? (
        <>
            <NavigationContainer theme={LightTheme}>
                <TabNavigator />
            </NavigationContainer>
        </>
    ) : (
        <LoginScreen />
    )
}

export default () => (
    <Provider>
        <App />
    </Provider>
)
