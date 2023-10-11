import React from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import Input from '../components/input/input';
import Table from '../components/table/table';
import { useDispatch } from 'react-redux';
import { find } from '../store/actions';

const HomePage = () => {

    const dispatch = useDispatch();
    
    return (
        <View style={styles.container}>
            <Input placeholder='Поиск' onChange={(val: string) => dispatch(find(val))} />
            <Table />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: '12%',
        gap: 10
    },
  });
  

export default HomePage