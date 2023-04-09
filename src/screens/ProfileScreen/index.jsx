import { Avatar, IconButton } from '@react-native-material/core'
import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Dimensions, Pressable, Text, View } from 'react-native'
import Back from '../../../assets/svg/back_icon_reverse.svg'
import BellIcon from '../../../assets/svg/bell_icon.svg'
import Logout from '../../../assets/svg/logout.svg'
import { logout } from '../../firebase/auth'
import styles from './styles'

export default ProfileScreen = () => {
    const maxWidth = Dimensions.get('window').width
    const [pressed, setPressed] = React.useState(false)
    const navigation = useNavigation()

    return (
        <View style={styles.profileContainer}>
            <View style={styles.appBar}>
                <BellIcon
                    style={{ position: 'absolute', bottom: 5, right: 25 }}
                />
                <Text style={styles.screenTitle}>Home</Text>
            </View>
            <View style={{ height: 100 }}></View>
            <View
                style={{
                    width: maxWidth,
                    paddingHorizontal: 40,
                    height: 100,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Avatar
                        size={80}
                        image={require('../../../assets/thumbnail.png')}
                    />
                    <Text
                        style={{
                            marginLeft: 20,
                            fontSize: 20,
                            fontWeight: 'bold',
                        }}
                    >
                        Username
                    </Text>
                </View>
                <IconButton icon={<Logout />} onPress={() => logout()} />
            </View>
            <Pressable
                style={[styles.btn, pressed ? styles.pressed : null]}
                onPress={() => navigation.navigate('Your list')}
                onPressIn={() => setPressed(true)}
                onPressOut={() => setPressed(false)}
            >
                <Text style={styles.content}>Your list</Text>
                <Back />
            </Pressable>
        </View>
    )
}
