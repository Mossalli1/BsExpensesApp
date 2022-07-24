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

const ExpensesLog = ({navigation}) => {
  const [expences, setExpences] = React.useState('');
  const dispatch = useDispatch();
  const saveOnRedux = async () => {
    // setExpences(amount);
    dispatch(setExpensesValue(expences));
  };

  const getFromRedux = useSelector(state => state.expenses);
  console.log('ExpencesLog', getFromRedux);

  const data = [
    {
      espensesPurpose: 'Bought rice',
      amount: 100,
      category: 'Food',
      date: '2022-07-23T17:06:31.635Z',
    },
    {
      espensesPurpose: 'Current bill payment',
      amount: 120,
      category: 'Home rent',
      date: '2022-07-23T17:07:31.635Z',
    },
    {
      espensesPurpose: 'Home rent payment',
      amount: 120,
      category: 'Home rent',
      date: '2022-07-23T17:07:31.635Z',
    },
  ];
  let totalExpensesAmount = data.reduce((total, obj) => obj.amount + total, 0);

  const renderAllExpensesLogCard = ({item}) => (
    <View style={Styles.expenseCard}>
      <View style={{maxWidth: '70%'}}>
        <Text style={{fontSize: FONTSIZE.large}}>{item.category}</Text>
        <Text style={{fontSize: FONTSIZE.small}}>
          {dayjs(item.date).format('DD MMM, YYYY')}
        </Text>
        <Text style={{fontSize: FONTSIZE.small}}>
          {dayjs(item.date).format('hh:mm A')}
        </Text>
      </View>
      <View style={{maxWidth: '30%'}}>
        <Text style={{fontSize: FONTSIZE.large}}>120</Text>
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
        data={data}
        renderItem={renderAllExpensesLogCard}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
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

      {/* <Text>Amount : {getFromRedux.value}</Text>
      <TextInput
        style={{backgroundColor: 'red', width: 200}}
        onChangeText={item => setExpences(item)}
      />
      <Button onPress={() => navigation.goBack()} title="Go back home" />
      <Button onPress={() => saveOnRedux()} title="Save" /> */}
    </View>
  );
};

export default ExpensesLog;
