/**
 * 点击组件
 */

import React, { Component } from 'react';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';

export default class UITouchable extends Component {
    /**
     * 定义组件的props属性
     */
    static propsTypes={
        touchableType:React.PropTypes.string
    }
    /**
     * 定义组件props默认值
     */
    static get defaultProps(){
        return {
            touchableType:Platform.OS=='android'?'TouchableNativeFeedback':'TouchableOpacity'
        }
    }
    /**
     * 渲染组件
     */
    render() {
        const{touchableType}=this.props;
        if(touchableType=='TouchableNativeFeedback'){
            if(Platform.OS=='ios'){
                console.error('TouchableNativeFeedback is not supported on the IOS platform.');
                return;
            }
            return (
                <TouchableNativeFeedback {...this.props}/>
            );
        }else if(touchableType=='TouchableHighlight'){
            return (
                <TouchableHighlight {...this.props}/>
            );
        }else if(touchableType=='TouchableWithoutFeedback'){
            return (
                <TouchableWithoutFeedback {...this.props}/>
            );
        }else{
             return (
                <TouchableOpacity {...this.props} />
            );
        }
    }
}
