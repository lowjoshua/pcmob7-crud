import React, { PureComponent } from 'react'
import {
  View,
  Text,
  Image,
  Platform,
  Alert,
  Animated,
  StyleSheet,
} from 'react-native'

import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import TimeAgo from 'react-native-timeago'

class Task extends PureComponent {
  state = {
    hidden: false,
    lineThrough: false,
    animation: new Animated.Value(0),
  }

  hideElement = callback => {
    const config = { toValue: 0, duration: 400, useNativeDriver: true }

    Animated.timing(this.state.animation, config).start(() => {
      this.setState({ hidden: true })
      callback()
    })
  }

  completeTask = () => {
    const { id } = this.props.task

    this.setState({ lineThrough: true })
    this.hideElement(() => this.props.actions.completeTask(id))
  }

  removeTask = () => {
    const { id } = this.props.task
    this.hideElement(() => this.props.actions.removeTask(id))
  }

  showRemoveConfirm = () => {
    if(Platform.OS == 'web'){
      var r = confirm('Are you sure you want to delete this task?');
      if(r){
        this.removeTask();
      }
    } else {
      Alert.alert(
        'Are you sure you want to delete this task?',
        null,
        [
          {
            text: 'Cancel',
            onPress: () => { },
          },
          {
            text: 'Delete',
            onPress: this.removeTask,
          },
        ],
        {
          cancelable: false,
        }
      )
    }
    
  }

  componentDidMount() {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start()
  }

  render() {
    if (this.state.hidden) return null

    const { text, createdAt, completedAt, completed } = this.props.task

    // const removeTaskButton = [{
    //   backgroundColor: '#ed7c8c',
    //   underlayColor: '#d84f62',
    //   component: <DeleteIcon style={styles.swipeIcon} />,
    //   onPress: this.showRemoveConfirm
    // }]

    // const completeTaskButton = !completed ? [{
    //   backgroundColor: '#7ced9f',
    //   underlayColor: '#4fd879',
    //   component: <CheckIcon style={styles.swipeIcon} />,
    //   onPress: this.completeTask
    // }] : null

    const createOrCompleted = {
      text: completed ? 'completed' : 'created',
      date: completed ? completedAt : createdAt,
    }

    const removeTaskButton = (progress, dragX) => {
      return (
        <RectButton style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#ed7c8c', underlayColor: '#d84f62', width: 100 }} onPress={this.showRemoveConfirm}>
          <DeleteIcon style={styles.swipeIcon} />
        </RectButton>
      );
    };

    const completeTaskButton = (progress, dragX) => {
      return (
        <>
          { !completed ?
            <RectButton style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#7ced9f', underlayColor: '#4fd879', width: 100 }} onPress={this.completeTask}>
              <CheckIcon style={styles.swipeIcon} />
            </RectButton>
            :
            null
          }
        </>
      );
    };

    return (
      <Animated.View style={{ opacity: this.state.animation }}>
        <Swipeable
          renderRightActions={removeTaskButton}
          renderLeftActions={completeTaskButton}
          containerStyle={{ backgroundColor: 'white' }}
          childrenContainerStyle={styles.swipeItem}
        >
          <View style={styles.task}>
            <View style={styles.dateWrapper}>
              <ClockIcon style={styles.dateIcon} />
              <Text style={styles.date}>
                {createOrCompleted.text} <TimeAgo time={createOrCompleted.date} />
              </Text>
            </View>

            <Text
              style={[styles.taskText, {
                textDecorationLine: this.state.lineThrough || completed ? 'line-through' : 'none'
              }]}
            >
              {text}
            </Text>
          </View>
        </Swipeable>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  swipeItem: {
  },
  task: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth:1, borderColor: '#2ad5d0'
  },
  swipeIcon: {
    flex: 1,
    tintColor: 'white',
    resizeMode: 'contain',
    width: 25,
    height: 25,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dateWrapper: {
    flexDirection: 'row',
  },
  dateIcon: {
    marginRight: 4,
    width: 15,
    height: 15,
    resizeMode: 'contain',
    tintColor: 'silver',
  },
  date: {
    marginTop: 1,
    fontSize: 10,
    color: 'silver',
  },
  taskText: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 8,
  },
})

const DeleteIcon = ({ style }) => (
  <Image
    style={style}
    source={require('../images/icons/delete.png')}
  />
)

const CheckIcon = ({ style }) => (
  <Image
    style={[style, { height: 32, width: 32 }]}
    source={require('../images/icons/check.png')}
  />
)

const ClockIcon = ({ style }) => (
  <Image
    style={style}
    source={require('../images/icons/clock.png')}
  />
)

export default Task
