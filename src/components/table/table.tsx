import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, goToPage, sortById, sortByTitle, sortByBody, find } from '../../store/actions';

const Table = () => {
    const [filter, setFilter] = React.useState('Id')
    const [paginationSelected, setPaginationSelected] = React.useState(0)

    const dispatch = useDispatch();
    const selectedPage = useSelector((state: any) => state.postsReducer.selectedPage);
    const pagesCount = useSelector((state: any) => state.postsReducer.pagesCount);
    const findPage = useSelector((state: any) => state.postsReducer.findPage);
    
    function getData() {
        if (selectedPage.length === 0)
        {
            dispatch(getPosts())
        }
    }

    function goNext() {
        paginationSelected + 1 < pagesCount.length && goTo(paginationSelected + 1)
    }

    function goPrev() {
        paginationSelected - 1 >= 0 && goTo(paginationSelected - 1)
    }

    function goTo(id: number) {
        dispatch(goToPage(id))
        setPaginationSelected(id)
        reFilter()
    }

    const RenderComponent = ({item}: any) => {
        return (
            <View style={styles.row}>
                <View style={[styles.cellId, styles.cell]}>
                    <Text>{item.id}</Text>
                </View>
                <View style={[styles.cellTitle, styles.cell]}>
                    <Text>{item.title}</Text>
                </View>
                <View style={[styles.cellDescription, styles.cell]}>
                    <Text>{item.body}</Text>
                </View>
            </View>
        )
    }

    function setFilterColumn(col: string) {
        if (col === filter) {
            setFilter(`${col}Reverse`)
            switch (col) {
                case 'Id':
                    dispatch(sortById('reverse'))
                    break;
                case 'Title':
                    dispatch(sortByTitle('reverse'))
                    break;
                case 'Body':
                    dispatch(sortByBody('reverse'))
                    break;
                default: 
                    return
            }
        } else {
            setFilter(col)
            switch (col) {
                case 'Id':
                    dispatch(sortById('normal'))
                    break;
                case 'Title':
                    dispatch(sortByTitle('normal'))
                    break;
                case 'Body':
                    dispatch(sortByBody('normal'))
                    break;
                default: 
                    return
            }
        }
    }

    function reFilter() {
        switch (filter) {
            case 'Id':
                dispatch(sortById('normal'))
                break;
            case 'Title':
                dispatch(sortByTitle('normal'))
                break;
            case 'Body':
                dispatch(sortByBody('normal'))
                break;
            case 'IdReverse':
                dispatch(sortById('reverse'))
                break;
            case 'TitleReverse':
                dispatch(sortByTitle('reverse'))
                break;
            case 'BodyReverse':
                dispatch(sortByBody('reverse'))
                break;
            default: 
                return
        }
    }

    return (
        <View style={styles.mainFrame}>
            <View style={styles.table} onLayout={getData}>
                <View style={[styles.row, styles.headerRow]}>
                    <Pressable style={[styles.cellId, styles.cell]} onPress={() => setFilterColumn('Id')} >
                        <Text style={styles.headerCell}>ID
                            <View style={filter === 'Id' && {transform: [{rotate: '0deg'}]} || filter === 'IdReverse' && {transform: [{rotate: '180deg'}]}}>
                                <Text style={styles.headerCell}>^</Text>
                            </View>
                        </Text>
                    </Pressable>
                    <Pressable style={[styles.cellTitle, styles.cell]} onPress={() => setFilterColumn('Title')} >
                        <Text  style={styles.headerCell}>Заголовок
                            <View style={filter === 'Id' && {transform: [{rotate: '0deg'}]} || filter === 'TitleReverse' && {transform: [{rotate: '180deg'}]}}>
                                <Text style={styles.headerCell}>^</Text>
                            </View>
                        </Text>
                    </Pressable>
                    <Pressable style={[styles.cellDescription, styles.cell]} onPress={() => setFilterColumn('Body')} >
                        <Text  style={styles.headerCell}>Описание 
                            <View style={filter === 'Id' && {transform: [{rotate: '0deg'}]} || filter === 'BodyReverse' && {transform: [{rotate: '180deg'}]}}>
                                <Text style={styles.headerCell}>^</Text>
                            </View>
                        </Text>
                    </Pressable>
                </View>
                {findPage[0]?.error ? 
                    <Text style={styles.error}>{findPage[0].error}</Text>
                :
                    <FlatList
                        data={findPage.length === 0 ? selectedPage : findPage}
                        renderItem={RenderComponent}
                        keyExtractor={(item, index) => index.toString()}
                    />
                }
            </View>
            <View style={styles.paginationRow}>
                <Pressable onPress={goPrev}>
                    <Text>Назад</Text>
                </Pressable>
                <FlatList
                    horizontal
                    contentContainerStyle={styles.paginationContainer}
                    data={pagesCount}
                    renderItem={(({item, index}) => {
                        return index <= paginationSelected + 4 &&
                        index >= paginationSelected - 4 &&
                        <View style={styles.pagination}>
                            {index === paginationSelected - 4 && paginationSelected >= 5 && 
                                <>
                                    <Pressable 
                                        style={styles.paginationItem} onPress={() => goTo(0)} >
                                            <Text style={paginationSelected === index &&{color: '#00dbff'}}>{1}</Text>
                                    </Pressable>
                                    {paginationSelected >= 6 && <Text>...</Text>}
                                </>
                            }
                            <Pressable 
                                style={styles.paginationItem} onPress={() => goTo(index)} >
                                    <Text style={paginationSelected === index &&{color: '#00dbff'}}>{index + 1}</Text>
                            </Pressable>
                            {index === paginationSelected + 4 && paginationSelected <= 4 && 
                                <>
                                    {paginationSelected <= 3 && <Text>...</Text>}
                                    <Pressable 
                                        style={styles.paginationItem} onPress={() => goTo(9)} >
                                            <Text style={paginationSelected === index &&{color: '#00dbff'}}>{10}</Text>
                                    </Pressable>
                                </>
                            }
                        </View>
                    })}
                    keyExtractor={(item, index) => index.toString()}
                />
                <Pressable onPress={goNext}>
                    <Text>Далее</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Table

const styles = StyleSheet.create({
    mainFrame: {
        maxHeight: '80%'
    },
    table: {
        display: 'flex',
        borderWidth: 0.5,
        borderColor: 'grey',
    },
    row: {
        display: 'flex',
        flexDirection: 'row'
    },
    headerRow: {
        backgroundColor: '#5a5c66'
    },
    cell: {
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'grey',
    },
    headerCell: {
        color: '#fff'
    },
    cellId: {
        width: '12%',
    },
    cellTitle: {
        width: '26%',
    },
    cellDescription: {
        width: '62%',
    },
    paginationRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    pagination: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    paginationContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    paginationItem: {
        padding: 10,
        color: '#fff',
    },
    error: {
        textAlign: 'center',
        paddingVertical: 20
    }
  });
  