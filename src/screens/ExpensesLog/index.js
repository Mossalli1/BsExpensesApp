import * as React from 'react';
import {
  Button,
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setExpensesValue} from '../../redux/reducers/expenses';
import {Styles} from './styles';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/MaterialIcons';

let data = [];

const ExpensesLog = ({navigation}) => {
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
  let totalExpensesAmount = newItems.reduce(
    (total, obj) => obj.subTotal + total,
    0,
  );

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
          <TouchableOpacity style={{paddingHorizontal: 10, paddingVertical: 5}}>
            <Icon name="clear" size={16} color="#00000080" />
          </TouchableOpacity>
          <Text style={{fontSize: 16}}>Home</Text>
        </View>
        <TouchableOpacity>
          <Icon name="filter-list" size={30} color="#00000080" />
        </TouchableOpacity>
      </View>
      <View style={{height: 20}} />
      <FlatList
        data={itemsWithoutZeroAmount}
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
    </View>
  );
};

export default ExpensesLog;
