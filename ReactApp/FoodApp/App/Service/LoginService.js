/**
 * Created by Titus on 12/27/2017.
 */
import AsyncStorageHelper from "../Helper/AsynStorageHelper";
export class LoginService{
    constructor(){
        this.storageHelper = new AsyncStorageHelper();
    }

    login(username, password):Promise{
        data = {
            'username' : username,
            'password' : password,
        };
        const formBody = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');

        let url = 'http://192.168.0.15:3000/auth/sign_in';
        let headers = {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        return fetch(
                url,
                {
                    method: 'POST',
                    headers: headers,
                    body: formBody
                }
            );
    }
    logout(){
        this.storageHelper.removeToken().then().catch();
    }
}