import ajax from "./ajax";
import da from "element-ui/src/locale/lang/da";

//注册与登录
export const reqSaveUser = (data) => ajax('/elm_back/save_user',data,'POST');

//验证cookie
export const reqCookie = (data) => ajax('/elm_back/cookies',data);

//保存商铺
export const reqSaveShop = (data) => ajax('/elm_back/save_shop',data,'POST');

//获取用户列表
export const reqUserList = (data) => ajax('/elm_back/get_userList',data);

//获取商铺列表
export const reqShopList = (data) => ajax('/elm_back/get_shopList',data);

//获取首页相关数据
export const reqFirstPageData = () => ajax('/elm_back/show_data');

//获取管理员信息列表
export const reqAdminList = (data) => ajax('/elm_back/get_adminList',data);

//保存食物
export const reqSaveFood = (data) => ajax('/elm_back/save_food',data,'POST');

//获取商品列表
export const reqFoodList = (data) => ajax('/elm_back/get_foodList',data);

//更改商品信息
export const reqUpdateFood = (data) => ajax('/elm_back/change_food',data,'POST');

//更改商店的信息
export const reqUpdateShop = (data) => ajax('/elm_back/change_shop',data,'POST');

//删除商铺
export const reqDeleteShop = (data) => ajax('/elm_back/delete_shop',data,'POST');

//删除商品
export const reqDeleteFood = (data) => ajax('/elm_back/delete_food',data,'POST');

//获取每个地区用户的数量
export const reqPlaceNum = () => ajax('/elm_back/get_place_num');

//通过用户_id获取用户信息
export const reqUserInfo = (data) => ajax('/elm_back/get_userinfo',data);

//通过用户_id获取用户的所有商铺
export const reqUserShops = (data) => ajax('/elm_back/user_shops',data)