/**
 * 行组件
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Switch
} from 'react-native';
import {
    images,
    UITouchable
} from '../react-native-ui';

export default class UILine extends Component {
    /**
     * 定义组件的props属性
     */
    static propsTypes={
        height:React.PropTypes.number.isRequired,   //行高
        bottomBorder:React.PropTypes.bool.isRequired,     //是否有边框
        bool:React.PropTypes.bool.isRequired,       //是否显示switch组件
        switchValue:React.PropTypes.bool.isRequired,//switch值
        disabled:React.PropTypes.bool.isRequired,   //switch是否禁用
        lineStyle:React.PropTypes.object,           //行样式
        leftStyle:React.PropTypes.object,           //左边样式
        centerStyle:React.PropTypes.object,         //中间样式
        title:React.PropTypes.string,               //标题
        desc:React.PropTypes.string,                //描述
        icon:React.PropTypes.object,                //图标
        onValueChange:React.PropTypes.func,         //Switch改变事件
        titleLines:React.PropTypes.number.isRequired,   //标题最多显示几行
        descLines:React.PropTypes.number.isRequired,   //描述最多显示几行
    }
    /**
     * 定义组件props默认值
     */
    static get defaultProps(){
        return {
            height:48,
            bottomBorder:true,
            bool:false,
            switchValue:false,
            disabled:false,
            titleLines:1,
            descLines:1
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            switchValue:props.switchValue
        };
    }
    /**
     * 渲染组件
     */
    render() {
        const {onPress} = this.props;
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
        let {
            height,lineStyle,leftStyle,centerStyle,
            bottomBorder,title,desc,icon,bool,onValueChange,
            disabled,render,onPress,badge,value,subTitle,subTitleStyle,platform,autoHeight,titleLines,descLines
        } =this.props;
        if(autoHeight){
            height=titleLines=descLines=null;
        }
        if(render){
            return render(this.props);
        }else{
            return (
                <View style={[styles.uiline,lineStyle,{height:height}]}>
                    {icon?
                        <View style={[styles.uiline_left,leftStyle]}>
                            {icon()}
                        </View>:null
                    }
                    <View style={[styles.uiline_right,centerStyle,!bottomBorder?{borderBottomWidth:0}:null,!icon?{paddingLeft:16}:null]}>
                        <View style={[styles.uiline_content]}>
                            {title?
                                <View style={[styles.uiline_content_title]}>
                                    <Text numberOfLines={titleLines} style={[styles.uiline_title]}>{title}</Text>
                                    {subTitle?<Text numberOfLines={titleLines} style={[styles.uiline_subtitle,subTitleStyle]}>{subTitle}</Text>:null}
                                    {platform?<Text numberOfLines={titleLines} style={[styles.uiline_platform]}>{platform}</Text>:null}
                                </View>:null
                            }
                            {desc?
                                <Text numberOfLines={descLines} style={[styles.uiline_desc]}>{desc}</Text>:null
                            }
                        </View>
                        <View style={[styles.uiline_content_value]}>
                            {value?
                                <Text numberOfLines={1} style={[styles.uiline_margin,styles.uiline_value]}>{value}</Text>:null
                            }
                            {badge?
                                <View style={[styles.uiline_badge]}>
                                    <Text style={styles.uiline_badge_text}>{badge}</Text>
                                </View>:null
                            }
                            {onPress?
                                <Image style={[styles.uiline_margin,styles.uiline_next]} source={images.right}/>:null
                            }
                            {bool?
                                <Switch style={[styles.uiline_margin]} disabled={disabled} value={this.state.switchValue} onValueChange={(bool)=>{
                                    this.setState({
                                        switchValue:bool
                                    });
                                    onValueChange?onValueChange(bool):null;
                                }}/>:null
                            }
                        </View>
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    uiline: {
        flexDirection:'row',
        minHeight:48
    },
    uiline_left:{
        minWidth:48,
        alignItems:"center",
        justifyContent:'center'
    },
    uiline_right:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#eeeeee',
        paddingTop:5,
        paddingBottom:5
    },
    uiline_content:{
        justifyContent:'center',
        marginRight:32
    },
    uiline_content_title:{
        flexDirection:'row',
        alignItems:'center'
    },
    uiline_content_value:{
        flex:1,
        flexDirection:'row',
        alignItems:"center",
        justifyContent:'flex-end'
    },
    uiline_title:{
        fontSize:14,
        color:'#333333'
    },
    uiline_desc:{
        fontSize:12,
        color:'#999999',
        marginTop:1
    },
    uiline_margin:{
        marginRight:16
    },
    uiline_next:{
        width:16,
        height:16
    },
    uiline_badge:{
        width:16,
        height:16,
        borderRadius:16,
        backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center',
        marginRight:6
    },
    uiline_badge_text:{
        fontSize:11,
        color:'#ffffff'
    },
    uiline_value:{
        fontSize:13,
        color:'#999999'
    },
    uiline_subtitle:{
        marginLeft:5,
        fontSize:12,
        color:'red'
    },
    uiline_platform:{
        marginLeft:5,
        fontSize:12,
        color:'#104E8B'
    }
});
