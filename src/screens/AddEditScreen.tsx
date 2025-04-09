import React, { useState, useRef, useCallback } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { addItem, editItem } from '../store/itemsSlice';
import useCustomTheme, { ThemeProps } from '../utils/theme';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { useAppDispatch } from '../store/hooks';
import { sanitizePincode, sanitizeWeight, validatePincode } from '../utils';

const { height } = Dimensions.get('window');

const statuses = ['Loaded', 'Dispatched', 'Delivered', 'Waiting'] as const

const AddEditScreen = ({ navigation, route }) => {
    const { theme, styles } = useCustomTheme(getStyles);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const dispatch = useAppDispatch();
    const editPackageData = route.params?.editPackageData;
    const [packageData, setPackageData] = useState({
        productName: editPackageData?.productName || '',
        description: editPackageData?.description || '',
        vendorName: editPackageData?.vendorName || '',
        address: editPackageData?.address || '',
        pincode: editPackageData?.pincode ? String(editPackageData?.pincode) : '',
        weight: editPackageData?.weight ? String(editPackageData?.weight) : '',
        status: editPackageData?.status || 'Waiting'
    })
    const isValidePincode = validatePincode(packageData.pincode.trim());

    const isSaveButtonEnabled = !!packageData.productName.trim()
        && !!packageData.vendorName.trim()
        && !!packageData.address.trim()
        && isValidePincode
        && !!packageData.weight.trim()
        && !!packageData.status.trim()

    const handlePackageData = (key: keyof typeof packageData, value: string) => {
        setPackageData((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    const handleSave = () => {
        const payload = {
            id: editPackageData?.id,
            ...packageData,
            pincode: Number(packageData.pincode),
            weight: Number(packageData.weight)
        };

        if (editPackageData) {
            dispatch(editItem(payload));
        } else {
            dispatch(addItem(payload));
        }
        navigation.goBack();
    };

    const renderBackdrop = useCallback(
        (props) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
            />
        ),
        []
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.goBack()}
                >
                    <Feather name="arrow-left" size={24} color={theme.colors.primary} style={{ marginRight: 16 }} />
                </TouchableOpacity>
                <Text style={styles.heading}>{editPackageData ? 'Edit Package Details' : 'Add Package Details'}</Text>
            </View>

            <View style={styles.scrollViewWrapper}>
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    contentContainerStyle={styles.contentContainerStyle}
                >
                    <Text style={styles.fieldHeading}>Product Name</Text>
                    <TextInput
                        style={styles.inputText}
                        placeholder={'Enter product name'}
                        placeholderTextColor={theme.colors.secondaryText}
                        value={packageData.productName}
                        onChangeText={(text) => handlePackageData('productName', text)}
                    />

                    <Text style={styles.fieldHeading}>Description</Text>
                    <TextInput
                        style={styles.inputText}
                        placeholder={'Enter description'}
                        placeholderTextColor={theme.colors.secondaryText}
                        value={packageData.description}
                        onChangeText={(text) => handlePackageData('description', text)}
                    />

                    <Text style={styles.fieldHeading}>Vendor</Text>
                    <TextInput
                        style={styles.inputText}
                        placeholder={'Enter vendor name'}
                        placeholderTextColor={theme.colors.secondaryText}
                        value={packageData.vendorName}
                        onChangeText={(text) => handlePackageData('vendorName', text)}
                    />

                    <Text style={styles.fieldHeading}>Address</Text>
                    <TextInput
                        style={[styles.inputText, { minHeight: height * 0.16, textAlignVertical: 'top' }]}
                        placeholder={'Enter vendor address'}
                        placeholderTextColor={theme.colors.secondaryText}
                        value={packageData.address}
                        onChangeText={(text) => handlePackageData('address', text)}
                        multiline
                    />

                    <Text style={styles.fieldHeading}>Pincode</Text>
                    <TextInput
                        style={[styles.inputText, (!!packageData.pincode && !isValidePincode && { backgroundColor: theme.colors.solids.red.light})]}
                        placeholder={'Enter pincode'}
                        placeholderTextColor={theme.colors.secondaryText}
                        keyboardType={'numeric'}
                        value={packageData.pincode}
                        onChangeText={(text) => {
                            handlePackageData('pincode', sanitizePincode(text))
                        }}
                    />

                    <Text style={styles.fieldHeading}>{`Weight (in KG)`}</Text>
                    <TextInput
                        style={styles.inputText}
                        placeholder={'Enter weight'}
                        placeholderTextColor={theme.colors.secondaryText}
                        keyboardType={'numeric'}
                        value={packageData.weight}
                        onChangeText={(text) => handlePackageData('weight', sanitizeWeight(text))}
                    />

                    <Text style={styles.fieldHeading}>Package Status</Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={() => bottomSheetRef?.current?.expand()}
                    >
                        <Text style={styles.fieldHeading}>{packageData.status}</Text>
                        <Feather name="chevron-down" size={24} color={theme.colors.secondary} />
                    </TouchableOpacity>
                </ScrollView>
            </View>

            <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.saveButton, (!isSaveButtonEnabled && { backgroundColor: theme.colors.solids.grey.light })]}
                disabled={!isSaveButtonEnabled}
                onPress={handleSave}
            >
                <Text style={[styles.fieldHeading, { color: !isSaveButtonEnabled ? theme.colors.secondaryText : theme.colors.solids.white }]}>
                    {editPackageData ? 'Update' : 'Save'}
                </Text>
            </TouchableOpacity>

            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={['30%']}
                enablePanDownToClose
                backdropComponent={renderBackdrop}
            >
                <BottomSheetView style={styles.contentContainer}>
                    {statuses.map((_status) => (
                        <TouchableOpacity
                            key={_status}
                            activeOpacity={0.8}
                            style={styles.listButton}
                            onPress={() => {
                                bottomSheetRef.current?.close();
                                handlePackageData('status', _status);
                            }}
                        >
                            <MaterialIcons name={packageData.status === _status ? "radio-button-checked" : "radio-button-unchecked"} size={24} color={theme.colors.primary} style={{ marginRight: 8 }} />
                            <Text style={styles.fieldHeading}>{_status}</Text>
                        </TouchableOpacity>
                    ))

                    }
                </BottomSheetView>
            </BottomSheet>
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
        flexDirection: 'row',
        alignItems: 'center'
    },
    heading: {
        fontFamily: theme.typography.fontFamily.semiBold,
        fontSize: theme.typography.fontSize.large.size,
        lineHeight: theme.typography.fontSize.large.lineHeight,
        color: theme.colors.text
    },
    scrollViewWrapper: {
        backgroundColor: theme.colors.overlay,
        borderTopLeftRadius: 24, 
        borderTopRightRadius: 24, 
        paddingTop: 16 
    },
    contentContainerStyle: { 
        paddingVertical: 16, 
        paddingBottom: 124, 
        paddingHorizontal: 16 
    },
    fieldHeading: {
        fontFamily: theme.typography.fontFamily.medium,
        fontSize: theme.typography.fontSize.regular.size,
        lineHeight: theme.typography.fontSize.regular.lineHeight,
        color: theme.colors.text,
    },
    inputText: {
        fontFamily: theme.typography.fontFamily.regular,
        fontSize: theme.typography.fontSize.regular.size,
        color: theme.colors.text,
        backgroundColor: theme.colors.background,
        borderRadius: 8,
        marginTop: 8,
        marginBottom: 16,
        paddingHorizontal: 16
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.background,
        borderRadius: 8,
        marginTop: 8,
        marginBottom: 16,
        height: 50,
        paddingHorizontal: 16,
    },
    saveButton: {
        backgroundColor: theme.colors.solids.green.darkest,
        borderRadius: 50,
        alignItems: 'center',
        padding: 18,
        position: 'absolute',
        right: 18,
        left: 18,
        bottom: 20
    },
    contentContainer: {
        flex: 1
    },
    listButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default AddEditScreen;