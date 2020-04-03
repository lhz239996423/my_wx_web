// 引入express模块
var express = require('express')
var fs = require('fs')
// 调用express
var app = express()
// 登录接口地址
app.get('/login', function (req, res) {
    // 获取微信小程序提交账号密码
    var userAccount = req.query.account;
    var userPassword = req.query.password;
    // 判断账号密码是否有值
    if (userAccount == undefined || userPassword == undefined) {
        // 提示用户 账号密码没有值
        res.send({
            "code": "404",
            "message": "nothing "
        })
        // 
        return;
    }
    // 定义用户
    var user = { account: "admin", password: "123123", id: "weiyide", "nickname": "Tom" }
    // 判断
    if (userAccount == user['account']) {
        if (userPassword == user['password']) {
            //登录成功  响应相关内容
            res.send({
                "code": "200",
                "message": "登录成功",
                "nickname": user['nickname'],
                "id": user['id']
            })
        } else {
            // 提示
            res.send({
                "code": "402",
                "message": "密码错误"
            })
        }
    } else {
        // 提示
        res.send({
            "code": "403",
            "message": "账号错误"
        })
    }
})
// 图文信息展示的接口地址
app.get('/desc', function (req, res) {
    // 接收微信小程序提交的id
    var id = req.query.id;
    // 判断
    if (id == 'weiyide' && id != undefined) {
        // 数据
        var data = [
            {
                "src": "http://127.0.0.1:3002/static/images/10225357963.jpg",
                "txt": "图片一"
            },
            {
                "src": "http://127.0.0.1:3002/static/images/10250290397.png",
                "txt": "图片二"
            }
        ]
        // 响应数据
        res.send({ "code": "200", data: data })
    } else {
        // 提示
        res.send({
            "code": "404"
        })
    }
})
// 为shopmall项目活动页面提供数据
app.get('/active', function (req, res) {
    // 定义数据
    var items = []
    // 读取data.txt的文档内容
    fs.readFile('./data/data.txt',function(err,data){
        // 读取失败
        if(err) {
            console.log(err)
            return;
        }
        // 把读取的字符串转成 JSON对象
        items = JSON.parse(data.toString())
         // 响应给小程序
        res.send({ "code": "200", "item": items })
    })
})
// 为shopmall项目商品收藏接口
app.get('/like',function(req,res){
    // 前端提交的id
    var id = req.query.id
    // 判断id是否有值
    if(id==undefined) { 
        res.send({message:"id 没有值 "})
        return ;
    }
    // 读取data.txt的文档内容
    fs.readFile('./data/data.txt',function(err,data){
        if(err) return ;
        // 数据读取成功
        var items = JSON.parse(data.toString());
        // 定义一个空数组 
        var arr = [];
        // 循环
        for(var i = 0 ; i < items.length ; i++){
            // 判断匹配商品
            if(id == items[i].id){
                if(items[i].isLike){
                    items[i].isLike = false;
                }else {
                    items[i].isLike = true;
                }
                // 记录当前商品的处理结果
                arr.push(items[i])
            }
        }
        // console.log(items)
        // 把处理过后的数据写入data.txt文档 
        // 把json对象转成 json字符串
        var text = JSON.stringify(items)
        fs.writeFile('./data/data.txt',text,function(err){
            // 判断 
            // 写入失败
            if(err) {
                console.log(err) ; return ;
            }
            // console.log('success')
        })
        // 响应数据给微信小程序
        res.send(arr);
    })
})
// 为shopmall项目购物车商品列表
app.get('/cartList',function(req,res){
    var uid = req.query.userId;
    if(uid ==='weiyide'){
        fs.readFile('./data/data.txt',function(err,data){
            if(err){
                console.log(err)
                return ;
            }
            // 读取data.txt文档的内容
            var text = data.toString()
            // 把字符串转成json对象
            var data = JSON.parse(text)
            // 响应给小程序
            res.send({"code":"200","data":data})
        })
    }else {
        res.send({"code":"404"})
    }
})

// 为shopmall项目详情页面提供数据
app.get('/detail', function (req, res) {
    // 接收小程序提交的参数id
    var id = req.query.id;
    // 判断id是否有值
    if (id == undefined) { res.send('{"message":"没有数据"}'); return; }
    // 定义数据
    var items = []
    // fs 读入 data.txt胡文档内容
    fs.readFile('./data/data.txt',function(err,data){
        // 读取失败
        if(err) {
            console.log(err);
            return;
        }
        // 数据读取成功  得到的是字符串 
        // 把字符串转json格式对象（数组）
        items = JSON.parse(data.toString());
        // 定义一个空数组
        var arr = [];
        //循环数据items
        for (var i = 0; i < items.length; i++) {
            // 判断
            if (id == items[i].id) {
                // 获取指定的数据
                arr.push(items[i]);
            }
        }
        // 响应给小程序
        res.send(arr);
    })
    
})
// 为shopmall项目首页提供数据
app.get('/index',function(req,res){
    fs.readFile('./data/index.txt',function(err,data){
            if(err){
                console.log(err)
                return;
            }
            // data
            var text = data.toString();
            // json 
            var obj = JSON.parse(text);
            // 把数据响应给小程序
            res.send(obj);
    })
})

