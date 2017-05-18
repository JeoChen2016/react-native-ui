
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Vibration,
  ToastAndroid,
  DatePickerAndroid,
  TimePickerAndroid,
  Dimensions,
  Share,
  ActionSheetIOS
} from 'react-native';

import {
    UILine,
    UIListView
} from '../react-native-ui';
import DocDetail from './DocDetail';

export default class ApiList extends Component {
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
      {title:'ActionSheetIOS',subTitle:'ios',desc:'IOS操作弹出框',methods:[
        {title:'showActionSheetWithOptions(options:Object,callback:Function)',desc:'在iOS设备上显示一个ActionSheet弹出框，其中options参数为一个对象，其属性必须包含以下一项或多项：\n1、options：字符串数组，一组按钮的标题，必选\n2、cancelButtonIndex：int类型，选项中取消按钮所在的位置（索引）\n3、destructiveButtonIndex：int类型选项中删除按钮所在的位置（索引）\n4、title：字符串，弹框顶部的标题\n5、message：字符串，弹框顶部的标题下方的提示信息\n\ncallback是按钮点击回调函数，参数为按钮的索引'},
        {title:'showShareActionSheetWithOptions(options:Object,failureCallback:Function,successCallback:Function)',desc:'在iOS设备上显示一个分享弹出框，其中options参数为一个对象，其属性包含以下几项（必须至少有message或url）：\n1、message：string 分享的内容消息\n2、url string 分享的url\n3、subject string 分享的信息主题\n4、excludedActivityTypes array 指定在actionsheet中不显示的活动\n\n注：如果url指向本地文件，或者是一个base64编码的url，则会直接读取并分享相应的文件。你可以用这样的方式来分享图片、视频以及PDF文件等。'}
      ]},
      {title:'AdSupportIOS',methods:[
        {title:'getAdvertisingId(onSuccess:Function,onFailure:Function)',desc:''},
        {title:'getAdvertisingTrackingEnabled(onSuccess:Function,onFailure:Function)',desc:''}
      ]},
      {title:'Alert',desc:'启动一个提示对话框，包含对应的标题和信息。你还可以指定一系列的按钮，点击对应的按钮会调用对应的onPress回调并且关闭提示框。默认情况下，对话框会仅有一个确定按钮。本接口可以在iOS和Android上显示一个静态的提示框。如果要在显示提示框的同时接受用户输入一些信息，那你可能需要AlertIOS',methods:[
        {title:'alert(title:string, message?:string, button?:Buttons,type?:AlertType)'}
      ]},
      {title:'AlertIOS',desc:'启动一个提示对话框，包含对应的标题和信息。你还可以指定一系列的按钮，点击对应的按钮会调用对应的onPress回调并且关闭提示框。默认情况下，对话框会仅有一个确定按钮。这个API主要用于需要iOS特有功能的场景，比如提示用户输入一些信息等。其他情况下，尤其是仅仅显示一个静态的提示框时，应该使用跨平台的Alert接口。',methods:[
        {title:'alert(title:string,message?:string,buttons?:Array,type?:AlertType)',desc:'弹出一个提示框，指定标题和提示信息，按钮配置如下：\n1、text:string 按钮文本\n2、onPress:Function 按钮点击事件\n3、style:AlertButtonStyle对象样式'},
        {title:'prompt(title:string,value?:string,buttons?:Array,callback?:Function)',desc:'弹出一个提示框，指定标题和提示信息，按钮配置如下：\n1、text:string 按钮文本\n2、onPress:Function 按钮点击事件\n3、style:AlertButtonStyle对象样式'}
      ]},
      {title:'Animated',desc:'动画库'},
      {title:'AppRegistry',desc:'AppRegistry是JS运行所有React Native应用的入口'},
      {title:'AsyncStorage',desc:'AsyncStorage是一个简单的、异步的、持久化的Key-Value存储系统'},
      {title:'BackAndroid',desc:'监听硬件的back键操作。'},
      {title:'CameraRoll',desc:'CameraRoll模块提供了访问本地相册的功能。'},
      {title:'Clipboard',desc:'Clipboard组件可以在iOS和Android的剪贴板中读写内容。'},
      {title:'DatePickerAndroid',subTitle:'android',desc:'本组件会打开一个标准的Android日期选择器的对话框。',examples:()=>{
        return (
          <View>
            <UILine title={'打开一个默认日期选择框'} desc={'不设置任何配置打开一个默认日期选择框'} onPress={async ()=>{
                const {action, year, month, day} = await DatePickerAndroid.open();
                if (action !== DatePickerAndroid.dismissedAction) {
                  alert(year+"-"+(month+1)+'-'+day);
                }
            }}/>
            <UILine title={'打开一个指定时间选择框'} desc={'设置date属性打开指定日期的日期选择框'} onPress={async ()=>{
               const {action, year, month, day} = await DatePickerAndroid.open({
                 date:new Date(2017,4,9)
               });
                if (action !== DatePickerAndroid.dismissedAction) {
                  alert(year+"-"+(month+1)+'-'+day);
                }
            }}/>
            <UILine title={'打开一个指定最小时间选择框'} desc={'设置minDate打开一个指定最小时间选择框'} onPress={async ()=>{
               const {action, year, month, day} = await DatePickerAndroid.open({
                 minDate:new Date(2017,4,9)
               });
                if (action !== DatePickerAndroid.dismissedAction) {
                  alert(year+"-"+(month+1)+'-'+day);
                }
            }}/>
            <UILine title={'打开一个指定最大时间选择框'} desc={'设置maxDate打开一个指定最大时间选择框'} onPress={async ()=>{
               const {action, year, month, day} = await DatePickerAndroid.open({
                 maxDate:new Date(2017,4,15)
               });
                if (action !== DatePickerAndroid.dismissedAction) {
                  alert(year+"-"+(month+1)+'-'+day);
                }
            }}/>
            <UILine title={'打开default模式日期选择框'} desc={'打开一个跟随平台风格的日期选择框'} onPress={async ()=>{
                const {action, year, month, day} = await DatePickerAndroid.open({mode:'default'});
                if (action !== DatePickerAndroid.dismissedAction) {
                  alert(year+"-"+(month+1)+'-'+day);
                }
            }}/>
            <UILine title={'打开calendar模式日期选择框'} desc={'打开一个日历风格的日期选择框'} onPress={async ()=>{
                const {action, year, month, day} = await DatePickerAndroid.open({mode:'calendar'});
                if (action !== DatePickerAndroid.dismissedAction) {
                  alert(year+"-"+(month+1)+'-'+day);
                }
            }}/>
            <UILine title={'打开spinner模式日期选择框'} desc={'打开一个下拉选项风格的日期选择框'}  onPress={async ()=>{
                const {action, year, month, day} = await DatePickerAndroid.open({mode:'spinner'});
                if (action !== DatePickerAndroid.dismissedAction) {
                  alert(year+"-"+(month+1)+'-'+day);
                }
            }}/>
          </View>
        );
      },methods:[
        {title:'open(options:Object)',desc:'打开一个标准的Android日期选择器的对话框。\n可选的options对象的key值如下：\n1、date (Date对象或毫秒时间戳) - 默认显示的日期。\n2、minDate (Date对象或毫秒时间戳) - 可选的最小日期。\n3、maxDate (Date对象或毫秒时间戳) - 可选的最大日期。\n4、mode enum("calendar","spinner","default")设置选择器的模式'},
        {title:'dateSetAction()',desc:"已选中一个日期。"},
        {title:'dismissedAction()',desc:"取消对话框。"}
      ]},
      {title:'Dimensions',desc:'本模块用于获取设备屏幕的宽高。',examples:()=>{
        return (
          <View>
              <UILine title={'获取应用屏幕宽度'} desc={"Dimensions.get('window').width"} onPress={()=>{
                  alert(Dimensions.get('window').width);
              }}/>
              <UILine title={'获取应用屏幕高度度'} desc={"Dimensions.get('window').height"} onPress={()=>{
                  alert(Dimensions.get('window').height);
              }}/>
              <UILine title={'获取手机屏幕宽度'} desc={"Dimensions.get('screen').width"} onPress={()=>{
                  alert(Dimensions.get('screen').width);
              }}/>
              <UILine title={'获取手机屏幕高度'} desc={"Dimensions.get('screen').height"} onPress={()=>{
                  alert(Dimensions.get('screen').height);
              }}/>
          </View>
        );
      },methods:[
        {title:'set(dims:{[key:string]:any})',desc:'这个函数只应该被原生代码调用。@param {object} dims 一个简单的字符串作为key的对象，包含了需要设置的尺寸信息。'},
        {title:'get(dim: string)',desc:"初始的尺寸信息应该在runApplication之后被执行，所以它可以在任何其他的require被执行之前就可用。不过在稍后可能还会更新。注意：尽管尺寸信息立即就可用，但它可能会在将来被修改（譬如设备的方向改变），所以基于这些常量的渲染逻辑和样式应当每次render之后都调用此函数，而不是将对应的值保存下来。（举例来说，你可能需要使用内联的样式而不是在StyleSheet中保存相应的尺寸）。\n例子：var {height, width} = Dimensions.get('window');\n@param {string} dim 想要获取的尺寸信息的字段名。\n@returns {Object?} 返回的尺寸信息值。"}
      ]},
      {title:'Share',desc:'打开一个对话框来共享文本内容。在iOS中，返回一个Promise，它将被调用一个包含action的对象，activityType。 如果用户关闭对话框，则Promise仍将被解析，而ActionDisissedAction和所有其他键未被定义。在Android中，返回一个Promise，它始终使用Share.sharedAction操作来解决。',examples:()=>{
        return (
          <View>
              <UILine title={'分享消息内容'} desc={"Share.share({message:'React Native分享内容'})"} onPress={()=>{
                  Share.share({message:'React Native分享内容'});
              }}/>
              <UILine title={'分享消息内容并带消息标题'} desc={"Share.share({message:'React Native分享内容',title:'React Native 分享'})"} onPress={()=>{
                  Share.share({message:'React Native分享内容',title:'React Native 分享'});
              }}/>
              <UILine title={'分享内容、标题并带分享框标题'} desc={"Share.share({message:'React Native分享内容',title:'React Native 分享'},{dialogTitle:'分享'})"} onPress={()=>{
                  Share.share({message:'React Native分享内容',title:'React Native 分享'},{dialogTitle:'分享'});
              }}/>
          </View>
        ); 
      },methods:[
        {title:'share(content,options)',desc:'content对象配置如下：\n1、title:消息的标题\n2、message:分享的消息内容\n3、url:分享的网址,ios平台才支持\n\noptions配置如下：\n1、dialogTitle:分享标题,android下才支持\n2、excludeActivityTypes:指定不显示的分享对象，ios属性\n3、tintColor:按钮颜色,ios属性'},
        {title:'sharedAction()',desc:'内容被成功分享'},
        {title:'dismissedAction()',desc:'该分享对话被拒绝，ios才有该方法'},
      ]},
      {title:'PixelRatio',desc:'PixelRatio类提供了访问设备的像素密度的方法。',methods:[
        {title:'presentLocalNotification(details:Object)',desc:'立即产生一个本地通知，details是一个对象，配置如下：'}
      ]},
      {title:'PushNotificationIOS',subTitle:'ios',desc:'本模块帮助你处理应用的推送通知，包括权限控制以及应用图标上的角标数（未读消息数）。',methods:[
        {title:'presentLocalNotification(details:Object)',desc:'立即产生一个本地通知，details是一个对象，配置如下：'}
      ]},
      {title:'StyleSheet',desc:'StyleSheet提供了一种类似CSS样式表的抽象',methods:[
        {title:'create(obj: {[key: string]: any})',desc:'创建一个样式表'}
      ]},
      {title:'Systrace',desc:'Systrace是一个标准的基于标记的Android性能分析工具（如果你安装了Android platform-tool包，它也会一同安装）。被调试的代码段在开始和结束处加上标记，在执行的过程中标记会被记录，最后会以图表形式展现统计结果。包括Android SDK自己和React Native框架都已经提供了标准的标记供你查看。',methods:[
        {title:'setEnabled(enabled)',desc:'是否启用性能分析工具'}
      ]},
      {title:'TimePickerAndroid',subTitle:'android',desc:'本组件会打开一个标准的Android时间选择器的对话框。',examples:()=>{
        return (
          <View>
            <UILine title={'打开一个默认时间选择框'} onPress={async ()=>{
                const {action, hour, minute} = await TimePickerAndroid.open();
                if (action !== TimePickerAndroid.dismissedAction) {
                  alert(hour+":"+minute);
                }
            }}/>
            <UILine title={'打开一个指定时间选择框'} onPress={async ()=>{
               const {action, hour, minute} = await TimePickerAndroid.open({
                 hour:12,
                 minute:30
               });
                if (action !== TimePickerAndroid.dismissedAction) {
                  alert(hour+":"+minute);
                }
            }}/>
            <UILine title={'打开一个非24小时制的时间选择框'} onPress={async ()=>{
               const {action, hour, minute} = await TimePickerAndroid.open({
                 is24Hour:false
               });
                if (action !== TimePickerAndroid.dismissedAction) {
                  alert(hour+":"+minute);
                }
            }}/>
          </View>
        );
      },methods:[
        {title:'open(options:Object)',desc:'打开一个标准的Android时间选择器的对话框。\n可选的options对象的key值如下：\n1、hour (0-23) - 要显示的小时，默认为当前时间。\n2、minute (0-59) - 要显示的分钟，默认为当前时间。\n3、is24Hour (boolean) - 如果设为true，则选择器会使用24小时制。如果设为false，则会额外显示AM/PM的选项。如果不设定，则采取当前地区的默认设置。\n在用户选好时间后返回一个Promise，回调参数为一个对象，其中包含有action, hour (0-23), minute (0-59)。如果用户取消了对话框，Promise仍然会执行，返回的action为TimePickerAndroid.dismissedAction，其他几项参数则为undefined。所以请在使用其他值之前务必先检查action的值。'},
        {title:'timeSetAction()',desc:"已选中一个时间。"},
        {title:'dismissedAction()',desc:"取消对话框。"}
      ]},
      {title:'ToastAndroid',subTitle:'android',desc:'本模块将原生的ToastAndroid模块导出为一个JS模块，用于在Android设备上显示一个悬浮的提示信息。',examples:()=>{
        return (
            <View>
              <UILine title={'ToastAndroid.show("提示信息",ToastAndroid.SHORT)'} desc={'指定时长的提示，短时间提示'} onPress={()=>{
                ToastAndroid.show("提示信息",ToastAndroid.SHORT)
              }}/>
            <UILine title={'ToastAndroid.show("提示信息",ToastAndroid.LONG)'} desc={'指定时长的提示，长时间提示'} onPress={()=>{
                ToastAndroid.show("提示信息",ToastAndroid.LONG)
              }}/>
              <UILine title={'ToastAndroid.showWithGravity("提示信息",ToastAndroid.SHORT,ToastAndroid.CENTER)'} desc={'指定位置的提示'} onPress={()=>{
                ToastAndroid.showWithGravity("提示信息",ToastAndroid.LONG,ToastAndroid.CENTER)
              }}/>
            </View>
          );
      },methods:[
        {title:'show(message:string,duration:number)',desc:'显示提示信息\n1、message:提示内容。\n2、duration:提示信息显示的时长，默认可选值为ToastAndroid.SHORT or ToastAndroid.LONG。'},
        {title:'showWithGravity(message:string,duration:number,gravity:number)',desc:'显示提示信息，并可指定时长和位置\n1、message:提示内容。\n2、duration:提示信息显示的时长，默认可选值为ToastAndroid.SHORT or ToastAndroid.LONG，也可指定时长。\n3、gravity:显示的位置，可选值ToastAndroid.TOP,ToastAndroid.BOTTOM,ToastAndroid.CENTER'}
      ]},
      {title:'Vibration',desc:'本模块导出函数Vibration.vibrate()用于控制设备震动。震动触发是异步的，也就是说这个函数会立即返回而非等待震动结束。在不支持震动的设备上（如iOS模拟器），调用此方法没有任何效果。注意对于android来说需要在AndroidManifest.xml中添加<uses-permission android:name="android.permission.VIBRATE"/>权限。震动模式设置现在还不支持。',examples:()=>{
          return (
            <View>
              <UILine title={'Vibration.vibrate()'} desc={'无参数调用'} onPress={()=>{
                Vibration.vibrate();
              }}/>
              <UILine title={'Vibration.vibrate(2000)'} desc={'连续震动2秒'} onPress={()=>{
                Vibration.vibrate(2000);
              }}/>
              <UILine title={'Vibration.vibrate([0,500,200,500])'} desc={'震动0.5秒，停顿0.2秒再震动0.5秒'} onPress={()=>{
                Vibration.vibrate([0,500,200,500]);
              }}/>
              <UILine title={'Vibration.vibrate([300,500,200,500])'} desc={'停顿0.3秒后震动0.5秒，停顿0.2秒再震动0.5秒'} onPress={()=>{
                Vibration.vibrate([300,500,200,500]);
              }}/>
              <UILine title={'Vibration.vibrate([300,500,200,500],true)'} desc={'重复震动，注意要调用cancel方法取消，否则会一直震动下去'} onPress={()=>{
                Vibration.vibrate([300,500,200,500],true);
                setTimeout(function(){
                  Vibration.cancel();
                },10000);
              }}/>
            </View>
          );
      },methods:[
        {title:'vibrate(pattern:number|number[],repeat:boolean)',desc:'控制设备震动\n1、pattern:参数为一个不定长的数组。在Andriod上，数组第一个元素表示开始震动前的等待时间，然后是震动持续时长和等待时长的交替，例如[0, 500, 1000, 500]表示立刻开始震动500ms，然后等待1000ms，再震动500ms；但在iOS上震动时长是固定的，所以从数组第二个元素开始都是表示震动的间隔时长。\n2、repeat:表示是否持续循环震动。为true时只有调用cancel才会停止。'},
        {title:'cancel()',desc:'取消设备震动'}
      ]},
    ]
  }
}
