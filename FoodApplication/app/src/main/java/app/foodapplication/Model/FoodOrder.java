package app.foodapplication.Model;

/**
 * Created by boti on 02.11.2017.
 */

public class FoodOrder {
    private String Name;
    private int Price;
    private int Id;

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    @Override
    public String toString() {
        return "FoodOrder{" +
                "Name='" + Name + '\'' +
                ", Price=" + Price +
                ", Id=" + Id +
                '}';
    }

    public void setName(String name) {
        Name = name;
    }

    public String getName() {

        return Name;
    }

    public int getPrice() {
        return Price;
    }

    public FoodOrder(String name, int price, int id) {
        Name = name;
        Price = price;
        Id = id;
    }

    public void setPrice(int price) {

        Price = price;
    }
}
