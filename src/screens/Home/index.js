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
import {FONTSIZE} from '@constants';
import dayjs from 'dayjs';
import {useDispatch, useSelector} from 'react-redux';
import {setExpensesValue} from '../../redux/reducers/expenses';

let data = [];

const HomeScreen = ({navigation}) => {
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
    dispatch(setExpensesValue(JSON.stringify(data)));
  };

  //get data from redux
  const getFromRedux = useSelector(state => state.expenses);
  console.log('getFromRedux', getFromRedux);
  data = getFromRedux.value.length > 0 ? JSON.parse(getFromRedux.value) : [];

  const addCategory = async () => {
    if (categoryName !== '') {
      let categoryData = {
        category: categoryName,
        date: dateTime,
        expenses: [
          {
            category: categoryName,
            espensesPurpose: '',
            amount: 0,
            date: dateTime,
          },
        ],
      };
      data.push(categoryData);
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
      data.map(item => {
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

  //Adding Subtotal to each category
  let newItems = data.map(item => {
    return {
      ...item,
      subTotal: item.expenses.reduce((acc, curr) => curr.amount + acc, 0),
    };
  });

  //Getting total amount of all categories
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
        ListEmptyComponent={() => (
          <View style={Styles.emptyListContainer}>
            <Text>No Expenses Found! Please Add Category.</Text>
          </View>
        )}
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
              />
              <Button onPress={() => addCategory()} title="Add" />
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
              />
              <Button onPress={() => addExpenses()} title="Add" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
