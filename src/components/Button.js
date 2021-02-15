import React, { PureComponent } from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native'

class Button extends PureComponent {
  static defaultProps = {
    onPress: () => {},
    style: {},
    textStyle: {},
    label: '',
  }

  render() {
    const {
      onPress,
      style,
      textStyle,
      label,
    } = this.props

    if(!label) return null

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.default, style]}
        activeOpacity={0.6}
      >
        <Text style={[styles.buttonText, textStyle]}>{label}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  default: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 20,
    paddingHorizontal: 50,
  },
  buttonText: {
    fontSize: 22,
    color: '#00d2ff',
  }
})

export default Button
