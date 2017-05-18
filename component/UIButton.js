/**
 * 自定义按钮组件
 */

import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet
} from 'react-native';
import {
    UITouchable,
    UIImage
} from '../react-native-ui';

export default class UIButton extends Component {
    /**
     * 定义组件的props属性
     */
    static propsTypes={
        text:React.PropTypes.string,
        textStyle:React.PropTypes.object,
        icon:React.PropTypes.any,
        iconOp:React.PropTypes.object,
        iconStyle:React.PropTypes.object,
        btnStyle:React.PropTypes.object
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
            icon,text,btnStyle,textStyle,iconStyle,iconOp
        } =this.props;
        return (
            <View style={[styles.uibutton,btnStyle]}>
                {icon?
                    <UIImage style={[styles.uibutton_icon,iconStyle]} icon={icon} color={'white'} {...iconOp}/>:null
                }
                {text?
                    <Text style={[styles.uibutton_text,textStyle]}>{text}</Text>:null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    uibutton:{
        flexDirection:'row',
        height:32,
        alignItems:"center",
        justifyContent:'center',
        paddingLeft:6,
        paddingRight:6,
        margin:3,
        backgroundColor:'#01AAED',
        borderRadius:5,
        minWidth:64
    },
    uibutton_icon:{
        width:16,
        height:16,
        marginRight:3
    },
    uibutton_text:{
        fontSize:16,
        color:'#ffffff'
    }
});
