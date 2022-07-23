import * as React from 'react';
import {Button, View} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}>
      <Button
        onPress={() => navigation.navigate('ExpensesLog')}
        title="Expense Log"
      />
    </View>
  );
};

export default HomeScreen;
