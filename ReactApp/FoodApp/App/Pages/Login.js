/**
 * Created by Titus on 12/27/2017.
 */
import React from 'react';
import {
    View,
    TextInput,
    Button,
    Picker,
    Text
} from 'react-native';
import Communications from 'react-native-communications';
import AsyncStorageHelper from "../Helper/AsynStorageHelper";
import {LoginService} from "../Service/LoginService";
import {OrderService} from "../Service/OrderService";
export default class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.storageHelper = new AsyncStorageHelper();
        this.loginService = new LoginService();
        this.state = {
            username:"",
            password:""
        };
        this.checkIfLoggedIn();
    }

    login(){
        this.loginService.login(this.state.username, this.state.password)
            .then((response) => response.json())
            .then((data) => {
                if (data.message) {
                    console.log(data.message);
                }
                else {
                    OrderService.getInstance().setHeaders(data.token);
                    this.storageHelper.setToken(data.token).then(()=>{
                        this.storageHelper.setRole(data.role[0]).then(() => {
                            this.props.navigation.navigate("Home",{});
                            }
                        ).catch();
                    }).catch();

                }
            })
            .catch((error) => console.error(error));
    }

    checkIfLoggedIn(){
        this.storageHelper.getToken().then(token =>{
            if(token !== null){
                OrderService.getInstance().setHeaders(token);
                this.props.navigation.navigate("Home",{});
            }
        });
    }

    render() {
        return (
            <View>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                />
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                />
                <Button
                    title="login"
                    onPress={() => this.login()}/>
            </View>
        );
    }
}
