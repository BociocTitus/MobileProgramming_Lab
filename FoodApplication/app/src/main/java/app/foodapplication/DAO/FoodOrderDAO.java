package app.foodapplication.DAO;

import android.arch.persistence.room.Dao;
import android.arch.persistence.room.Delete;
import android.arch.persistence.room.Insert;
import android.arch.persistence.room.Query;
import android.arch.persistence.room.Update;

import java.util.List;

import app.foodapplication.Model.FoodOrder;

/**
 * Created by boti on 30.11.2017.
 */
@Dao
public interface FoodOrderDAO {
    @Query("SELECT * FROM foodorder")
    List<FoodOrder> getAll();

    @Insert
    void insertAll(FoodOrder... foodOrders);

    @Update
    void update(FoodOrder foodOrder);

    @Delete
    void delete(FoodOrder foodOrder);
}
