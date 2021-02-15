import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native'
import Task from './Task'

class TaskList extends Component {
  state = {
    scrollEnabled: true,
  }

  onScroll = scrollEnabled => this.setState({ scrollEnabled })

  render() {
    const { tasks, actions } = this.props
    const { scrollEnabled } = this.state

    if(!tasks.length) {
      return <Text style={styles.noItems}>No items here!</Text>
    }

    return (
      <ScrollView scrollEnabled={scrollEnabled}>
      { tasks.map((item, id) => (
          <Task
            key={item.id}
            task={item}
            actions={actions}
            onScroll={this.onScroll}
          />
      ))}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  noItems: {
    alignSelf: 'center',
    color: 'silver',
    marginTop: 100,
  },
})

export default TaskList
