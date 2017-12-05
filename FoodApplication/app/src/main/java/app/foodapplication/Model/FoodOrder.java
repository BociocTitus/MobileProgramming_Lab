package app.foodapplication.Model;

import android.arch.persistence.room.Entity;
import android.arch.persistence.room.PrimaryKey;


import java.io.Serializable;

/**
 * Created by boti on 02.11.2017.
 */
@Entity(tableName = "foodorder")
public class FoodOrder implements Serializable {
    private String Name;
    private String orderType;
    private int Price;
    @PrimaryKey(autoGenerate = true)
    private int Id;

    public FoodOrder(String name, String orderType, int price) {

        Name = name;
        this.orderType = orderType;
        Price = price;
    }
    public FoodOrder(){

    }

    public FoodOrder(String name,  int price, int id) {

        Name = name;
        this.orderType = "Here";
        Price = price;
        Id = id;
    }
    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getOrderType() {
        return orderType;
    }

    public void setOrderType(String orderType) {
        this.orderType = orderType;
    }

    public int getPrice() {
        return Price;
    }

    public void setPrice(int price) {
        Price = price;
    }

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

}
