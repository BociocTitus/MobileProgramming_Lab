/**
 * Created by Titus on 11/25/2017.
 */
'use strict'

import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Pie } from 'react-native-pathjs-charts'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
    },
});

export default class PieChartBasic extends Component {

    HERE_TYPE = "here";
    TOGO_TYPE = "togo";

    render() {
        var here =0;
        var togo=0;
        let orders = this.props.navigation.state.params;
        orders.forEach((elem)=>{
            if(elem.orderType[0] === this.HERE_TYPE){
                here += 1;
            }
            if(elem.orderType[0] === this.TOGO_TYPE){
                togo += 1;
            }
        });
        if(here === 0 && togo === 0 ){
            return(<Text>Sorry no data</Text>);
        }
        let data = [{
            "name": "Here",
            "population": here
        }, {
            "name": "To go",
            "population": togo
        }];

        let options = {
            margin: {
                top: 20,
                left: 20,
                right: 20,
                bottom: 20
            },
            width: 350,
            height: 350,
            color: '#2980B9',
            r: 50,
            R: 150,
            legendPosition: 'topLeft',
            animate: {
                type: 'oneByOne',
                duration: 200,
                fillTransition: 3
            },
            label: {
                fontFamily: 'Arial',
                fontSize: 8,
                fontWeight: true,
                color: '#ECF0F1'
            }
        };

        return (
            <View style={styles.container}>
                <Pie data={data}
                     options={options}
                     accessorKey="population"
                     margin={{top: 20, left: 20, right: 20, bottom: 20}}
                     color="#2980B9"
                     pallete={
                         [
                             {'r':25,'g':99,'b':201},
                             {'r':24,'g':175,'b':35}
                         ]
                     }
                     r={50}
                     R={150}
                     legendPosition="topLeft"
                     label={{
                         fontFamily: 'Arial',
                         fontSize: 8,
                         fontWeight: true,
                         color: '#ECF0F1'
                     }}
                />
            </View>
        )
    }
}
