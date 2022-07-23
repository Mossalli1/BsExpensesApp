import {StyleSheet} from 'react-native';
export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    height: '100%',
    padding: 20,
  },
  totalAmountContainer: {
    // backgroundColor: 'red',
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  expenseCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    backgroundColor: '#fff',
    marginBottom: 5,
    padding: 15,

    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
    borderRadius: 5,
  },
  buttonStyle: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: '#007AFF',
    height: 50,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});
