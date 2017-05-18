/**
 * 列表组件
 */

import React, { Component,PropTypes} from 'react';
import {
  View,
  Text,
  Image,
  ListView,
  ActivityIndicator,
  StyleSheet
} from 'react-native';

import images from '../core/images';
import utils from '../core/utils';
import UIImageView from './UIImageView';

export default class UIListView extends Component {
    /**
     * 定义组件的props属性
     */
    static propsTypes={
        showLoading:PropTypes.bool.isRequired,      //是否显示loading
        loadingMsg:PropTypes.string,                //加载提示信息
        isLoading:PropTypes.bool.isRequired,        //是否正在loading
        renderLoading:PropTypes.func,               //自定义渲染loading
        data:PropTypes.array,                       //静态数据
        showError:PropTypes.bool.isRequired,        //是否显示异常信息
        errorMsg:PropTypes.string,                  //错误提示信息
        isError:PropTypes.bool.isRequired,          //是否加载错误
        renderError:PropTypes.func,                 //自定义渲染错误提示
        renderNoData:PropTypes.func,                //自定义渲染无数据提示
        renderRow:PropTypes.func.isRequired,         //行数据渲染
        gridSize:PropTypes.number
    }
    constructor(props) {
        super(props);
        this.dataSource=new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            isLoading:props.isLoading,
            data:props.data,
            isError:props.isError
        };
    }
    /**
     * 定义组件props默认值
     */
    static get defaultProps(){
        return {
            showLoading:true,
            loadingMsg:'数据加载中',
            isLoading:false,
            data:[],
            showError:true,
            errorMsg:'数据加载出错了，请稍后再试',
            isError:false,
            noDataMsg:'这里什么都没有哦',
            gridSize:64
        }
    }
    /**
     * 渲染组件
     */
    render() {
        return (
            <View style={[styles.uilistview]}>
                {this._render()}
            </View>
        );
    }
    _render(){
        let {showLoading,loadingMsg,showError}=this.props;
        let {isLoading,data,isError}=this.state;
        if(showLoading && isLoading){//渲染loading
            return this.renderLoading();
        }else if(showError && isError){//渲染错误提示
            return this.renderError();
        }else if(!data || data.length==0){//渲染没数据提示
            return this.renderNoData();
        }else{
            return this.renderData();
        }
    }
    /**
     * 渲染loading
     */
    renderLoading(){
        let {loadingMsg,renderLoading}=this.props;
        if(renderLoading){
            return renderLoading(this.props);
        }
        return (
            <View style={[styles.uilistview_center]}>
                <ActivityIndicator animating={true} size="large"/>
                <Text style={[styles.uilistview_text]}>{loadingMsg}</Text>
            </View>
        );
    }
    /**
     * 渲染错误提示
     */
    renderError(){
        let {errorMsg,renderError}=this.props;
        if(renderError){
            return renderError(this.props);
        }
        return (
            <View style={[styles.uilistview_center]}>
                <Image style={[styles.uilistview_error]} source={images.warning}/>
                <Text style={[styles.uilistview_text]}>{errorMsg}</Text>
            </View>
        );
    }
    /**
     * 渲染错误提示
     */
    renderNoData(){
        let {noDataMsg,renderNoData}=this.props;
        if(renderNoData){
            return renderNoData(this.props);
        }
        return (
            <View style={[styles.uilistview_center]}>
                <Image style={[styles.uilistview_error]} source={images.warning}/>
                <Text style={[styles.uilistview_text]}>{noDataMsg}</Text>
            </View>
        );
    }
    renderData(){
        let {renderRow,grid,gridRender,style}=this.props;
        let {data}=this.state;
        return(
            <ListView
                style={style}
                dataSource={this.dataSource.cloneWithRows(data)}
                renderRow={renderRow?renderRow:grid && gridRender?gridRender:this.gridRender.bind(this)}
                contentContainerStyle={grid?styles.uilistview_grid:{}}
                pageSize={100}
            />
        );
    }
    componentDidMount(){
        this._loadData();
    }
    _loadData(){
        let {data}=this.state;
        let {loadData,isLoading}=this.props;
        //如果不是加载中，设置为加载中
        if(!isLoading){
            this.setState({
                isLoading:true
            });
        }
       if(loadData){
            this.setData(loadData()||[]);
        }else if(data){
            this.setData(data);
        } 
        
    }
    /**
     * 设置数据
     * @param {*} data 
     */
    setData(data){
        try{
            //设置加载数据
            this.setState({
                isLoading:false,
                data:data||[]
            });
        }catch(e){
            //设置加载异常
            this.setState({
                isLoading:false,
                isError:true,
                data:[]
            });
        }
    }
    gridRender(row){
        let {gridSize}=this.props;
        let marginLeft=utils.getMarginLeft(gridSize);
        return <UIImageView size={gridSize} {...row} style={{marginLeft:marginLeft}}/>
    }
}

const styles = StyleSheet.create({
    uilistview:{
        flex:1
    },
    uilistview_center:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    uilistview_error:{
        width:60,
        height:60
    },
    uilistview_text:{
        fontSize:14,
        color:'#999999',
        marginTop:6
    },
    uilistview_grid:{
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center'
    }
});
