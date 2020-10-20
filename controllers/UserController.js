"use strict";
var bcrypt = require('bcryptjs');
var key=require('../config/config');
var path = require('path');
var msg=key.msg;
var datamsg=key.datamsg;
var dtmsgkey=key.dtmsgkey;
var url=key.urls;
var gentoken=key.gentoken;
const fs = require('fs')
const { promisify } = require('util')

const unlinkAsync = promisify(fs.unlink)

var {carts}=require('../model/carts');
var {products}=require('../model/products');
var {users}=require('../model/user');
var {orders}=require('../model/orders');
const db = require('../db/db');


exports.registerUser=(req,res)=>{           
    users.find({"email":req.body.email}).then((result)=>{
        
            if(result.length>0){
                res.status(409).send(msg(409,"Email Already Exists"));
            }else{
                console.log(2)
                bcrypt.genSalt(10,(err,salt)=> {
                    
                    if (err) {
                        
                        return res.status(403).send(err);
                    }else{
                        bcrypt.hash(`${req.body.password}`, salt, (err, hash) => {
                            if (err) {
                                
                                return res.status(403).send(err);
                            }else{
                                
                        req.body.password=hash;
                        var userdata=new users(req.body);                        
                        userdata.save().then((resultSave)=>{                           
                                    res.status(200).send(dtmsgkey(200,"User Registered",resultSave));                                                      
                        }).catch((err)=>{
                            res.status(403).send(err)
                        });
                    }
                    });
                    }
                });
                
            }
    }).catch((err)=>{
        res.status(403).send(err);
    })
}


exports.loginUser=(req,res)=>{

    users.find({email:req.body.email}).then((result)=>{
        if(result.length==0){
            res.status(401).send(msg(401,"Email Not Exist"))
        }else{
            bcrypt.compare(req.body.password, result[0].password, (err, resul) => {
                                if (err) {
                                    res.status(401).send(msg("401", "Password Mismatch"));
                                } else if(resul){
                                    res.status(200).send(dtmsgkey(200,"Login Succesfull",result));
                                }else{
                                    res.status(401).send(msg("401", "Password Mismatch"));
                                }
                            });
                            }

    }).catch((err)=>{
        res.status(403).send(err);
    });    
}




exports.addProductsData=(req,res)=>{
    var img='';
    if(req.files==undefined || req.files=="undefined" || req.files.length==0 )
    {               
        img='';
      }
    else if(req.files[0].originalname)
    {                            
         img = url +'products/' + req.files[0].originalname;
   }
    req.body['image']=img;   
    var product=new products(req.body);
    product.save().then((result)=>{
        res.send(result);
    },(err)=>{
        res.send(err);
    })

}


exports.getProductsData=(req,res)=>{
    products.find().then((result)=>{
        res.status(200).send(datamsg(200,result));
    }).catch((err)=>{
        res.status(403).send(err);
    })
}

exports.addCart=(req,res)=>{
    console.log(req.body)
    carts.find({ $and:[{ProductId:req.body.ProductId},{userId:req.body.userId}]}).then((result)=>{
        if(result.length>0){
            result[0].Items=result[0].Items+1;
            result[0].Cost=result[0].Cost*result[0].Items;
            result[0].save().then((updatedResult)=>{
                res.status(200).send(msg(200,"Increased Item Count in Cart"));
            }).catch((err)=>{
                res.status(403).send(err);
            })
        }else{
            addToCart(req,res);
        }
    }).catch((err)=>{
        res.status(403).send(err);
    });
}

function addToCart(req,res){
    console.log(req.body)
    var cart=new carts(req.body);
    console.log(cart)
    cart.save().then((result)=>{
        res.status(200).send(msg(200,"Added into Cart"));
    }).catch((err)=>{
        res.status(403).send(err);
    });
}



exports.getCart=(req,res)=>{
    carts.find({userId:req.query.id}).then((result)=>{
        if(result.length==0){
            res.status(200).send(msg(201,"Cart Is empty"));
        }else{
            var obj=[];
            result.forEach((data,index)=>{                
                products.find({_id:data.ProductId}).then((finalresult)=>{                    
                    obj.push({cart:data,product:finalresult[0]})                    
                    if(index==result.length-1){
                        res.status(200).send(datamsg(200,obj));
                    }
                }).catch((err)=>{
                    res.status(403).send(err);
                })
            })
        }
        // res.status(200).send(datamsg(200,result));
    }).catch((err)=>{
        res.status(403).send(err);
    })
}


exports.Placeorder=(req,res)=>{
    req.body.cart=JSON.parse(req.body.cart);
    req.body.product=JSON.parse(req.body.product);
    var order=new orders(req.body);
    order.save().then((result)=>{
        carts.findOneAndDelete({_id:req.body.cart._id}).then((delRes)=>{
            res.status(200).send(msg(200,"Order Placed Succesfully"));
        }).catch((err)=>{
            res.status(403).send(err);    
        })
    }).catch((err)=>{
        res.status(403).send(err);
    });
}


exports.Getorder=(req,res)=>{
    orders.find({userId:req.query.id}).then((result)=>{
        res.status(200).send(datamsg(200,result));
    }).catch((err)=>{
        res.status(403).send(err);
    });
}






