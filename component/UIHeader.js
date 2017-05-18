/**
 * 头部组件
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

export default class UIHeader extends Component {
    /**
     * 定义组件的props属性
     */
    static propsTypes={
        height:React.PropTypes.number.isRequired,   //头部高度,默认48
        headerStyle:React.PropTypes.object,         //头部样式
        title:React.PropTypes.string.isRequired,    //头部标题
        titleStyle:React.PropTypes.object,          //头部标题样式、
        showBackBtn:React.PropTypes.bool,           //是否显示返回按钮
        backBtnType:React.PropTypes.string,         //返回按钮类型，文本||图标||其他
        backText:React.PropTypes.string,            //返回文本内容
        backIcon:React.PropTypes.any,               //返回的图标
        backRender:React.PropTypes.func,            //返回的自定义渲染
        onBack:React.PropTypes.func,                //返回的事件
        toolbars:React.PropTypes.array,             //工具菜单
    }
    /**
     * 定义组件props默认值
     */
    static get defaultProps(){
        return {
            height:48,
            backBtnType:'icon',
            backText:'返回',
            toolbars:[]
        }
    }
    constructor(props) {
        super(props);
    }
    /**
     * 渲染组件
     */
    render() {
        let {
            height,title,headerStyle,titleStyle,toolbars
        } =this.props;

        let {
            navigator,showBackBtn,backBtnType,onBack,backText,backIcon,backRender
        }=this.props;
        let bars=toolbars||[];
        //如果存在导航器，并且当前路由大于0，则默认显示返回按钮
        if((navigator &&  navigator.getCurrentRoutes().length>0) || showBackBtn){
            var backToolbars=[];
            var backBar={onPress:onBack||this.onBackPress.bind(this),align:'left'};
            if(backBtnType=='text'){
                backBar.text=backText;
            }else if(backBtnType=='icon'){
                backBar.icon=backIcon||'back';
            }else{
                backBar.render=backRender;
            }
            backToolbars.push(backBar);
            bars=backToolbars.concat(toolbars);
        }
        let leftToobars=this.getToolbars(bars,'left');
        let rightToobars=this.getToolbars(bars);

        return (
            <View style={[styles.uiheader,headerStyle,{height:height}]}>
                {/*渲染头部返回按钮*/}
                {this.renderToolbar(leftToobars,'left')}

                {/*渲染头部标题*/}
                <View style={[styles.uiheader_center]}>
                    <Text style={[styles.uiheader_title,titleStyle]}>{title}</Text>
                </View>

                {/*渲染头部工具栏*/}
                {this.renderToolbar(rightToobars)}
            </View>
        );
    }
    /**
     * 返回上一页
     */
    onBackPress(){
        let {navigator}=this.props;
        if(navigator){
            navigator.pop();
        }
    }
    /**
     * 渲染头部工具按钮
     */
    renderToolbar(toolbars,align){
        let {height} =this.props;
        if(toolbars && toolbars.length>0){
            var bars=[];
            for(var i=0;i<toolbars.length;i++){
                var bar=toolbars[i];
                bars.push(
                    <UITouchable  key={i}  onPress={bar.onPress}>
                        <View style={[styles.uiheader_toolbar_icon,{height:height}]}>
                            {bar.icon?<UIImage style={[styles.uiheader_icon]} icon={bar.icon}/>:null}
                            {bar.text?<Text style={[styles.uiheader_text]} >{bar.text}</Text>:null}
                            {bar.render?bar.render(bar):null}
                        </View>
                    </UITouchable>
                );
            }
            return (
                <View style={[styles.uiheader_toolbar,{height:height},align=='left'?{left:0,right:null}:null]}>
                    {bars}
                </View>
            );
        }
    }
    /**
     * 获取指定方向的工具菜单
     * @param {*} align 
     */
    getToolbars(toolbars,align){
        let {height} =this.props;
        let bars=[];
        if(toolbars && toolbars.length>0){
            for (var i = 0; i < toolbars.length; i++) {
                var bar = toolbars[i];
                if(align==bar.align){
                    bars.push(bar);
                }
            }
        }
        return bars;
    }
    /**
     * 设置标题
     * @param {*} title 
     */
    setTitle(title){
        this.setState({
            title:title
        });
    }
}

const styles = StyleSheet.create({
    uiheader:{
        height:48,
        flexDirection:'row',
        backgroundColor:'#01AAED'
    },
    uiheader_center:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:16,
        paddingRight:16
    },
    uiheader_title:{
        fontSize:18,
        color:'#ffffff'
    },
    uiheader_icon:{
        width:20,
        height:20
    },
    uiheader_text:{
        fontSize:14,
        color:'#ffffff'
    },
    uiheader_toolbar:{
        flexDirection:'row',
        alignItems:"center",
        justifyContent:'center',
        paddingRight:10,
        paddingLeft:10,
        position:'absolute',
        top:0,
        right:0
    },
    uiheader_toolbar_icon:{
        paddingLeft:6,
        paddingRight:6,
        alignItems:"center",
        justifyContent:'center',
    }
});
