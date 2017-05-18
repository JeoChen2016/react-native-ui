/**
 * 页面组件
 */
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native';

import {
  UIHeader
} from '../react-native-ui';

export default class UIPage extends Component{
    render(){
      return(
         <View style={[styles.uipage]}>
             {this.renderHeader()}
             {this.renderContent()}
             {this.renderFooter()}
         </View> 
      );
    }
    renderHeader(){
      var {header,navigator}=this.props;
      if(header){
        return <UIHeader {...header} navigator={navigator}/>
      }
    }
    renderContent(){
      var {content,contentStyle}=this.props;
      if(typeof content =='function'){
        return (
          <ScrollView style={[styles.uipage,contentStyle]}>
            {content()}
          </ScrollView>
        );
      }
    }
    renderFooter(){
      var {footer,footerStyle}=this.props;
      if(footer){
        var {style,buttons}=footer;
        return (
          <View style={[styles.uipage_footer,style]}>

          </View>
        );
      }
    }
}
const styles = StyleSheet.create({
    uipage:{
        flex:1
    },
    uipage_footer:{
      height:40,
      borderTopWidth:1,
      borderTopColor:'#ededed',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
    }
});