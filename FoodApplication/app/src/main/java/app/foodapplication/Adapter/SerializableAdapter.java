package app.foodapplication.Adapter;

import java.io.Serializable;
import java.util.List;

import app.foodapplication.Model.FoodOrder;

/**
 * Created by boti on 28.11.2017.
 */

public class SerializableAdapter implements Serializable {
    private List<FoodOrder> foodOrders;

    public List<FoodOrder> getFoodOrders() {
        return foodOrders;
    }

    public void setFoodOrders(List<FoodOrder> foodOrders) {
        this.foodOrders = foodOrders;
    }

    public SerializableAdapter(List<FoodOrder> foodOrders) {

        this.foodOrders = foodOrders;
    }
}
