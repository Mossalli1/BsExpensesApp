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
import {useDispatch, useSelector} from 'react-redux';
import {setExpensesValue} from '../../redux/reducers/expenses';

let data = [
  // {
  //   espensesPurpose: 'Bought',
  //   amount: 100,
  //   category: 'Food',
  //   date: '2022-07-23T17:06:31.635Z',
  // },
  // {
  //   espensesPurpose: 'Current bill payment',
  //   amount: 120,
  //   category: 'Home rent',
  //   date: '2022-07-23T17:07:31.635Z',
  // },
  // {
  //   espensesPurpose: 'House tutoring',
  //   amount: 120,
  //   category: 'Childs education',
  //   date: '2022-07-23T17:07:31.635Z',
  // },
];

// let newData = [
//   {
//     category: 'Food',
//     date: '2022-07-23T17:06:31.635Z',
//     expenses: [
//       {
//         category: 'Food',
//         espensesPurpose: 'Current bill payment',
//         amount: 100,
//         date: '2022-07-23T17:07:31.635Z',
//       },
//       {
//         category: 'Food',
//         espensesPurpose: 'Current bill payment 3',
//         amount: 100,
//         date: '2022-07-23T17:07:31.635Z',
//       },
//     ],
//   },
//   {
//     category: 'Home rent',
//     date: '2022-07-23T17:07:31.635Z',
//     expenses: [
//       {
//         category: 'Home rent',
//         espensesPurpose: 'Current bill payment',
//         amount: 100,
//         date: '2022-07-23T17:07:31.635Z',
//       },
//       {
//         category: 'Home rent',
//         espensesPurpose: 'Current bill payment 3',
//         amount: 100,
//         date: '2022-07-23T17:07:31.635Z',
//       },
//     ],
//   },
//   {
//     category: 'Childs education',
//     date: '2022-07-23T17:07:31.635Z',
//     expenses: [
//       {
//         category: 'Childs education',
//         espensesPurpose: 'Current bill payment',
//         amount: 100,
//         date: '2022-07-23T17:07:31.635Z',
//       },
//       {
//         category: 'Childs education',
//         espensesPurpose: 'Current bill payment 3',
//         amount: 100,
//         date: '2022-07-23T17:07:31.635Z',
//       },
//     ],
//   },
// ];

let newData = [];

