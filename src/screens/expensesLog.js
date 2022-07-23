// import * as React from 'react';
// import {Button, View} from 'react-native';

// const ExpensesLog = ({navigation}) => {
//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100%',
//       }}>
//       <Button
//         onPress={() => navigation.navigate('Home')}
//         title="Go back to HomeScreen"
//       />
//     </View>
//   );
// };

// export default ExpensesLog;
import * as React from 'react';
import {Button, View, TextInput, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setExpensesValue} from '../redux/reducers/expenses';

const ExpensesLog = ({navigation}) => {
  const [expences, setExpences] = React.useState('');
  const dispatch = useDispatch();
  const saveOnRedux = async () => {
    // setExpences(amount);
    dispatch(setExpensesValue(expences));
  };

  const getFromRedux = useSelector(state => state.expenses);
  console.log('ExpencesLog', getFromRedux);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Amount : {getFromRedux.value}</Text>
      <TextInput
        style={{backgroundColor: 'red', width: 200}}
        onChangeText={item => setExpences(item)}
      />
      <Button onPress={() => navigation.goBack()} title="Go back home" />
      <Button onPress={() => saveOnRedux()} title="Save" />
    </View>
  );
};

export default ExpensesLog;
