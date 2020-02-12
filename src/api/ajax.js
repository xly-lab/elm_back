import axios from 'axios'


export default function ajax(url,data={},type="GET") {
    return new Promise((resolve, reject) => {
        let promise;
        let Str='';
        if(type==='GET'){
            Object.keys(data).forEach(key=>{
                Str += key + "=" + data[key] + "&";
            });
            if(Str!==""){
                Str = Str.substring(0,Str.lastIndexOf("&"));
                url = url+"?"+Str;
            }
            promise = axios.get('/vue'+url,{
                withCredentials:true
            });
        }else{
            promise = axios.post('/vue'+url,data,{
                withCredentials:true
            });
        }
        promise.then(response=>{
            resolve(response.data)
        })
            .catch(err=>{ 
                reject(err)
            })  
    })
}
