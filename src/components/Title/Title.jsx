import * as React from 'react'
import { Pressable, Text, View } from 'react-native'
import BackIcon from '../../../assets/svg/back_icon.svg'
import styles from './styles'

const Title = ({ title }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable>
                    <View style={styles.wrapper}>
                        <BackIcon />
                    </View>
                </Pressable>
                <Text style={styles.title}>{title}</Text>
                <View></View>
            </View>
        </View>
    )
}

export default Title
