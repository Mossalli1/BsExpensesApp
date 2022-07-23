import * as React from 'react';
import {Button, View} from 'react-native';

const ExpensesLog = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}>
      <Button
        onPress={() => navigation.navigate('Home')}
        title="Go back to HomeScreen"
      />
    </View>
  );
};

export default ExpensesLog;
