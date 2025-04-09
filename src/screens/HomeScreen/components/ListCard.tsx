import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import useCustomTheme, { ThemeProps } from '../../../utils/theme';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';

const ListCard = ({ packageData }) => {
    const navigation: any = useNavigation();
    const { theme, styles } = useCustomTheme(getStyles);
    const { id, productName, vendorName, weight, status } = packageData;

    return (
        <TouchableOpacity
            key={id}
            activeOpacity={0.8}
            style={styles.button}
            onPress={() => navigation.navigate('AddEdit', { editPackageData: packageData })}
        >
            <View style={{ height: 64, width: 64, borderRadius: 6, backgroundColor: theme.colors.solids.blue.light }} />
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
                    <View style={styles.status}>
                        <FontAwesome6 name="check" size={14} color={theme.colors.solids.blue.fbDark} style={{ marginRight: 6 }} />
                        <Text style={styles.statusText}>{status}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ListCard

const getStyles = (theme: ThemeProps) => StyleSheet.create({
    container: {
        flex: 1,
        // padding: 16,
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
    item: {
        padding: 16,
        marginVertical: 8,
        borderRadius: 8
    },
    title: { fontSize: 18, fontWeight: 'bold' },
    addEditButton: {
        padding: 16,
        position: 'absolute',
        bottom: 34,
        right: 16,
        borderRadius: 8,
        backgroundColor: theme.colors.solids.green.light
    },
    button: {
        flexDirection: 'row',
        margin: 8,
        padding: 8,
        borderRadius: 8,
        // borderWidth: 1.2,
        // borderColor: theme.colors.solids.grey.light,
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
    detailsContainer: {
        flex: 1,
        marginLeft: 14,
        justifyContent: 'space-between'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'red'
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
        // backgroundColor: theme.colors.solids.blue.light
        backgroundColor: "#C6DBF760"
    }
});