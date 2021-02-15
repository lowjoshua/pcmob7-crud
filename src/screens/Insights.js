import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  Image,
  View,
  StyleSheet,
} from 'react-native'
import { VictoryPie } from 'victory-native'
import Menu from '../components/DrawerMenu'

import {
  getCompleted,
  getUncompleted,
} from '../utils'

class Analytics extends Component {
  getData = (tasks) => {
    if(!tasks.length) return []

    return [
      {
        type: 'Completed',
        total: getCompleted(tasks).length,
      },
      {
        type: 'Not Completed',
        total: getUncompleted(tasks).length,
      }
    ]
  }

  render() {
    const { tasks } = this.props
    const data = this.getData(tasks);

    if(!tasks.length) return <Text>Add some tasks!</Text>

    return (
      <View style={styles.wrapper}>
        <View style={styles.stats}>
          <View style={[styles.column, {backgroundColor: '#b878cc'}]}>
            <Text style={styles.value}>
              { getUncompleted(tasks).length }
            </Text>

            <Text style={styles.label}>
              To do
            </Text>
          </View>

          <View style={[styles.column, {backgroundColor: '#47daae'}]}>
            <Text style={styles.value}>
              { getCompleted(tasks).length }
            </Text>

            <Text style={styles.label}>
              Completed
            </Text>
          </View>
        </View>

        <View style={styles.chart}>
          <Text style={styles.total}>
            You currently have <Text style={styles.bold}>{tasks.length}</Text> tasks
          </Text>

          <VictoryPie
            width={350}
            height={350}
            innerRadius={120}
            labelRadius={70}
            colorScale={['#47daae', '#b878cc']}
            style={{ labels: chartStyles.label }}
            data={data}
            x='type'
            y='total'
            animate={{ duration: 1500 }}
          />
        </View>
      </View>
    )
  }
}

const chartStyles = {
  label: {
    fontSize: 14,
    fontWeight: 'normal',
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  total: {
    marginTop: 40,
    marginBottom: 10,
    fontSize: 16,
    color: 'silver',
    alignSelf: 'center',
  },
  bold: {
    color: 'gray',
    fontWeight: 'bold',
  },
  stats: {
    width: '100%',
    height: 100,
    backgroundColor: '#ddd',
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontSize: 40,
    color: 'white',
  },
  icon: {
    top: 2,
    height: 35,
    resizeMode: 'contain',
  },
})

export default connect(({ tasks }) => ({ tasks }))(Analytics)
