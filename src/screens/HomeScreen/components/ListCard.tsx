import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useRef } from 'react'
import useCustomTheme, { ThemeProps } from '../../../utils/theme';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';
import { removeItem } from '../../../store/itemsSlice';
import { useAppDispatch } from '../../../store/hooks';

const StatusColor = {
    Waiting: { color: '#A0A0A0', backgroundColor: '#A0A0A010' },
    Loaded: { color: '#007BFF', backgroundColor: '#007BFF20' },
    Dispatched:	{ color: '#FFA500', backgroundColor: '#FFA50010' },
    Delivered: { color: '#28A745', backgroundColor: '#28A74520' }
} as const

const _ListCard = ({ packageData }) => {
    const navigation: any = useNavigation();
    const { theme, styles } = useCustomTheme(getStyles);
    const swipeableRef = useRef<Swipeable>(null);
    const dispatch = useAppDispatch();
    const { id, productName, vendorName, weight, status } = packageData;
    const { color, backgroundColor } = StatusColor[status];

    return (
        <Swipeable
            key={id}
            renderRightActions={(progress, dragX) => {
                const trans = dragX.interpolate({
                    inputRange: [-200, -80, 0],
                    outputRange: [10, 0, 90],
                });
                return (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.deleteButton, { transform: [{ translateX: trans }] }]}
                        onPress={() => {
                            swipeableRef?.current?.close();
                            dispatch(removeItem(id))
                        }}

                    >
                        <Feather name="trash-2" size={17} color={theme.colors.primary} />
                    </TouchableOpacity>
                )
            }}
            renderLeftActions={(progress, dragX) => {
                const trans = dragX.interpolate({
                    inputRange: [0, 80, 200],
                    outputRange: [-90, 0, -10],
                });
                return (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.editButton, { transform: [{ translateX: trans }] }]}
                        onPress={() => {
                            swipeableRef?.current?.close();
                            navigation.navigate('AddEditScreen', { editPackageData: packageData });
                        }}

                    >
                        <Feather name="edit-3" size={17} color={theme.colors.primary} />
                    </TouchableOpacity>
                )
            }}
        >
            <View style={styles.button}>
                <View style={styles.imageContainer}>
                    <MaterialCommunityIcons name="truck-fast-outline" size={34} color={theme.colors.solids.black} />
                </View>
                <View style={styles.detailsContainer}>
                    <View style={styles.row}>
                        <Text style={styles.itemName}>{productName}</Text>
                        <Text style={styles.itemName}>{weight}kg</Text>
                    </View>
                    <View style={styles.row}>
                        <View>
                            <Text style={styles.semiBoldText}>{vendorName}</Text>
                            <Text style={styles.regularText}>{`ID#${id}`}</Text>
                        </View>
                        <View style={[styles.status, { borderColor: color, backgroundColor }]}>
                            <Text style={[styles.statusText, { color }]}>{status}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Swipeable>
    )
}

const ListCard = memo(_ListCard);

export default ListCard;

const getStyles = (theme: ThemeProps) => StyleSheet.create({
    button: {
        flexDirection: 'row',
        margin: 8,
        padding: 8,
        borderRadius: 8,
        backgroundColor: theme.colors.background
    },
    itemName: {
        fontFamily: theme.typography.fontFamily.extraBold,
        fontSize: theme.typography.fontSize.regular.size,
        lineHeight: theme.typography.fontSize.regular.lineHeight,
        color: theme.colors.text
    },
    semiBoldText: {
        fontFamily: theme.typography.fontFamily.semiBold,
        fontSize: theme.typography.fontSize.regular.size,
        lineHeight: theme.typography.fontSize.regular.lineHeight,
        color: theme.colors.text,
        marginBottom: 4
    },
    statusText: {
        fontFamily: theme.typography.fontFamily.semiBold,
        fontSize: theme.typography.fontSize.small.size,
        lineHeight: theme.typography.fontSize.small.lineHeight,
        color: theme.colors.solids.blue.fbDark
    },
    imageContainer: {
        height: 64, 
        width: 64, 
        borderRadius: 6, 
        backgroundColor: theme.colors.solids.blue.light,
        justifyContent: 'center',
        alignItems: 'center' 
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 14,
        justifyContent: 'space-between'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    regularText: {
        fontFamily: theme.typography.fontFamily.regular,
        fontSize: theme.typography.fontSize.regular.size,
        lineHeight: theme.typography.fontSize.regular.lineHeight,
        color: theme.colors.text
    },
    status: {
        flexDirection: 'row',
        borderRadius: 50,
        borderWidth: 1.4,
        borderColor: theme.colors.solids.blue.dark,
        paddingVertical: 4,
        paddingHorizontal: 6,
    },
    deleteButton: {
        backgroundColor: theme.colors.solids.red.light,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 28,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        marginVertical: 8
    },
    editButton: {
        backgroundColor: theme.colors.solids.green.light,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 28,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        marginVertical: 8
    }
});