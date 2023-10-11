import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import Serch from '../../icons/Magnifier.svg';

interface inputProps {
    placeholder?: string
    onChange: (value: string) => void
}

const Input = ({placeholder, onChange}: inputProps) => {
    const [val, setVal] = React.useState('')
    
    return (
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.input}
                placeholder={placeholder || 'Начните вводить текст'}
                placeholderTextColor={'#fff'}
                value={val}
                onChangeText={(value) => {
                    setVal(value)
                    onChange(value)
                }}
            />
            <Serch stroke={'#fff'} />
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    inputContainer: {
      backgroundColor: '#5a5c66',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
    },
    input: {
        color: '#fff',
        flex: 1
    }
  });
  