import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Styles} from './styles';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/MaterialIcons';

let data = [];
var filterCategory = [];
var uniqueFilterCategory = [];

const ExpensesLog = ({navigation}) => {
  const [filterStatus, setFilterStatus] = React.useState(false);
  const [filterValue, setFilterValue] = React.useState('');
  const getFromRedux = useSelector(state => state.expenses);
  data = getFromRedux.value.length > 0 ? JSON.parse(getFromRedux.value) : [];

  let newItems = data.map(item => {
    return {
      ...item,
      subTotal: item.expenses.reduce((acc, curr) => curr.amount + acc, 0),
    };
  });

  let allData = [];
  newItems.forEach(item => {
    item.expenses.forEach(exp => {
      allData.push(exp);
    });
  });

  let itemsWithoutZeroAmount = allData.filter(items => items.amount !== 0);
  let itemsWithFiltered = itemsWithoutZeroAmount.filter(
    items => items.category === filterValue,
  );
  let totalExpensesAmount = newItems.reduce(
    (total, obj) => obj.subTotal + total,
    0,
  );
  const openFilterModal = () => {
    itemsWithoutZeroAmount.forEach(items => {
      filterCategory.push(items.category);
    });
    uniqueFilterCategory = [...new Set(filterCategory)];
    setFilterStatus(!filterStatus);
  };

  const filterAction = selectedValue => {
    setFilterValue(selectedValue);

    setFilterStatus(!filterStatus);
  };

  const clearFilter = () => {
    setFilterValue('');
    setFilterStatus(false);
  };

  const renderAllExpensesLogCard = ({item}) => (
    <View style={Styles.expenseCard}>
      <View style={{maxWidth: '70%'}}>
        <Text style={{fontSize: FONTSIZE.large}}>{item.espensesPurpose}</Text>
        <Text style={{fontSize: FONTSIZE.small}}>
          {dayjs(item.date).format('DD MMM, YYYY')}
        </Text>
        <Text style={{fontSize: FONTSIZE.small}}>
          {dayjs(item.date).format('hh:mm A')}
        </Text>
      </View>
      <View style={{maxWidth: '30%'}}>
        <Text style={{fontSize: FONTSIZE.large}}>{item.amount}</Text>
      </View>
    </View>
  );

  return (
    <View style={Styles.container}>
      <View style={Styles.filterContainer}>
        <View style={Styles.filterTextContainer}>
          {filterValue !== '' && (
            <TouchableOpacity
              style={{paddingHorizontal: 10, paddingVertical: 5}}
              onPress={() => clearFilter()}>
              <Icon name="clear" size={16} color="#00000080" />
            </TouchableOpacity>
          )}

          <Text style={{fontSize: 16}}>{filterValue}</Text>
        </View>
        <TouchableOpacity
          style={{paddingHorizontal: 5, paddingVertical: 5}}
          onPress={() => openFilterModal()}>
          <Icon name="filter-list" size={30} color="#00000080" />
        </TouchableOpacity>
      </View>
      <View style={{height: 20}} />
      <FlatList
        data={filterValue !== '' ? itemsWithFiltered : itemsWithoutZeroAmount}
        renderItem={renderAllExpensesLogCard}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={Styles.emptyListContainer}>
            <Text>No Expenses Log Found! </Text>
          </View>
        )}
      />
      <View style={{height: 20}} />
      <View style={Styles.totalAmountContainer}>
        <Text style={{fontSize: FONTSIZE.large}}>
          All Expenses Amount :{'  '}
        </Text>
        <Text style={{fontSize: 28, fontWeight: 'bold'}}>
          {totalExpensesAmount}
        </Text>
      </View>
      <View style={{height: 30}} />

      {/* // Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterStatus}
        hardwareAccelerated={true}
        onRequestClose={() => {
          setFilterStatus(!filterStatus);
        }}>
        <View style={Styles.modalContainer}>
          <View style={Styles.modalItemContainer}>
            <View style={Styles.filteredItemContainer}>
              {uniqueFilterCategory.map((item, key) => (
                <TouchableOpacity
                  key={key}
                  style={Styles.filteredItemButton}
                  onPress={() => {
                    filterAction(item);
                  }}>
                  <Text style={{fontSize: 16}}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={Styles.modalButtonContainer}>
              <Button
                onPress={() => setFilterStatus(!filterStatus)}
                title="Cancel"
              />
              <Button onPress={() => addCategory()} title="Filter" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ExpensesLog;
