/**
 * 图标文本组件
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import {
    UITouchable,
    UIImage
} from '../react-native-ui';

export default class UIImageView extends Component {
    /**
     * 定义组件的props属性
     */
    static propsTypes={
        size:React.PropTypes.number.isRequired,   //行高
        border:React.PropTypes.bool.isRequired,   //是否显示边框
        style:React.PropTypes.object,             //样式
        text:React.PropTypes.string,              //文本
        textStyle:React.PropTypes.object,          //文本样式
        icon:React.PropTypes.any,                 //图标
        iconSize:React.PropTypes.number,          //图标大小
        iconStyle:React.PropTypes.object,          //图标样式
        onPress:React.PropTypes.func              //点击事件
    }
    /**
     * 定义组件props默认值
     */
    static get defaultProps(){
        return {
            size:64,
            border:false
        }
    }
    /**
     * 渲染组件
     */
    render() {
        const {
            onPress
        } =this.props;
        if(onPress){
            return (
                <UITouchable onPress={onPress}>
                    {this._render()}
                </UITouchable>
            );
        }else{
            return this._render();
        }
    }
    _render(){
        const {
            size,icon,iconStyle,iconSize,text,style,textStyle,border
        } =this.props;
        let _iconSize=iconSize?iconSize:size/2;
        return (
            <View style={[styles.uiimageview,{width:size,height:size},border?styles.uiimageview_border:null,style]}>
                {icon?
                    <UIImage style={[styles.uiimageview_icon,{width:_iconSize,height:_iconSize},iconStyle]} icon={icon}/>:null
                }
                {text?
                    <Text numberOfLines={1} style={[styles.uiimageview_text,textStyle]}>{text}</Text>:null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    uiimageview:{
        alignItems:"center",
        justifyContent:'center'
    },
    uiimageview_text:{
        fontSize:12,
        color:'#333333',
        marginTop:2
    },
    uiimageview_border:{
        borderTopWidth:1,
        borderTopColor:'#ededed',
        borderBottomWidth:1,
        borderBottomColor:'#ededed',
        borderLeftWidth:1,
        borderLeftColor:'#ededed',
        borderRightWidth:1,
        borderRightColor:'#ededed',
    }
});
