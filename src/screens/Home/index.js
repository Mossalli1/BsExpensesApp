import * as React from 'react';
import {Button, View, Text, FlatList, TouchableOpacity} from 'react-native';
import {Styles} from './styles';
// import {FontSizee} from '@Constants';
// import FONTSIZE from '../../constants/fontSize';
import {FONTSIZE} from '@constants';
import dayjs from 'dayjs';

const HomeScreen = ({navigation}) => {
  // const date = new Date();
  // console.log('HomeScreen', date);
  const data = [
    {
      espensesPurpose: 'Food',
      amount: 100,
      category: 'Food',
      date: '2022-07-23T17:06:31.635Z',
    },
    {
      espensesPurpose: 'Home rent',
      amount: 120,
      category: 'Home rent',
      date: '2022-07-23T17:07:31.635Z',
    },
    {
      espensesPurpose: 'Home rent',
      amount: 120,
      category: 'Home rent',
      date: '2022-07-23T17:07:31.635Z',
    },
  ];

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
        <Text style={{fontSize: FONTSIZE.large}}>120</Text>
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
        onPress={() => alert('Add Expenses')}>
        <Text style={{fontSize: FONTSIZE.large, color: '#fff'}}>
          Add Category
        </Text>
      </TouchableOpacity>

      {/* <Button title="jjj" /> */}
    </View>
  );
};

export default HomeScreen;
