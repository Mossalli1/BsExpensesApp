import * as React from 'react';
import {
  Button,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import {Styles} from './styles';
// import {FontSizee} from '@Constants';
// import FONTSIZE from '../../constants/fontSize';
import {FONTSIZE} from '@constants';
import dayjs from 'dayjs';

const AddExpenses = ({navigation}) => {
  // const date = new Date();
  // console.log('HomeScreen', date);
  const [load, setLoad] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [categoryName, setCategoryName] = React.useState('');

  const addCategory = async () => {
    if (categoryName !== '') {
      let dateTime = new Date();
      let categoryData = {
        espensesPurpose: '',
        amount: 0,
        category: categoryName,
        date: dateTime,
      };
      data.push(categoryData);
      setModalVisible(!modalVisible);
    } else {
      alert('Please enter category name');
    }
  };

  const renderExpensesCard = ({item}) => (
    <TouchableOpacity style={Styles.expenseCard}>
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
        <Text style={{fontSize: FONTSIZE.large}}>{item.amount}</Text>
      </View>
    </TouchableOpacity>
  );

  let totalExpensesAmount = data.reduce((total, obj) => obj.amount + total, 0);

  return (
    <View style={Styles.container}>
      <Text>AddExpenses</Text>
    </View>
  );
};

export default AddExpenses;
