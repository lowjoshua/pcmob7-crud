import React from 'react';
import { Image, Platform, TouchableOpacity } from 'react-native';
import { isAndroid } from './utils';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Tasks from './screens/Tasks';
import AddTask from './screens/AddTask';
import Insights from './screens/Insights';
import Menu from './components/DrawerMenu';
import AddButton from './components/AddButton';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const TasksScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={Tasks} options={({ navigation, route }) => {
        return {
          headerTitle: 'My Tasks',
          headerStyle: {
            backgroundColor: '#2ad5d0',
          },
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'normal',
            fontSize: 20,
          },
          headerRight: () => (<AddButton navigate={navigation} />),
          headerLeft: () => (<Menu onPress={() => navigation.toggleDrawer()} />),
          tabBarLabel: 'My Tasks',
          tabBarIcon: ({ tintColor }) => (
            <Image
              source={require('./images/icons/tasks.png')}
              style={[styles.icon, { tintColor }]}
            />
          )
        }
      }
      } />
      <Stack.Screen name="AddTask" component={AddTask} options={({ navigation, route }) => {
        return {
          headerTitle: 'Add Task',
          headerStyle: {
            backgroundColor: '#2ad5d0',
          },
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'normal',
            fontSize: 20,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={.8}>
              <Image style={styles.backButton} source={require('./images/icons/back.png')} />
            </TouchableOpacity>
          ),
          tabBarLabel: 'My Tasks',
          tabBarIcon: ({ tintColor }) => (
            <Image
              source={require('./images/icons/tasks.png')}
              style={[styles.icon, { tintColor }]}
            />
          )
        }
      }} />
    </Stack.Navigator>
  )
};

const InsightsScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={Insights} options={({ navigation, route }) => {
        return {
          headerTitle: 'Insights',
          headerStyle: {
            backgroundColor: '#2ad5d0',
          },
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'normal',
            fontSize: 20,
          },
          headerLeft: () => (
            <Menu onPress={() => navigation.toggleDrawer()} />
          ),
          tabBarLabel: 'Insights',
          tabBarIcon: ({ tintColor }) => (
            <Image
              source={require('./images/icons/analytics.png')}
              style={[styles.icon, { tintColor }]}
            />
          )
        }
      }} />
    </Stack.Navigator>
  )
};

const styles = {
  icon: {
    top: 2,
    height: 35,
    resizeMode: 'contain',
  },
  backButton: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    marginLeft: 10,
  },
}

const ApplicationScreen = () => {
  return (
    <NavigationContainer>
      {isAndroid ?
        <Drawer.Navigator drawerContentOptions={{
          activeTintColor: '#2ad5d0',
          itemStyle: { fontSize: 18 },
        }}>
          <Drawer.Screen name="Home" component={TasksScreen} />
          <Drawer.Screen name="Insights" component={InsightsScreen} />
        </Drawer.Navigator>
        :
        <Tab.Navigator
          initialRouteName='Tasks'
          tabBarOptions={{
            tintColor: '#434343',
            activeTintColor: '#16d0e9',
            labelStyle: {
              fontSize: 14,
            },
            style: {
              backgroundColor: '#232323',
              height: 70,
              paddingBottom: 6,
            }
          }}
        >
          <Tab.Screen name="Tasks" component={TasksScreen} />
          <Tab.Screen name="Insights" component={InsightsScreen} />
        </Tab.Navigator>
      }

    </NavigationContainer>
  )
};

export default ApplicationScreen 
