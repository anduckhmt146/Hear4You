import * as React from 'react'
import { ScrollView, View } from 'react-native'
import InoGraphic from '../../../assets/svg/inographic.svg'
import Logo from '../../../assets/svg/logo.svg'
import Button from '../../components/button/Button'
import Input from '../../components/input/Input'
import Context from '../../context/Context'
import { signin } from '../../firebase/auth'
import styles from './styles'

const LoginScreen = () => {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const { setName, setRole, setUid } = React.useContext(Context)

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <InoGraphic />
            <View style={styles.logo}>
                <Logo />
            </View>
            <View style={styles.inputContainer}>
                <Input
                    placeholder='Email'
                    value={username}
                    onChangeText={(e) => setUsername(e)}
                />
                <Input
                    placeholder='Password'
                    value={password}
                    onChangeText={(e) => setPassword(e)}
                    secureTextEntry={true}
                />
            </View>
            <Button
                content='Log In'
                style={{ marginTop: 10, paddingVertical: 10 }}
                onPress={async () => {
                    const res = await signin({
                        email: username,
                        password: password,
                    })

                    if (res) {
                        console.log(res)
                        setName(res.name)
                        setRole(res.role)
                        setUid(res.userID)
                    }
                }}
            />
        </ScrollView>
    )
}

export default LoginScreen
