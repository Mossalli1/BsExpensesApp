/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

//Screens
import HomeScreen from './src/screens/Home';
import ExpensesLog from './src/screens/ExpensesLog';

// function Feed({navigation}) {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>Feed Screen</Text>
//       <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
//       <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
//     </View>
//   );
// }

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation={true}
      // drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        options={{drawerLabel: 'Home', headerTitle: 'Home'}}
        component={HomeScreen}
      />
      <Drawer.Screen
        name="ExpensesLog"
        options={{drawerLabel: 'Expenses Log', headerTitle: 'Expenses Log'}}
        component={ExpensesLog}
      />
    </Drawer.Navigator>
  );
}

function Router() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}

// const Router = () => {
//   return (
//     <View>
//       <Text>Hello</Text>
//     </View>
//   );
// };
export default Router;
