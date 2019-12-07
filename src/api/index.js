import ajax from "./ajax";

//注册与登录
export const reqSaveUser = (data) => ajax('/elm_back/save_user',data,'POST');

//验证cookie
export const reqCookie = (data) => ajax('/elm_back/cookies',data);
