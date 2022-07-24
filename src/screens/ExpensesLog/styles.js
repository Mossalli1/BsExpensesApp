import {StyleSheet} from 'react-native';
export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    padding: 20,
  },
  totalAmountContainer: {
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
  filterContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#00000010',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
  },
  filterTextContainer: {
    flexDirection: 'row',
    paddingRight: 30,
    alignItems: 'center',
  },
});
