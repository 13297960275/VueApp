
var MongoClient = require('mongodb').MongoClient;

//数据库连接
function _connectDB(callback){
    var url = 'mongodb://localhost:27017/user';
    MongoClient.connect(url,function(err,db){
        if(err){
            console.log('数据库连接失败');
            return;
        }
        callback(db);
        //关闭数据库连接
        db.close();
    });
}


/*
    插入一条数据
    collectionName:插入数据的集合(表)
    json:要插入的数据   例如{name:'yejiaxi',age:12 .....}
    callback:回调函数
 */
exports.insertOne = function(collectionName,json,callback){
    _connectDB(function(db){

        db.collection(collectionName).insertOne(json,function(err,result){
            if(err){
                //先关闭数据库
                db.close();
            }
            callback(err,result);
        })
    })
};


/*
    查询数据：可以更具条件查询，支持分页查询,支持变参
    collectionName:查询的集合
    json：查询的条件 例如{name:'yejiaxi'}  表示查询name=‘yejiaxi’的所有用户
    C:当传入的参数为3个时，C表示为回调函数，但传入的参数为4个时，C表示args
        args中的参数如下：
        pageamount：表示每页的数量
        page：表示当前的页数
        sort
  */

exports.find = function(collectionName,json,C,D) {
    var result = [];
    if (arguments.length == 3) {
        //表示此时没有args参数
        var callback = C;
        var skipnumber = 0;
        var limit = 0;
        var sort = {};

    } else if(arguments.length == 4){
        var args = C;
        var callback = D;
        //如果没有设置，默认为每页5条
        var pageamount = args.pageamount || 5;
        //如果没有设置，默认为1
        var page = args.page || 1;
        //应该跳过的条数
        var skipnumber = pageamount * (page -1);
        //limit和skip配合就是分页
        //表示读取的条数
        var limit = pageamount;
        //如果没有设置，不排序
        var sort = args.sort || {};

    }else{
        throw new Error('find函数的参数不对，必须是3个，或者4个');
        rerurn;
    }

    

    _connectDB(function (db) {
        var cursor = db.collection(collectionName).find(json).skip(skipnumber).limit(limit).sort(sort);
       //遍历查询的结果集
        cursor.each(function (err, doc) {
            if (err) {
                db.close();
                callback(err,null);
            } 
            
            if (doc != null) {

                result.push(doc);
            } else {
                callback(null, result);

            }
        })
    })
}

//根据条件删除用户
exports.deleteMany = function deleteMany(collectionName,json,callback){
    //连接数据库
    _connectDB(function (db) {
        db.collection(collectionName).deleteMany(json, function(err, results) {
            if(err){
                db.close();
            }
            callback(err,results);

        });
    })
}




/*db.collection(collectionName).updateMany(
 { "name" : "Juni" },
 {
 $set: { "cuisine": "American (New)" },
 $currentDate: { "lastModified": true }
 }, function(err, results) {
 console.log(results);
 callback();
 });
 })*/

/*
    修改用户信息
    json1:表示要修改的条件  { "name" : "Juni" } 表示修改name为Juni的用户
    json2：表示要修改哪些内容    {$set: { "username": "yejiaxi" }}, 把username修改成yejiaxi
 */
exports.update = function updateMany(collectionName,json1,json2,callback){
    //连接数据库
    _connectDB(function (db) {
        db.collection(collectionName).updateMany(
            json1,
            json2, function(err, results) {
                if(err){
                    db.close();
                }
                callback(err,results);

            });
    })
}

//获取所得数据的条数
exports.getCount = function(collectionName,json,callback) {
    _connectDB(function (db) {
        db.collection(collectionName).count(json).then(function(count){
            callback(count);
        })
    })
}