const HomeScreen = ({navigation}) => {
  // const date = new Date();
  // console.log('HomeScreen', date);
  const [load, setLoad] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [addExpensesModalVisible, setAddExpensesModalVisible] =
    React.useState(false);
  const [categoryName, setCategoryName] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [expensesPurpose, setExpensesPurpose] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('');

  var dateTime = new Date();
  const dispatch = useDispatch();

  //save data to redux
  const saveOnRedux = async () => {
    // setExpences(amount);
    dispatch(setExpensesValue(JSON.stringify(newData)));
  };

  //get data from redux
  const getFromRedux = useSelector(state => state.expenses);
  console.log('getFromRedux', getFromRedux);
  newData = JSON.parse(getFromRedux.value);

  const addCategory = async () => {
    if (categoryName !== '') {
      let categoryData = {
        category: categoryName,
        date: dateTime,
        expenses: [
          {
            category: 'categoryName',
            espensesPurpose: '',
            amount: 0,
            date: dateTime,
          },
        ],
      };
      newData.push(categoryData);
      saveOnRedux();
      setModalVisible(!modalVisible);
    } else {
      alert('Please enter category name');
    }
  };

  const addExpenses = async () => {
    // console.log('selectedCategory', selectedCategory);
    if (expensesPurpose !== '' && amount !== '') {
      let expensesData = {
        category: selectedCategory,
        espensesPurpose: expensesPurpose,
        amount: parseInt(amount),
        date: dateTime,
      };
      newData.map(item => {
        item.category === selectedCategory && item.expenses.push(expensesData);
      }),
        saveOnRedux();
      setAddExpensesModalVisible(!addExpensesModalVisible);
    } else {
      alert('Please enter all fields');
    }
  };

  const openAddExpensesModal = async category => {
    setAddExpensesModalVisible(!addExpensesModalVisible);
    setSelectedCategory(category);
  };

  const renderExpensesCard = ({item}) => {
    console.log('renderExpensesCard', item);
    return (
      <TouchableOpacity
        style={Styles.expenseCard}
        onPress={() => openAddExpensesModal(item.category)}>
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
          <Text style={{fontSize: FONTSIZE.large}}>{item.subTotal}</Text>
          <Text
            style={{fontSize: FONTSIZE.large, color: '#007AFF', paddingTop: 5}}>
            Add
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  let newItems = newData.map(item => {
    return {
      ...item,
      subTotal: item.expenses.reduce((acc, curr) => curr.amount + acc, 0),
    };
  });

  let totalExpensesAmount = newItems.reduce(
    (total, obj) => obj.subTotal + total,
    0,
  );

  return (
    <View style={Styles.container}>
      <View style={Styles.totalAmountContainer}>
        <Text style={{fontSize: FONTSIZE.large}}>
          All Expenses Amount :{'  '}
        </Text>
        <Text style={{fontSize: 28, fontWeight: 'bold'}}>
          {totalExpensesAmount}
        </Text>
      </View>
      <View style={{height: 20}} />
      <FlatList
        data={newItems}
        renderItem={renderExpensesCard}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity
        style={Styles.buttonStyle}
        onPress={() => setModalVisible(!modalVisible)}>
        <Text style={{fontSize: FONTSIZE.large, color: '#fff'}}>
          Add Category
        </Text>
      </TouchableOpacity>

      {/* // Add Category Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        hardwareAccelerated={true}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={Styles.modalContainer}>
          <View style={Styles.modalItemContainer}>
            <TextInput
              style={{height: 40, margin: 12, borderWidth: 1, padding: 10}}
              placeholder="Category Name"
              placeholderTextColor="#00000070"
              value={categoryName}
              onChangeText={text => setCategoryName(text)}
            />
            <View style={Styles.modalButtonContainer}>
              <Button
                onPress={() => setModalVisible(!modalVisible)}
                title="Cancel"
                // accessibilityLabel="Learn more about this purple button"
              />
              <Button
                onPress={() => addCategory()}
                title="Add"
                // accessibilityLabel="Learn more about this purple button"
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* // Add Expenses Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addExpensesModalVisible}
        hardwareAccelerated={true}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setAddExpensesModalVisible(!addExpensesModalVisible);
        }}>
        <View style={Styles.modalContainer}>
          <View style={Styles.modalItemContainer}>
            <View>
              <Text
                style={{
                  fontSize: FONTSIZE.large,
                  alignSelf: 'center',
                  paddingBottom: 10,
                }}>
                {selectedCategory}
              </Text>
              <TextInput
                style={{height: 40, margin: 12, borderWidth: 1, padding: 10}}
                placeholder="Expenses Purpose"
                placeholderTextColor="#00000070"
                value={expensesPurpose}
                onChangeText={text => setExpensesPurpose(text)}
              />
              <TextInput
                style={{height: 40, margin: 12, borderWidth: 1, padding: 10}}
                placeholder="Expenses Amount"
                placeholderTextColor="#00000070"
                value={amount}
                onChangeText={text => setAmount(text)}
                keyboardType="numeric"
              />
            </View>
            <View style={Styles.modalButtonContainer}>
              <Button
                onPress={() =>
                  setAddExpensesModalVisible(!addExpensesModalVisible)
                }
                title="Cancel"
                // accessibilityLabel="Learn more about this purple button"
              />
              <Button
                onPress={() => addExpenses()}
                title="Add"
                // accessibilityLabel="Learn more about this purple button"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
