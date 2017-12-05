/**
 * Created by Titus on 11/25/2017.
 */
import {AsyncStorage} from 'react-native';
export default class AsyncStorageHelper{
    async initArray(){
        var id_array;
        try {
            id_array =await AsyncStorage.getItem('ID_ARRAY');
            console.log("Received:"+ id_array);
            if(id_array === null) {
                return;
            }
            var elem;
            id_array = JSON.parse(id_array);
            for(var i=0;i<id_array.length;i++){
                elem = await AsyncStorage.getItem(JSON.stringify(id_array[i]));
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
        var id_array=[];
        global.dataArray.forEach((elem)=>{
           id_array.push(elem.id);
        });
        return id_array;
    }

    async addItem(item:Order){
        try{
            await AsyncStorage.setItem(JSON.stringify(item.id), JSON.stringify(item));
            await AsyncStorage.setItem('ID_ARRAY', JSON.stringify(this.getIds()));
        } catch (error) {
            console.log("Error:",error);
        }
    }

    async delItem(id){
        try{
            await AsyncStorage.removeItem("ID:"+JSON.stringify(id));
            await AsyncStorage.setItem('ID_ARRAY', this.getIds());
        } catch (error) {
            console.log("Error:",error);
        }
    }
}