// 为shopmall项目购物商品的添加 
app.get('/add',function(req,res){
    // 定义变量 接收小程序提交的参数
    var userId = req.query.userId;
    var productId = req.query.productId;
    // 假设
    if(userId =="weiyide"){
        if(productId == undefined){
            // 提示
            res.send({
                "message":"没有该商品"
            })
            return;
        }

        // 读取data.txt文档
        fs.readFile('./data/data.txt',function(err,data){
            if(err){
                console.log(err);
            }
            //data.txt文档内容 
            var text = data.toString();
            // 把字符串转成 json对象
            var result = JSON.parse(text);
            // 循环
            for(var i = 0 ; i < result.length ; i ++){
                if(productId == result[i].id){
                        result[i].num ++;
                }
            }
            // 把json对象转成字符串
            var str = JSON.stringify(result);
            //写入data.txt
            fs.writeFile('./data/data.txt',str,function(err){
                if(err){
                    console.log(err)
                }
            })
            // 把处理结果响应给小程序
            res.send({
                "code":"200",
                "data":result
            })
        })

    }else {
        // 提示
        res.send({
            "message":"没有登录"
        })
    }
})

// 为shopmall项目购物商品的移除
app.get('/sub',function(req,res){
    // 定义变量 接收小程序提交的参数
    var userId = req.query.userId;
    var productId = req.query.productId;
    // 假设
    if(userId =="weiyide"){
        if(productId == undefined){
            // 提示
            res.send({
                "message":"没有该商品"
            })
            return;
        }

        // 读取data.txt文档
        fs.readFile('./data/data.txt',function(err,data){
            if(err){
                console.log(err);
            }
            //data.txt文档内容 
            var text = data.toString();
            // 把字符串转成 json对象
            var result = JSON.parse(text);
            // 循环
            for(var i = 0 ; i < result.length ; i ++){
                if(productId == result[i].id){
                        // 自减
                        result[i].num --;
                }
            }
            // 把json对象转成字符串
            var str = JSON.stringify(result);
            //写入data.txt
            fs.writeFile('./data/data.txt',str,function(err){
                if(err){
                    console.log(err)
                }
            })
            // 把处理结果响应给小程序
            res.send({
                "code":"200",
                "data":result
            })
        })

    }else {
        // 提示
        res.send({
            "message":"没有登录"
        })
    }
})
// 为shopmall项目购物商品的删除
app.get('/delete',function(req,res){
    // 定义变量
    var productId = req.query.productId;
    // 判断productId是否有值
    if(productId == undefined) {
        // 提示
        res.send({
            "message":"该商品不存在"
        })
        return ;
    }
    // 读取data.txt文档
    fs.readFile('./data/data.txt',function(err,data){
        // 读取失败
        if(err) {
            console.log(err)
            return ;
        }
        // 把data.txt文本读取出来
        var text = data.toString();
        // 判断
        if(text.length == 0){
            res.send({
                "message":"购物车空了"
            })
            return ;
        }
        // 把字符串转成json对象
        var result = JSON.parse(text);
        // 定义索引值
        var index = null;
        // 循环result数组  找出商品的索引值
        for(var i = 0 ; i < result.length ; i++){
            if(productId == result[i].id){
                index = i;
            }
        }
        // 判断 索引值是否为null
        if(index == null){
            // 提示
            res.send({
                "message":"没有这条记录"
            })
            return;
        }
        // 在数组里面删除该条数据
        result.splice(index,1);
        // 把json对象转成字符串（json格式的字符串）
        var str = JSON.stringify(result);
        // 把结果写入data.txt
        fs.writeFile('./data/data.txt',str ,function(err){ console.log(err)})
        // 把处理结果响应给小程序
        res.send({
            "code":"200",
            "data":result
        })
    })
})
// 为shopmall项目用户信息的数据接口
app.get('/user',function(req,res){
    // 假设有个字段用于判断用户登录状态
    var sessionId = req.query.sessionId;
    // 判断
    if(sessionId == undefined || sessionId == null ){
        // 提示
        res.send({
            "message":"您还没登录"
        })
        return;
    }
    // 读取user.txt文档
    fs.readFile('./data/user.txt',function(err,data){
        if(err){
            console.log(err)
        }
        // 读取user.txt 文档的内容
        var text = data.toString();
        // 转json对象
        var userInfo = JSON.parse(text);
        // 响应给小程序
        res.send({
            "code":"200",
            "userInfo":userInfo
        })
    })
})
// 为shopmall项目订单页面数据接口
app.get('/order',function(req,res){
    // 读取data.txt文档内容
    fs.readFile('./data/data.txt',function(err,data){
        // 读取失败
        if(err){
            console.log(err);
            return;
        }
        // 把读取出来的内容响应给小程序
        res.send({
            "code":"200",
            "data":JSON.parse(data.toString())
        })
    })
})
// 配置静态资源路径
// http://127.0.0.1:3002/static/images/4.jpg
app.use('/static', express.static('public'))
// 监听端口
app.listen(3002, function () {
    console.log('服务启动了..')
})