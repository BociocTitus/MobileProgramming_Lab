import React from 'react';
import { StyleSheet, Text, View, Button, ListView, TouchableHighlight, Alert } from 'react-native';
import AsyncStorageHelper from "./Helper/AsynStorageHelper";
var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => {return r1.id !== r2.id;}});
export default class Main extends React.Component{
    constructor(props) {
        super(props);
        this.storageHelper = new AsyncStorageHelper();
        this.storageHelper.initArray().then(
            ()=>{this.refresh();}
            ,()=>{});
        this.state = {
            dataSource: dataSource.cloneWithRows(global.dataArray)
        }
    }

    refresh(){
        this.setState(prevState => { return Object.assign({}, prevState, { dataSource: dataSource.cloneWithRows(global.dataArray)})});
    }

    charts(){
        this.props.navigation.navigate("Charts",{});
    }

    add(){
        this.props.navigation.navigate("Profile",{order:{},refresh:this.refresh.bind(this)});
    }

    edit(order){
        this.props.navigation.navigate("Profile",{order:order,refresh:this.refresh.bind(this)});
    }

    delete(id){
        global.dataArray = global.dataArray.filter((el)=> el.id !== id);
        this.storageHelper.delItem(id).then(()=>{},()=>{});
        this.refresh();
    }

    deleteAlert(id){
        Alert.alert(
            'Are you sure you want to delete this item?',
            '',
            [
                {text: 'No', onPress: () => {}, style: 'cancel'},
                {text: 'Yes', onPress: () => this.delete(id)},
            ],
            { cancelable: true }
        );
    }

    renderRow(order) {
        return (
            <TouchableHighlight onPress={()=>this.edit(order)} key={(order.id)}>
                <View  style={{flexDirection: 'row',alignItems: 'flex-end'}}>
                        <Text style={(styles.item)}>{order.Food}</Text>
                        <Text style={(styles.item)}>{order.Price}</Text>
                        <Button style={(styles.button)} title="Delete"  onPress={()=>this.deleteAlert(order.id)} />
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View>
                <View  style={{flexDirection: 'row',alignItems: 'flex-end'}}>
                    <Button
                        title="Add"
                        style={(styles.item)}
                        onPress={()=>this.add()}/>
                    <Button
                        title="See Charts"
                        style={(styles.item)}
                        onPress={()=>this.charts()}
                    />
                </View>
                <Text>Orders</Text>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow = {this.renderRow.bind(this)}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    separator: {
        flex: 1,
        backgroundColor: '#8E8E8E',
    },
    button:{
        justifyContent: 'flex-end'
    }
});
