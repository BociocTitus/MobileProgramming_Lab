import React from 'react';
import { NavigationActions } from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TextInput,
  Button,
  ListView,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

export default class Main extends React.Component{
  constructor(props) {
    super(props);

    var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.Id != r2.Id });
    this.state = {
        dataSource: dataSource.cloneWithRows(global.dataArray),
    }
}
edit(order){
  this.props.navigation.navigate("Profile",order);
}
renderRow(order) {
       return (
          <TouchableHighlight onPress={()=>this.edit(order)}>
           <View>
              <Text style={styles.item}>{order.Food}</Text>
              <Text style={styles.item}>{order.Price}</Text>
           </View>
         </TouchableHighlight>
       );
   }

   add(){
      this.props.navigation.navigate("Profile",{});
   }
   render() {
     return (
       <View>
         <Text>Orders</Text>
          <ListView
            dataSource={this.state.dataSource}
            renderRow = {this.renderRow.bind(this)}
            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          />
          <Button
            title="Add"
            onPress={()=>this.add()}/>
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
   height: StyleSheet.hairlineWidth,
   backgroundColor: '#8E8E8E',
 },
  })
