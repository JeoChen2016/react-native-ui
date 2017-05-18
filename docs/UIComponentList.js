
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
    UIButton,
    UILine,
    UIListView,
    UIHeader,
    UIImage,
    images
} from '../react-native-ui';
import DocDetail from './DocDetail';

export default class UIComponentList extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <UIListView
          renderRow={(row)=>{
            return <UILine 
                      title={row.title} 
                      desc={row.desc}
                      onPress={this.onLinePress.bind(this,row)}
                    />
          }}
          loadData={this.loadData.bind(this)}
        />
      </View>
    );
  }
  onLinePress(row){
    var {navigator}=this.props;
    navigator.push({
      component:DocDetail,
      params:row
    });
  }
  loadData(){
    return [
      {title:'UIButton',desc:'自定义按钮组件，支持纯文本和图标',examples:()=>{
        return (
          <View style={{padding:5,flexDirection:'row'}}>
            <UIButton text={'确定'}/>
            <UIButton text={'保存'} icon={'save'} />
            <UIButton text={'设置'} icon={images.setting_white} onPress={()=>{alert('test');}}/>
            <UIButton text={'删除'} icon={'delete'} onPress={()=>{alert('test');}}/>
          </View>
        );
      },attrs:[
        {title:'text',subTitle:'string',desc:'按钮文本'},
        {title:'textStyle',subTitle:'object',desc:'按钮文本样式'},
        {title:'icon',subTitle:'number|object',desc:'按钮图标'},
        {title:'iconStyle',subTitle:'object',desc:'按钮图标样式'},
        {title:'btnStyle',subTitle:'object',desc:'按钮样式'},
        {title:'onPress',subTitle:'function',desc:'按钮点击事件'}
      ]},
      {title:'UIHeader',desc:'头部组件,支持返回，工具栏等功能',examples:()=>{
        return (
          <View>
            <UIHeader title={'只有标题'} headerStyle={{marginBottom:5}}/>
            <UIHeader title={'有返回按钮头部'} showBackBtn={true} headerStyle={{marginBottom:5}}/>
            <UIHeader title={'有返回文本头部'} showBackBtn={true} backBtnType={'text'} headerStyle={{marginBottom:5}}/>
            <UIHeader ref={'header'} title={'工具栏头部'} showBackBtn={true} toolbars={[
              {icon:images.search_white},
              {icon:images.share_white},
              {icon:images.share_white,align:'left'},
              {text:'发送'}
            ]} onBack={()=>{
              alert('返回');
            }}/>
          </View>
        );
      },attrs:[
        {title:'height',subTitle:'number',desc:'头部高度，默认为48'},
        {title:'headerStyle',subTitle:'object',desc:'头部样式'},
        {title:'title',subTitle:'string',desc:'头部标题'},
        {title:'titleStyle',subTitle:'object',desc:'头部标题样式'},
        {title:'showBackBtn',subTitle:'boolean',desc:'是否显示返回按钮'},
        {title:'backBtnType',subTitle:'string',desc:'返回按钮类型，text|icon，默认为icon'},
        {title:'backText',subTitle:'string',desc:'返回文本，默认为返回'},
        {title:'backIcon',subTitle:'string',desc:'返回图标，不设置为默认图标'},
        {title:'backRender',subTitle:'string',desc:'返回自定义渲染'},
        {title:'toolbars',subTitle:'array',desc:'工具栏数组，工具栏选项如下。\n1、text：显示文本。\n2、icon：显示图标。\n3、onPress：点击事件\n4、align：显示的位置，默认居右显示。\n 注意text和icon最好二存一'},
        {title:'navigator',subTitle:'object',desc:'导航器，设置导航器后，头部组件会根据导航器路由个数默认判断是否显示返回图标'}
      ],events:[
        {title:'onBack',subTitle:'function',desc:'自定义的返回按钮事件'}
      ]},
      {title:'UIImage',desc:'自定义图片组件',examples:()=>{
        var datas=[];
        for(var icon in images){
          datas.push({
            text:icon,
            icon:images[icon]
          });
        }
        return (
          <View style={{paddingTop:1}}>
            <UIListView
              style={{backgroundColor:'#BABABA'}}
              grid={true}
              data={datas}
            />
          </View>
        );
      }},
      {title:'UIImageView',desc:'图标文本视图组件，显示一个图标和文本，通常用于九宫图视图',examples:()=>{
        return (
          <View style={{paddingTop:1}}>
            <UIListView
              grid={true}
              data={[
                {text:'详情信息',icon:images.detail_blue,onPress:()=>{
                  alert('test');
                }},
                {text:'下载中心',icon:images.download_blue},
                {text:'应用中心',border:true,icon:images.app_blue},
                {text:'设置中心',icon:images.setting_blue},
                {text:'菜单管理',icon:images.sitemap_blue,onPress:()=>{
                  alert('test');
                }}
              ]}
            />
          </View>
        );
      },attrs:[
        {title:'style',subTitle:'object',desc:'视图的样式'},
        {title:'size',subTitle:'number',desc:'视图的大小,默认为64'},
        {title:'textStyle',subTitle:'object',desc:'视图文本的样式'},
        {title:'text',subTitle:'string',desc:'显示的文本'},
        {title:'icon',subTitle:'object',desc:'显示的图标'},
        {title:'iconStyle',subTitle:'object',desc:'图标的样式'},
        {title:'iconSize',subTitle:'number',desc:'图标的大小，默认为视图大小的一半'},
        {title:'border',subTitle:'boolean',desc:'是否显示边框'},
        {title:'onPress',subTitle:'function',desc:'视图点击事件'}
      ]},
      {title:'UILine',desc:'显示一行的组件，支持图标、通知、开关等各种场景，还可以自定义显示一行的组件。',examples:()=>{
        return(
          <View>
            <UILine title={'只有标题的行'}/>
            <UILine title={'标题'} desc={'不但有标题，还有描述信息哦'}/>
            <UILine title={'可以点击'} desc={'有标题、描述，还可以点击哦'} onPress={()=>{alert('点击事件')}}/>
            <UILine title={'图标和通知'} subTitle={'hot'} desc={'查看个人主页'} badge={1} onPress={()=>{alert('查看个人主页')}} icon={()=>{
              return <UIImage style={{width:32,height:32}} icon={images.user}/>
            }}/>
            <UILine title={'启用'} desc={'启用开关'} bool={true} switchValue={true} onValueChange={(bool)=>{
              alert(bool);
            }}/>
            <UILine  title={'系统角色'} value={'系统管理员系统管理员系统管理员系统管理员系统管理员系统管理员系统管理员'}/>
          </View>
        );
      },attrs:[
        {title:'title',subTitle:'string',desc:'行标题文本'},
        {title:'subTitle',subTitle:'string',desc:'行子标题文本'},
        {title:'desc',subTitle:'string',desc:'行描述文本'},
        {title:'height',subTitle:'number',desc:'行高，默认为48'},
        {title:'bottomBorder',subTitle:'boolean',desc:'是否存在底边框，默认为true'},
        {title:'bool',subTitle:'boolean',desc:'是否在右侧显示switch组件,默认不显示'},
        {title:'switchValue',subTitle:'boolean',desc:'switch组件的值，true|false'},
        {title:'disabled',subTitle:'boolean',desc:'switch是否被禁用'},
        {title:'lineStyle',subTitle:'object',desc:'行组件样式'},
        {title:'leftStyle',subTitle:'object',desc:'左侧区域样式'},
        {title:'centerStyle',subTitle:'object',desc:'中间内容区域样式'},
        {title:'icon',subTitle:'function',desc:'左侧显示的图标'},
        {title:'titleLines',subTitle:'number',desc:'行标题最多显示几行'},
        {title:'descLines',subTitle:'number',desc:'描述内容最多显示几行'}
      ],events:[
        {title:'onValueChange',subTitle:'function',desc:'switch组件值切换事件'},
      ]},
      {title:'UIListView',desc:'自定义ListView组件'},
      {title:'UIModal',desc:'弹出框组件'},
      {title:'UINavigatorTab',desc:'Tab导航器'},
      {title:'UIPage',desc:'自定义页面组件'},
      {title:'UITab',desc:'页签组件'},
      {title:'UITabItem',desc:'页签项组件'},
      {title:'UITouchable',desc:'自定义点击组件，封装框架自带的点击组件，并根据平台自动适用组件',attrs:[
        {title:'touchableType',subTitle:'string',desc:'点击组件类型，ios下默认为TouchableOpacity，android下默认为TouchableNativeFeedback，可选值TouchableHighlight|TouchableNativeFeedback|TouchableOpacity|TouchableWithoutFeedback'}
      ]},
      {title:'UIViewPager',desc:'页面容器组件'}
    ]
  }
}
