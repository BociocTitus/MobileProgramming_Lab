/**
 * Created by Titus on 11/25/2017.
 */
import {AsyncStorage} from 'react-native';
export default class AsyncStorageHelper{
    async initArray(){
        let id_array;
        try {
            id_array =await AsyncStorage.getItem('ID_ARRAY');
            console.log("Received:"+ id_array);
            if(id_array === null) {
                return;
            }
            id_array = JSON.parse(id_array);
            global.dataArray = [];
            for(var i=0;i<id_array.length;i++){
                let elem = await AsyncStorage.getItem(JSON.stringify(id_array[i]));
                if(elem === null){
                    console.log("Error at retrieving items");
                    return;
                }
                global.dataArray.push(JSON.parse(elem));
            }
        } catch (error) {
            console.log("Error:",error);
        }
    }

    getIds(){
        let id_array=[];
        global.dataArray.forEach((elem)=>{
           id_array.push(elem._id);
        });
        return id_array;
    }

    async updateStorage(){
        console.log('updating storage');
        try{
            let id_array = JSON.parse(await AsyncStorage.getItem('ID_ARRAY'));
            for(let i=0;i<id_array.length;i++){
                this.delItem(id_array[i]).then().catch();
            }
            global.dataArray.forEach((order)=>{
               this.addItem(order).then().catch();
            });
        }
        catch(err){
            console.log("Error:"+err);
        }
    }

    async storeChanges(){
        try{
            await AsyncStorage.setItem("offlineChanges", JSON.stringify(global.modifiedOffline));
        } catch(error){
            console.log("Error:"+error);
        }
    }

    async removeChangesList(){
        try{
            await AsyncStorage.removeItem("offlineChanges");
        } catch(error){
            console.log("Error:"+error);
        }
    }

    async initChanges(){
        try{
            global.modifiedOffline = await AsyncStorage.getItem("offlineChanges");
        } catch(error){
            console.log("Error:"+error);
            global.modifiedOffline = [];
        }
    }

    async addItem(item:Order){
        try{
            await AsyncStorage.setItem(JSON.stringify(item._id), JSON.stringify(item));
            await AsyncStorage.setItem('ID_ARRAY', JSON.stringify(this.getIds()));
        } catch (error) {
            console.log("Error:",error);
        }
    }

    async delItem(id){
        try{
            await AsyncStorage.removeItem(JSON.stringify(id));
            return await AsyncStorage.setItem('ID_ARRAY', JSON.stringify(this.getIds()));
        } catch (error) {
            console.log("Error:",error);
        }
    }

    async setToken(token){
        try{
            await AsyncStorage.setItem('TOKEN', token);
        } catch(error){
            console.log("Error:",error);
        }
    }

    async getToken(){
        try{
            let token = await AsyncStorage.getItem('TOKEN');
            return token;
        } catch(error){
            console.log("Error:",error);
        }
    }

    async setRole(role){
        try{
            await AsyncStorage.setItem("ROLE", role);
        } catch(error){
            console.log("Error:",error);
        }
    }

    async removeToken(){
        try {
            await AsyncStorage.removeItem('TOKEN');
        }
        catch(error){

        }
    }

    async getRole(){
        try{
            return await AsyncStorage.getItem('ROLE');
        } catch(error){
            console.log("Error:",error);
        }
    }
}