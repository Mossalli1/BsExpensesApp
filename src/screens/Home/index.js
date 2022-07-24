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
let data = [
  {
    espensesPurpose: 'Bought',
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
    espensesPurpose: 'House tutoring',
    amount: 120,
    category: 'Childs education',
    date: '2022-07-23T17:07:31.635Z',
  },
];

const HomeScreen = ({navigation}) => {
  // const date = new Date();
  // console.log('HomeScreen', date);
  const [load, setLoad] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [categoryName, setCategoryName] = React.useState('');

  const addCategory = async () => {
    let dateTime = new Date();
    let categoryData = {
      espensesPurpose: '',
      amount: 0,
      category: categoryName,
      date: dateTime,
    };
    data.push(categoryData);
    setModalVisible(!modalVisible);
  };

  const renderExpensesCard = ({item}) => (
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
        <Text style={{fontSize: FONTSIZE.large}}>{item.amount}</Text>
      </View>
    </View>
  );

  let totalExpensesAmount = data.reduce((total, obj) => obj.amount + total, 0);

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
        data={data}
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
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
                accessibilityLabel="Learn more about this purple button"
              />
              <Button
                onPress={() => addCategory()}
                title="Add"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
