/**
 * @disc:日志服务
 * @author:yanxinaliang
 * @time：2018/6/27 14:48
 */
import { Controller } from 'egg';
import {Logger,configure,getLogger} from 'log4js';
import {Base64Util, Crypto} from '../utils/Crypto';


const apps = require("../../config/apps.json");



export default class LogController extends Controller {
    private logInstances:Map<string,Logger>=new Map();
    private getInstanceByAppName(appName:string){
        if(this.logInstances.has(appName)){
            return this.logInstances.get(appName) as Logger;
        }else{
            configure({
                appenders: {
                    out: { type: 'stdout' },
                    // server: { type: 'multiprocess', mode: 'master', appender: 'file', loggerHost: '0.0.0.0' },
                    [appName]: {
                        type: 'dateFile',
                        filename: `logs/${appName}.log`,
                        pattern:"-yyyy-MM-dd",
                        layout:{
                            type:"pattern",
                            pattern:"%p [%d{yyyy/MM/dd hh.mm.ss}] %X{host} %m"
                        }
                    },
                },
                categories: {
                    default:{
                      appenders:[appName,"out"],
                      level:"ALL"
                    },
                    [appName]:{
                        appenders:[appName,"out"],
                        level:"ALL"
                    },
                },
                disableClustering:true
                });
            const instance = getLogger(appName);
            this.logInstances.set(appName,instance);
            return instance;
        }
    }
    /**
     * appName  不支持动态创建，需要进行配置，如果config动态
     * hostName
     * location
     * level
     * content
     * ip
     * @returns {Promise<void>}
     */
    public async index() {
        const { ctx } = this;
        //<域名> <日志级别> <日志内容>
        const request = ctx.request;
        const {header} = request;
        const host=header.host;
        const params=request.query;
        const appId=params.k;
        const cipherText=params.d;
        try{
            if(apps.hasOwnProperty(appId)){
                const {appName,pubKey}=apps[appId];
                const logger:Logger=this.getInstanceByAppName(appName);
                logger.addContext("host",host);
                const data=Crypto.decrypt(Base64Util.parse(cipherText),pubKey);// 同时base64处理
                const logData=JSON.parse(data);
                const {level,content}=logData;
                switch (level){
                    case "trace":
                        logger.trace(content);
                        break;
                    case "debug":
                        logger.debug(content);
                        break;
                    case "info":
                        logger.info(content);
                        break;
                    case "warn":
                        logger.warn(content);
                        break;
                    case "error":
                        logger.error(content);
                        break;
                    case "fatal":
                        logger.fatal(content);
                        break;
                    default:
                        logger.info(content);
                        break;
                }
            }
        }catch(e){
            console.error(e);
        }
        //返回一个icon
        ctx.body = "";
    }
}
