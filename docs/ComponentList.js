
import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  WebView,
  ScrollView
} from 'react-native';

import {
    UILine,
    UIListView
} from '../react-native-ui';
import DocDetail from './DocDetail';

export default class ComponentList extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <UIListView
          renderRow={(row)=>{
            return <UILine 
                      title={row.title} 
                      desc={row.desc}
                      subTitle={row.subTitle}
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
      {title:'ActivityIndicator',desc:'显示一个圆形的loading提示符号。',attrs:[
        {title:'animating',subTitle:'bool',desc:'是否要显示指示器，默认为true，表示显示。'},
        {title:'color',subTitle:'string',desc:'滚轮的前景颜色（默认颜色跟随系统）'},
        {title:'size',subTitle:"enum('small','large')",desc:'指示器的大小。small的高度为20，large为36'},
        {title:'hidesWhenStopped',subTitle:"bool",platform:'ios',desc:'在没有动画的时候，是否要隐藏指示器（默认为true）'}
      ],examples:()=>{
        return (
          <View>
            <UILine title={'默认的loading指示器'} desc={'<ActivityIndicator />'} icon={()=>{
              return <ActivityIndicator />
            }}/>
            <UILine title={'small大小的loading指示器'} desc={"<ActivityIndicator size={'small'}/>"} icon={()=>{
              return <ActivityIndicator size={'small'}/>
            }}/>
            <UILine title={'large大小的loading指示器'} desc={"<ActivityIndicator size={'large'}/>"} icon={()=>{
              return <ActivityIndicator size={'large'}/>
            }}/>
            <UILine title={'指定颜色的loading指示器'} color={'red'} desc={"<ActivityIndicator  color={'red'} size={'large'}/>"} icon={()=>{
              return <ActivityIndicator  color={'red'} size={'large'}/>
            }} lineStyle={{borderBottomWidth:1,borderBottomColor:'#ededed'}} bottomBorder={false}/>
          </View>
        );
      }},
      {title:'DatePickerIOS',desc:'iOS平台下的日期/时间选择器。',subTitle:'ios',attrs:[
        {title:'date',subTitle:'Date',desc:'当前被选中的日期'},
        {title:'maximumDate',subTitle:'Date',desc:'可选的最大日期。限制可选的日期/时间范围'},
        {title:'minimumDate',subTitle:"Date",desc:'可选的最小日期。限制可选的日期/时间范围'},
        {title:'minuteInterval',subTitle:"enum(1,2,3,4,5,6,10,12,15,20,30)",desc:'可选的最小的分钟单位'},
        {title:'mode',subTitle:"enum('date','time','datetime')",desc:'选择器模式'},
        {title:'timeZoneOffsetInMinutes',subTitle:"number",desc:'时区差，单位是分钟。默认为设备时区。北京时区传8*60'}
      ],events:[
        {title:'onDateChange',subTitle:"function",desc:'日期选择回调函数。参数为选择的日期或时间'}
      ]},
      {title:'DrawerLayoutAndroid',desc:'封装了平台DrawerLayout（仅限安卓平台）的React组件。抽屉（通常用于导航切换）是通过renderNavigationView方法渲染的，并且DrawerLayoutAndroid的直接子视图会成为主视图（用于放置你的内容）。导航视图一开始在屏幕上并不可见，不过可以从drawerPosition指定的窗口侧面拖拽出来，并且抽屉的宽度可以使用drawerWidth属性来指定。',subTitle:'android',attrs:[
        {title:'drawerLockMode',subTitle:"enum('unlocked','locked-closed','locked-open')",desc:'设置抽屉的锁定模式。有三种状态：\n1、unlocked (默认值)，意味着此时抽屉可以响应打开和关闭的手势操作。\n2、locked-closed，意味着此时抽屉将保持关闭，不可用手势打开。\n3、locked-open，意味着此时抽屉将保持打开，不可用手势关闭。'},
        {title:'drawerPosition',subTitle:'enum(DrawerConsts.DrawerPosition.Left, DrawerConsts.DrawerPosition.Right)',desc:'指定抽屉可以从屏幕的哪一边滑入'},
        {title:'drawerWidth',subTitle:"number",desc:'指定抽屉的宽度，也就是从屏幕边缘拖进的视图的宽度'},
        {title:'keyboardDismissMode',subTitle:"enum('none', 'on-drag')",desc:'指定在拖拽的过程中是否要隐藏软键盘。\n1、none (默认值)，拖拽不会隐藏软键盘。\n2、on-drag 当拖拽开始的时候隐藏软键盘。'}
      ],events:[
        {title:'onDrawerClose',subTitle:"function",desc:'每当导航视图（抽屉）被关闭之后调用此回调函数'},
        {title:'onDrawerOpen',subTitle:"function",desc:'每当导航视图（抽屉）被打开之后调用此回调函数'},
        {title:'onDrawerSlide',subTitle:"function",desc:'每当导航视图（抽屉）产生交互的时候调用此回调函数'},
        {title:'onDrawerStateChanged',subTitle:"function",desc:'每当抽屉的状态变化时调用此回调函数。抽屉可以有3种状态：\n1、idle（空闲），表示现在导航条上没有任何正在进行的交互。\n2、dragging（拖拽中），表示用户正在与导航条进行交互。\n3、settling（停靠中），表示用户刚刚结束与导航条的交互，导航条正在结束打开或者关闭的动画。'},
        {title:'renderNavigationView',subTitle:"function",desc:'此方法用于渲染一个可以从屏幕一边拖入的导航视图'}
      ]},
      {title:'Image',desc:'一个用于显示多种不同类型图片的React组件，包括网络图片、静态资源、临时的本地图片、以及本地磁盘上的图片（如相册）等',attrs:[
        {title:'resizeMode',subTitle:"enum('cover', 'contain', 'stretch')",desc:'决定当组件尺寸和图片尺寸不成比例的时候如何调整图片的大小：\n1、cover: 在保持图片宽高比的前提下缩放图片，直到宽度和高度都大于等于容器视图的尺寸（如果容器有padding内衬的话，则相应减去）。译注：这样图片完全覆盖甚至超出容器，容器中不留任何空白。\n2、contain: 在保持图片宽高比的前提下缩放图片，直到宽度和高度都小于等于容器视图的尺寸（如果容器有padding内衬的话，则相应减去）。译注：这样图片完全被包裹在容器中，容器中可能留有空白。\n3、stretch: 拉伸图片且不维持宽高比，直到宽高都刚好填满容器。'},
        {title:'source',subTitle:'{uri: string}, number',desc:'uri是一个表示图片的资源标识的字符串，它可以是一个http地址或是一个本地文件路径（使用require(相对路径)来引用）。'},
        {title:'testID',subTitle:"string",desc:'一个唯一的资源标识符，用来在自动测试脚本中标识这个元素。'},
        {title:'accessibilityLabel',subTitle:"string",platform:'ios',desc:'当用户与图片交互时，读屏器（无障碍功能）会朗读的文字。'},
        {title:'accessible',subTitle:"bool",platform:'ios',desc:'当此属性为真的时候，表示这个图片是一个启用了无障碍功能的元素。'},
        {title:'blurRadius',subTitle:"number",platform:'ios',desc:'blurRadius(模糊半径)：为图片添加一个指定半径的模糊滤镜。'},
        {title:'capInsets',subTitle:"{top:number,left:number,bottom:number,right:number}",platform:'ios',desc:'当图片被缩放的时候，capInsets指定的角上的尺寸会被固定而不进行缩放，而中间和边上其他的部分则会被拉伸。这在制作一些可变大小的圆角按钮、阴影、以及其它资源的时候非常有用。'},
      ],events:[
        {title:'onLayout',subTitle:"function",desc:'当元素挂载或者布局改变的时候调用，参数为：{nativeEvent: {layout: {x, y, width, height}}}'},
        {title:'onLoad',subTitle:"function",desc:'加载成功完成时调用此回调函数'},
        {title:'onLoadEnd',subTitle:"function",desc:'加载结束后，不论成功还是失败，调用此回调函数。'},
        {title:'onLoadStart',subTitle:"function",desc:'加载开始时调用。'},
        {title:'onError',subTitle:"function",platform:'ios',desc:'当加载错误的时候调用此回调函数，参数为{nativeEvent: {error}}'},
        {title:'onProgress',subTitle:"function",platform:'ios',desc:'在加载过程中不断调用，参数为{nativeEvent: {loaded, total}}'}
      ]},
      {title:'KeyboardAvoidingView',desc:'手机上弹出的键盘常常会挡住当前的视图。本组件可以自动根据键盘的位置'},
      {title:'ListView',desc:'ListView - 一个核心组件，用于高效地显示一个可以垂直滚动的变化的数据列表'},
      {title:'ListView.DataSource',desc:'ListViewDataSource为ListView组件提供高性能的数据处理和访问'},
      {title:'MapView',desc:'地图视图组件'},
      {title:'Modal',desc:'Modal组件可以用来覆盖包含React Native根视图的原生视图。'},
      {title:'Navigator',desc:'使用导航器可以让你在应用的不同场景（页面）间进行切换。'},
      {title:'NavigatorIOS',desc:'IOS版本导航器。',subTitle:'ios'},
      {title:'Picker',desc:'本组件可以在iOS和Android上渲染原生的选择器（Picker）。'},
      {title:'PickerIOS',desc:'iOS平台下选择器（Picker）。',subTitle:'ios'},
      {title:'ProgressBarAndroid',desc:'封装了Android平台上的ProgressBar的React组件。',subTitle:'android'},
      {title:'ProgressViewIOS',desc:'使用ProgressViewIOS来在iOS上渲染一个UIProgressView。',subTitle:'ios'},
      {title:'RefreshControl',desc:'这一组件可以用在ScrollView或ListView内部，为其添加下拉刷新的功能。'},
      {title:'ScrollView',desc:'一个包装了平台的ScrollView（滚动视图）的组件，同时还集成了触摸锁定的“响应者”系统。'},
      {title:'SegmentedControlIOS',desc:'使用SegmentedControlIOS来在iOS设备上渲染一个UISegmentedControl组件。',subTitle:'ios'},
      {title:'Slider',desc:'用于选择一个范围值的组件。'},
      {title:'StatusBar',desc:'跨平台的状态栏'},
      {title:'Switch',desc:'跨平台通用的可以在两个状态中切换的组件。'},
      {title:'TabBarIOS',desc:'iOS平台下tabbar',subTitle:'ios'},
      {title:'TabBarIOS.Item',desc:'iOS平台下tab项',subTitle:'ios'},
      {title:'Text',desc:'一个用于显示文本的React组件，并且它也支持嵌套、样式，以及触摸处理。'},
      {title:'TextInput',desc:'TextInput是一个允许用户在应用中通过键盘输入文本的基本组件'},
      {title:'ToolbarAndroid',desc:'ToolbarAndroid是一个包装了仅限Android平台的工具栏(Toolbar)部件的React组件。',subTitle:'android'},
      {title:'TouchableHighlight',desc:'本组件用于封装视图，使其可以正确响应触摸操作',subTitle:'ios'},
      {title:'TouchableNativeFeedback',desc:'本组件用于封装视图，使其可以正确响应触摸操作',subTitle:'android'},
      {title:'TouchableOpacity',desc:'本组件用于封装视图，使其可以正确响应触摸操作。当按下的时候，封装的视图的不透明度会降低'},
      {title:'TouchableWithoutFeedback',desc:'一个没有任何反馈的点击组件。'},
      {title:'View',desc:'作为创建UI时最基础的组件，View是一个支持Flexbox布局、样式、一些触摸处理、和一些无障碍功能的容器，并且它可以放到其它的视图里，也可以有任意多个任意类型的子视图。'},
      {title:'ViewPagerAndroid',desc:'一个允许在子视图之间左右翻页的容器。每一个ViewPagerAndroid的子容器会被视作一个单独的页，并且会被拉伸填满ViewPagerAndroid。注意所有的子视图都必须是纯View，而不能是自定义的复合容器。你可以给每个子视图设置样式属性譬如padding或backgroundColor。',subTitle:'android',attrs:[
        {title:'initialPage',subTitle:'number',desc:'初始选中的页的下标。你可以用setPage 函数来翻页，并且用onPageSelected来监听页的变化。'},
        {title:'keyboardDismissMode',subTitle:"enum('none', 'on-drag')",desc:'决定在滑动的时候是否要让软键盘消失。\n1、none （默认值），拖拽不会让键盘消失。\n2、on-drag， 当拖拽开始的时候会让键盘消失。'},
        {title:'scrollEnabled',subTitle:'bool',desc:'设为false时可禁止滚动。默认值为true。'},
      ],events:[
        {title:'onPageScroll',subTitle:'function',desc:'当在页间切换时（不论是由于动画还是由于用户在页间滑动/拖拽）执行。回调参数中的event.nativeEvent对象会包含如下数据：\n1、position 从左数起第一个当前可见的页面的下标。\n2、offset 一个在[0,1)（大于等于0，小于1）之间的范围，代表当前页面切换的状态。值x表示现在"position"所表示的页有(1 - x)的部分可见，而下一页有x的部分可见'},
        {title:'onPageScrollStateChanged',subTitle:'function',desc:'页面滑动状态变化时调用此回调函数。页面滑动状态可能为以下三种之一：\n1、idle 空闲，意味着当前没有交互。\n2、dragging 拖动中，意味着当前页面正在被拖动。\n3、settling 处理中，意味着当前页面发生过交互，且正在结束开头或收尾的动画。'},
        {title:'onPageSelected',subTitle:'function',desc:'这个回调会在页面切换完成后（当用户在页面间滑动）调用。回调参数中的event.nativeEvent对象会包含如下的字段：\n1、position 当前被选中的页面下标。'},
      ]},
      {title:'WebView',desc:'创建一个原生的WebView，可以用于访问一个网页。',examples:()=>{
        return (
          <ScrollView>
            <WebView 
              style={{height:400}}
              source={{uri:'https://www.baidu.com'}}
            />
          </ScrollView>);
      },attrs:[
        {title:'allowsInlineMediaPlayback',subTitle:'bool',platform:'ios',desc:'指定HTML5视频是在网页当前位置播放还是使用原生的全屏播放器播放。 默认值为false。注意 : 要让视频在网页中播放，不光要将这个属性设为true，HTML中的视频元素本身也需要包含webkit-playsinline属性。'},
        {title:'automaticallyAdjustContentInsets',subTitle:'bool'},
        {title:'bounces',subTitle:'bool',platform:'ios'},
        {title:'contentInset',subTitle:'object{top:number,left:number,bottom:number,right: number}'},
        {title:'decelerationRate',subTitle:'ScrollView.propTypes.decelerationRate',platform:'ios',desc:'指定一个浮点数，用于设置在用户停止触摸之后，此视图应以多快的速度停止滚动。也可以指定预设的字符串值，如"normal"和"fast"，分别对应UIScrollViewDecelerationRateNormal 和UIScrollViewDecelerationRateFast。\n1、normal（正常速度）: 0.998\n2、fast（较快速度）: 0.9 (iOS WebView的默认值)'},
        {title:'domStorageEnabled',subTitle:'bool',platform:'android',desc:'仅限Android平台。指定是否开启DOM本地存储。'},
        {title:'html',subTitle:'string',desc:'已过期，使用source代替。'},
        {title:'injectedJavaScript ',subTitle:'string',desc:'设置在网页加载之前注入的一段JS代码。'},
        {title:'mediaPlaybackRequiresUserAction ',subTitle:'bool',desc:'设置页面中的HTML5音视频是否需要在用户点击后再开始播放。默认值为false'},
        {title:'javaScriptEnabled ',subTitle:'bool',platform:'android',desc:'仅限Android平台。iOS平台JavaScript是默认开启的。'},
        {title:'source',subTitle:'object{uri: string, method: string, headers: object, body: string}, {html: string, baseUrl: string}, number',desc:'在WebView中载入一段静态的html代码或是一个url（还可以附带一些header选项）。'},
        {title:'scalesPageToFit',subTitle:'bool',desc:'设置是否要把网页缩放到适应视图的大小，以及是否允许用户改变缩放比例。'},
        {title:'scrollEnabled',subTitle:'bool',platform:'ios',desc:'已过期，使用source代替。'},
        {title:'startInLoadingState',subTitle:'bool'},
        {title:'url',subTitle:'string',desc:'已过期，使用source代替。'},
        {title:'userAgent',subTitle:'string',platform:'android',desc:'为WebView设置user-agent字符串标识。这一字符串也可以在原生端用WebViewConfig来设置,但js端的设置会覆盖原生端的设置。'},
      ],events:[
        {title:'onError',subTitle:'function',desc:'加载失败时调用。'},
        {title:'onLoad',subTitle:'function',desc:'加载成功时调用。'},
        {title:'onLoadEnd',subTitle:'function',desc:'加载结束时（无论成功或失败）调用。'},
        {title:'onLoadStart',subTitle:'function',desc:'加载开始时调用。'},
        {title:'onNavigationStateChange',subTitle:'function'},
        {title:'onShouldStartLoadWithRequest',platform:'ios',subTitle:'function',desc:'允许为webview发起的请求运行一个自定义的处理函数。返回true或false表示是否要继续执行响应的请求。'},
        {title:'renderError',subTitle:'function',desc:'设置一个函数，返回一个视图用于显示错误。'},
        {title:'renderLoading',subTitle:'function',desc:'设置一个函数，返回一个加载指示器。'}
      ]}
    ]
  }
}
