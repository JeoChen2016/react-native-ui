/**
 * 面板组件
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import {
  images,
  UITouchable
} from '../react-native-ui';

export default class UIPanel extends Component {
    /**
     * 定义组件的props属性
     */
    static propsTypes={
        hidden:React.PropTypes.bool.isRequired
    }
    /**
     * 定义组件props默认值
     */
    static get defaultProps(){
        return {
            hidden:false
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            hidden:props.hidden
        };
    }
    /**
     * 渲染组件
     */
    render() {
        let {onPress,bottomBorder,panelStyle}=this.props;
        return (
            <View style={[styles.uipanel,bottomBorder?{borderBottomWidth:1}:null,panelStyle]}>
                {this.renderHeader()}
                {this.renderPanel()}
            </View>
        );
    }
    /**
     * 渲染头部标题
     */
    renderHeader(){
        let {hidden}=this.state;
        let {title,headerStyle} = this.props;
        if(title){
            return (
                <UITouchable onPress={this.onHeaderPress.bind(this)}>
                    <View style={[styles.uipanel_header,headerStyle]}>          
                        <View style={[styles.uipanel_header_badge]}></View>
                        <View style={[styles.uipanel_header_title]}>
                            <Text style={[styles.uipanel_header_text]}>{title}</Text>
                        </View>
                        <View style={[styles.uipanel_header_operater]}>
                            <Image style={[styles.uipanel_header_icon]} source={hidden?images.up:images.down}/>
                        </View>
                    </View>
                </UITouchable>
            );
        }
    }
    renderPanel(){
        let {hidden}=this.state;
        let {onPanel}=this.props;
        return (
            <View style={[styles.uipanel_body,hidden?{height:0}:null]}>
                {onPanel?onPanel():null}
            </View>
        );
    }
    /**
     * 显示隐藏内容区域
     */
    onHeaderPress(){
        this.setState(
            {hidden:!this.state.hidden}
        );
    }
}

const styles = StyleSheet.create({
    uipanel:{
        borderTopWidth:1,
        borderTopColor:'#ededed',
        marginBottom:1
    },
    uipanel_header:{
        height:40,
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#ededed'
    },
    uipanel_header_badge:{
        width:3,
        height:40,
        backgroundColor:'#0099FF'
    },
    uipanel_header_title:{
        flex:1,
        paddingLeft:5
    },
    uipanel_header_text:{
        fontWeight:'bold'
    },
    uipanel_header_operater:{
        flexDirection:'row',
        alignItems:'center',
        paddingRight:16
    },
     uipanel_header_icon:{
        width:16,
        height:16,
        marginLeft:16
    }
});
