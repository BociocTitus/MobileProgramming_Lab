package app.foodapplication;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;

import com.github.mikephil.charting.charts.PieChart;
import com.github.mikephil.charting.components.Description;
import com.github.mikephil.charting.data.PieData;
import com.github.mikephil.charting.data.PieDataSet;
import com.github.mikephil.charting.data.PieEntry;

import java.util.ArrayList;
import java.util.List;

import app.foodapplication.Adapter.SerializableAdapter;
import app.foodapplication.Model.FoodOrder;

/**
 * Created by boti on 26.11.2017.
 */

public class Charts extends Activity {

    private PieChart pieChart;

    private List<FoodOrder> orders;

    private void calculate(){
        ArrayList<PieEntry> entries = new ArrayList<>();
        int count1 = 0;
        int count2 = 0;
        for(int i =0;i<orders.size();i++){
            if(orders.get(i).getOrderType().equals("Here")){
                count1++;
            }
            else{
                count2++;
            }
        }
        entries.add(new PieEntry(count1));
        entries.add(new PieEntry(count2));
        entries.get(0).setLabel("Here");
        entries.get(1).setLabel("To go");
        PieDataSet pieDataSet = new PieDataSet(entries,"Order types");


        ArrayList<Integer> colors = new ArrayList<>();
        colors.add(Color.BLUE);
        colors.add(Color.RED);
        pieDataSet.setColors(colors);
        PieData pieData = new PieData(pieDataSet);
        pieChart.setData(pieData);
        pieChart.invalidate();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.charts);
        Intent intent = getIntent();
        orders = ((SerializableAdapter)intent.getSerializableExtra(MainActivity.LIST_INFO)).getFoodOrders();



        pieChart=findViewById(R.id.PieChart);

        Description description = new Description();
        description.setText("Sales types");
        pieChart.setDescription(description);

        calculate();
    }
}
