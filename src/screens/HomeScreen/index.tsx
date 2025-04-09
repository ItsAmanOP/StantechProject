import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loadItems, removeItem } from '../../store/itemsSlice';
import useCustomTheme, { ThemeProps } from '../../utils/theme';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import ListCard from './components/ListCard';

const HomeScreen = ({ navigation }) => {
  const items = useSelector(state => state.items);
  const dispatch = useDispatch();
  const { theme, styles } = useCustomTheme(getStyles);

  console.log('[Data] :', items)

  useEffect(() => {
    dispatch(loadItems());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Inventory</Text>
      </View>



      <View style={{ flex: 1, backgroundColor: "#f6f6f4", borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
        <View style={{flex: 1, marginTop: 14, borderTopLeftRadius: 32, borderTopRightRadius: 32, overflow: 'hidden' }}>
          <FlatList
            data={items}
            keyExtractor={item => item.toString()}
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingVertical: 8, paddingBottom: 88, overflow: 'hidden'}}
            renderItem={({ item }) => (
              <ListCard packageData={item}/>
              // <TouchableOpacity
              //   style={styles.item}
              //   onPress={() => navigation.navigate('AddEdit', { item })}
              // >
              //   <Text style={styles.title}>{item.name}</Text>
              //   <Text>{item.description}</Text>
              //   <Button title="Delete" onPress={() => dispatch(removeItem(item.id))} />
              // </TouchableOpacity>
            )}
          />
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.addEditButton}
        onPress={() => navigation.navigate('AddEdit')}
      >
         <Feather name="plus" size={24} color={theme.colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

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

export default HomeScreen;