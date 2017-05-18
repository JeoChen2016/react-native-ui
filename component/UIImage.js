/**
 * 自定义图片组件
 */

import React, { Component } from 'react';
import {
  Image,
  StyleSheet
} from 'react-native';
import {
    images,
} from '../react-native-ui';

export default class UIImage extends Component {
    /**
     * 定义组件的props属性
     */
    static propsTypes={
        ...Image.propTypes,
        name:React.PropTypes.string,
        icon:React.PropTypes.any,
        size:React.PropTypes.number,
        color:React.PropTypes.string
    }
    /**
     * 渲染组件
     */
    render() {
        const {name,size,color,icon}=this.props;
        let style=this.props.style;

        if(!style.width && !style.height && size){
            style.width=size;
            style.height=size;
        }
        if(typeof icon==='string'){
            return <Image {...this.props} style={[style]} source={images[icon+(color?"_"+color:"")]}/>
        }else if(icon){
            return <Image {...this.props} style={[style]} source={icon}/>;
        }else{
            return <Image {...this.props} style={[style]}/>;
        }
    }
}
