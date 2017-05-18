/**
 * 工具类
 */

import {
  Platform,
  Dimensions
} from 'react-native';
export default utils={
    /**
     * 获取当前平台 android | ios
     */
    platform(){
        return Platform.OS;
    },
    /**
     * 格式化日期
     */
    formatDate(datetime,format,separator){
        //根据传入的是日期对象或是时间戳初始化时间
        var now=new Date();
        if(typeof datetime ==='number'){
            now=new Date(datetime);
        }else if(typeof datetime ==='object'){
            now=datetime;
        }
        
        //获取年月日时分秒
        var year=now.getFullYear(),month=now.getMonth(),date=now.getDate(),
            hours=now.getHours(),minutes=now.getMinutes(),seconds=now.getSeconds(),
            separator=separator || '-';
        
        if(format=='datetime' || !format){//默认返回yyyy-MM-dd hh:mm:ss
            return year+separator+utils.repairZero(month+1)+separator+utils.repairZero(date)+' '+
                   utils.repairZero(hours)+':'+
                   utils.repairZero(minutes)+':'+
                   utils.repairZero(seconds);
        }else if(format=='date'){//返回yyyy-MM-dd
            return year+separator+utils.repairZero(month+1)+separator+utils.repairZero(date);
        }else if(format=='before'){//返回几分钟、几小时、几天前等
            var timeDiffer=Date.now()-now.getTime();
            return timeDiffer;
        }else if(format!=null){//返回自定义格式
            return format.replace("yyyy", year).replace("MM", utils.repairZero(month+1)).replace("dd",
						utils.repairZero(date)).replace("hh", utils.repairZero(hours)).
                        replace("mm", utils.repairZero(minutes)).replace("ss",utils.repairZero(seconds));
        }
    },
    /**
     * 格式化字符串 eg:utils.formatValue('total:{0},pageSize:{1}',56,15)='total:56,pageSize:15'
     * @param {*} str 
     */
    formatValue(str){
        var args=arguments;
        //如果无参数，则返回字符本身
        if(args.length<2){
            return this;
        }
        //如果第一个参数是数组，则用该数组去替换
        if(typeof args[1]=="object"){
            args=args[1];
        }
        //依次替换占位符
        if(args!=null && args!="undefined" && args!=""){
            for(var i=1;i<args.length; i++){
                str=str.replace(new RegExp("\\{"+(i-1)+"\\}","g"), args[i]?args[i]:"");  
            }
        }else{
            str=str.replace(new RegExp("\\{0\\}","g"), ""); 
        }
        return str.toString(); 
    },
    /**
     * 不满10补零
     * @param {*} number 
     */
    repairZero(number){
        return number<10?'0'+number:number;
    },
    getMarginLeft(width,diff){
        var diff=diff||0;
        var windowWidth=Dimensions.get('window').width;
        var colums=Math.floor((windowWidth-diff)/width);
        return (windowWidth-diff-colums*width)/(colums+1);
    },
    /**
     * fetch请求
     * @param {*} url 
     * @param {*} params 
     * @param {*} options 
     */
    fetch(url,params,options){

    },
    /**
     * get网络请求
     * @param {*} url 
     * @param {*} params 
     * @param {*} success 
     * @param {*} error 
     * @param {*} options 
     */
    get(url,params,success,error,options){

    },
    /**
     * post网络请求
     * @param {*} url 
     * @param {*} params 
     * @param {*} success 
     * @param {*} error 
     * @param {*} options 
     */
    post(url,params,success,error,options){

    }
}