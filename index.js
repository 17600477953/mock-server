const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
// const route = require('koa-route');
const serve = require('koa-static');
const path = require('path');
const mockapi = require('./mockapi') // 接口请求都放在mockapi
// 把静态页统一放到public中管理
const home   = serve(path.join(__dirname)+'/public/');
    
// route 测试
app.use(bodyParser())
app.use(home); 
app.use(mockapi.routes())
app.listen(3000,'0.0.0.0',function(){
	console.log('server is running on port 3000')
});
   
