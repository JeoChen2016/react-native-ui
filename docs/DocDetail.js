import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';

import {
  images,
  UIPage,
  UIPanel,
  UILine
} from '../react-native-ui';

export default class DocDetail extends Component{
    render(){
      return <UIPage
        {...this.props}
        header={{title:this.props.title}}
        content={()=>{
          return this.renderContent();
        }}
      />
    }
    renderContent(){
      let {desc,examples,attrs,events,methods}=this.props;
      return (
        <View style={{flex:1}}>
            <View style={{justifyContent:'center',minHeight:40,paddingLeft:16,paddingTop:5,paddingBottom:5,paddingRight:16}}>
                <Text>{desc}</Text>
            </View>
            {examples?
                <UIPanel
                title={'案例'}
                onPanel={()=>{
                  return examples();
                }}
              />:null
            }
            {attrs?
              <UIPanel
                title={'属性'}
                onPanel={()=>{
                  return this.renderAttrOrEventOrMethod(attrs);
                }}
              />:null
            }
            {events?
              <UIPanel
                title={'事件'}
                onPanel={()=>{
                  return this.renderAttrOrEventOrMethod(events);
                }}
              />:null
            }
            {methods?
              <UIPanel
                title={'方法'}
                onPanel={()=>{
                  return this.renderAttrOrEventOrMethod(methods);
                }}
              />:null
            }
        </View>
      );
    }
    renderAttrOrEventOrMethod(datas){
      var panels=[];
      for(var i=0;i<datas.length;i++){
        panels.push(<UILine key={i} {...datas[i]} autoHeight={true}/>);
      }
      return panels;
    }
};