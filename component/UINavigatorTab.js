/**
 * 导航tab组件
 */

'use strict';

import React from 'react';
import {
    View,
    Text,
    Navigator,
    TouchableNativeFeedback,
    ViewPagerAndroid,
    ToastAndroid,
    BackAndroid,
    StatusBar
} from 'react-native';

import {UIHeader,UITouchable,UIImageView} from '../react-native-ui';

export default class UINavigatorTab extends React.Component{
    render(){
        //自定义的Navigator场景
        const {configureScene}=this.props;
        return(
            <View style={styles.uitab}>
                <StatusBar backgroundColor={'#01AAED'}/>
                <Navigator 
                    initialRoute={{ component: UINavigatorTabView}}
                    configureScene={(route) => {
                        return configureScene?configureScene:Navigator.SceneConfigs.FloatFromRight;
                    }}
                    renderScene={(route, navigator) => {
                        let Component = route.component;
                        return <Component {...route.params} {...this.props} navigator={navigator} />
                }} />
            </View>
        );
    }
};

class UINavigatorTabView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex:props.selectedIndex?props.selectedIndex:0
        };
    }
    render(){    
        return(
            <View style={styles.uitab}>
                {/**头部标题 */}
                {this.renderHeader()}
                
                {/**内容区域 */}
                {this.renderViewPage()}

                {/**底部tab */}
                {this.renderTab()}
            </View>
        );
    }
    /**
     * 渲染头部标题
     */
    renderHeader(){
        let {
            hideHeader,     //是否隐藏头部
            tabItems,        //tab项数组
            header,
            toolbars
        } =this.props;

        //如果设置隐藏头部，则不渲染头部
        if(hideHeader || !tabItems || tabItems.length==0){
            return null;
        }else{
            //设置标题
            let title=tabItems[this.state.selectedIndex].text;
            let toolbar=toolbars||[]
            let tabItemToolbar=tabItems[this.state.selectedIndex].toolbars;
            if(tabItemToolbar){
                toolbar=toolbar.concat(tabItemToolbar);
            }
            return (
                <UIHeader toolbars={toolbar} title={title} {...header} />
            );
        }
    }

    /**
     * 渲染内容page页面
     */
    renderViewPage(){
        const index=this.state.selectedIndex;
        const {
            tabItems,        //tab项数组
            navigator
        } =this.props;
        let pages=[];
        var i=0;
        for(let tab of tabItems){
            let ComponentPage=tab.component;
            if(ComponentPage){
                pages.push(<View key={i}><ComponentPage navigator={navigator}/></View>);
            }else{
                pages.push(<View key={i}></View>);
            }   
            i++;
        }

        return(
            <ViewPagerAndroid 
                initialPage={index} 
                style={styles.uitab} 
                onPageSelected={this.onPageSelected.bind(this)}
                ref={viewPager => { this.viewPager = viewPager; }}
            >
                {pages}
            </ViewPagerAndroid>
        ); 
    }

    /**
     * 渲染底部tab
     */
    renderTab(){
        const index=this.state.selectedIndex;
        const {
            tabBar,
            tabItems        //tab项数组
        } =this.props;

        let tabs=[];
        var i=0;
        for(let tab of tabItems){
            tabs.push(
                <UITouchable key={i} onPress={this.selectTab.bind(this,i)}>
                    <View style={[styles.uitab_bar_center,index==i?styles.uitab_bar_selected:null]}>
                        <UIImageView text={tab.text} icon={index==i?tab.selectIcon:tab.icon} iconSize={18} textStyle={index==i?styles.uitab_bar_text_selected:styles.uitab_bar_text}/>
                    </View>
                </UITouchable>
            );
            i++;
        }

        return(
            <View style={[styles.uitab_bar,tabBar.style]}>
                {tabs}
            </View>
        ); 
    }

    /**
     * 左右切换页面
     */
    onPageSelected(e){
        let index=e.nativeEvent.position;
        this.setState({
            selectedIndex:index
        });
    }
    /**
     * 根据所以选中某个tab
     * @param {*} index 
     */
    selectTab(index){
        this.viewPager.setPage(index);
        this.setState({
            selectedIndex:index
        });
    }
    /**
     * 组件加载完成事件
     */
    componentDidMount(){
         const {
            navigator
        } =this.props;
        // 添加返回键监听 
        BackAndroid.addEventListener('hardwareBackPress',() => {  
            return this.onBackAndroid(navigator);  
        });  
    } 
    /**
     * 组件卸载事件
     */
    componentWillUnmount(){ 
        // 移除返回键监听 
        BackAndroid.removeEventListener('hardwareBackPress', () => {});
    } 
    /**
     * 返回按钮处理
     * @param {*} navigator 
     */
    onBackAndroid(navigator){
        if (!navigator) return false;  
        const routers = navigator.getCurrentRoutes();
        //如果路由数大于1则pop
        if (routers.length > 1) {
            navigator.pop();  
            return true;  
        }
        //首页2秒内点击退出
        if(this.lastBackPressed && (this.lastBackPressed+2000>Date.now())){
            BackAndroid.exitApp();
            return false;
        }
        this.lastBackPressed = Date.now();  
        ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);  
        return true;
    }
};

const styles={
    uitab:{
        flex:1
    },
    uitab_bar:{
        backgroundColor:'#F8F8F8',
        borderTopWidth:1,
        borderTopColor:'#ededed',
        flexDirection:'row',
        justifyContent:'space-around'
    },
    uitab_bar_center:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    uitab_bar_icon:{
        width:24,
        height:24
    },
    uitab_bar_text:{
        color:'#505050',
        fontSize:10
    },
    uitab_bar_text_selected:{
        color:'#1E9FFF',
        fontSize:10
    },
    uitab_bar_selected:{
        borderTopWidth:1,
        borderTopColor:'#1E9FFF'
    }
}