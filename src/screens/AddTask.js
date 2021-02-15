import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native'
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput'

import Button from '../components/Button'
import * as taskActions from '../actions/tasks'

class AddTask extends PureComponent {
  state = {
    task: '',
  }

  addTask = () => {
    this.props.actions.addTask(this.state.task)
    this.setState({ task: '' })
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.label}>Your task</Text>

        <AutoGrowingTextInput
          ref='newTask'
          autocomplete={false}
          clearButtonMode='while-editing'
          onChange={(e) => this.setState({task: e.nativeEvent.text})}
          value={this.state.task}
          style={styles.input}
          placeholder='Enter your task...'
        />

        <Button
          onPress={this.addTask}
          style={styles.button}
          textStyle={styles.buttonText}
          label='Add task'
        />
      </View>
    )
  }
}

const styles = {
  wrapper: {
    flex: 1,
    backgroundColor: '#fcfcfc',
    padding: 20,
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#666',
  },
  button: {
    marginTop: 15,
    padding: 5,
    backgroundColor: '#16d0e9',
    alignItems: 'center',
    paddingVertical: 15,
    width: '50%',
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: 'white',
    height: 50,
    marginTop: 8,
    fontSize: 16,
    color: '#999',
    padding: 10,
    paddingBottom: 15,
    fontWeight: 'normal',
  },
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

export default connect(null, dispatch => ({
  actions: bindActionCreators(taskActions, dispatch),
}))(AddTask)
