import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { loadItems } from '../../store/itemsSlice';
import useCustomTheme, { ThemeProps } from '../../utils/theme';
import Feather from 'react-native-vector-icons/Feather';
import ListCard from './components/ListCard';
import { useAppSelector } from '../../store/hooks';

const HomeScreen = ({ navigation }) => {
    const items = useAppSelector(state => state.items);
    const { theme, styles } = useCustomTheme(getStyles);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.heading}>Package Movers</Text>
            </View>

            <View style={styles.listWrapper}>
                <FlatList
                    data={items}
                    keyExtractor={item => item.id.toString()}
                    style={styles.flatListStyle}
                    contentContainerStyle={styles.contentContainerStyle}
                    renderItem={({ item }) => <ListCard packageData={item} />}
                />
            </View>

            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.addButton}
                onPress={() => navigation.navigate('AddEditScreen')}
            >
                <Feather name="plus" size={24} color={theme.colors.solids.white} />
            </TouchableOpacity>
        </View>
    );
};

const getStyles = (theme: ThemeProps) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    header: {
        padding: 16,
        alignItems: 'center'
    },
    heading: {
        fontFamily: theme.typography.fontFamily.extraBold,
        fontSize: theme.typography.fontSize.xxLarge.size,
        lineHeight: theme.typography.fontSize.xxLarge.lineHeight,
        color: theme.colors.text
    },
    flatListStyle: { 
        flex: 1 
    },
    contentContainerStyle: {
        paddingVertical: 8,
        paddingBottom: 88
    },
    listWrapper: {
        flex: 1,
        backgroundColor: theme.colors.overlay,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24
    },
    addButton: {
        padding: 16,
        position: 'absolute',
        bottom: 34,
        right: 16,
        borderRadius: 8,
        backgroundColor: theme.colors.solids.blue.fbDark
    }
});

export default HomeScreen;