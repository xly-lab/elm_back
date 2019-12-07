const state = {
    userinfo:undefined
};

const mutations = {
    SET_USERINFO:(state,userinfo)=>{
        state.userinfo = userinfo
    }
};

const actions = {
    set_user({commit},userinfo){
        commit("SET_USERINFO",userinfo)
    }
};

export default {
    state,mutations,actions
}
