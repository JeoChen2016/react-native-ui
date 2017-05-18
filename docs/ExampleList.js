
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
    UILine,
    UIListView
} from '../react-native-ui';

var examples=[];
export default class ExampleList extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <UIListView
          data={examples}
          renderRow={(row)=>{
            return <UILine 
                      title={row.title} 
                      desc={row.desc}
                      onPress={this.onLinePress.bind(this,row)}
                    />
          }}
        />
      </View>
    );
  }
  onLinePress(row){
    var {navigator}=this.props;
    if(row.component){
      navigator.push({
        component:row.component,
        params:row
      });
    }
      
  }
}
