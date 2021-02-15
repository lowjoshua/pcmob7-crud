import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Dimensions, View, Text, Image, StyleSheet, } from 'react-native'
import TaskList from '../components/TaskList'

import * as taskActions from '../actions/tasks'
import { getCompleted, getUncompleted, } from '../utils'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
 


class Tasks extends Component {
  state = {
    routes:[
      { key: 'first', title:`TO DO` },
      { key: 'second', title: `COMPLETED` },
    ],
    index: 0
  }
  render() {
     
    const initialLayout = { width: Dimensions.get('window').width };
    const { tasks } = this.props;
    const tasksCompleted = getCompleted(tasks);
    const tasksUncompleted = getUncompleted(tasks);

    const {index, routes } = this.state;
    const FirstRoute = () => (
      <TaskList tabLabel={`TO DO (${tasksUncompleted.length})`} tasks={tasksUncompleted} actions={this.props.actions} />
    );
     
    const SecondRoute = () => (
      <TaskList tabLabel={`COMPLETED (${tasksCompleted.length})`} tasks={tasksCompleted} actions={this.props.actions} />
    );
    const renderScene = SceneMap({
      first: FirstRoute,
      second: SecondRoute,
    });

    const renderTabBar = props => (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: 'white' }}
        style={{ backgroundColor: '#2ad5d0' }}
        activeColor={'#666'}
        getLabelText={({ route }) => route.key == "first" ? "TO DO (" + getUncompleted(this.props?.tasks).length + ")" : "COMPLETED (" + getCompleted(this.props?.tasks).length + ")" }
      />
    );
    
    return (
      <View style={styles.wrapper}>
        <TabView
          swipeEnabled={false}
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={(i) => this.setState({index:i })}
          initialLayout={initialLayout}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fcfcfc',
  },
  tabs: {
    paddingTop: 20,
  },
  tab: {
    fontSize: 18,
    letterSpacing: -0.3,
    fontWeight: 'normal',
  },
  icon: {
    top: 2,
    height: 35,
    resizeMode: 'contain',
  },
})

export default connect(
  ({ tasks }) => ({ tasks }),
  dispatch => ({
    actions: bindActionCreators(taskActions, dispatch),
  }),
)(Tasks)
