package app.foodapplication;

import android.app.Activity;
import android.app.ListActivity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;

import java.util.ArrayList;

import app.foodapplication.Adapter.FoodOrderAdapter;
import app.foodapplication.Model.FoodOrder;

public class MainActivity extends Activity {
    private Button button;
    private EditText editText;
    private EditText editText2;
    private FoodOrderAdapter adapter;
    private ArrayList<FoodOrder> foodOrders;
    private ListView listView;
    private static int ID =1;
    private boolean editFlag =false;
    private int Selected_ID =0;
    private final String EMPTY_STRING ="";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        listView = findViewById(R.id.listView);
        foodOrders=new ArrayList<>();
        foodOrders.add(new FoodOrder("a",2,ID));
        ID++;
        adapter = new FoodOrderAdapter(this, foodOrders);
        listView.setAdapter(adapter);
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                editText.setText(adapter.getItem(i).getName());
                editText2.setText(Integer.toString(adapter.getItem(i).getPrice()));
                editFlag = true;
                Selected_ID =adapter.getItem(i).getId();
            }
        });
        button = findViewById(R.id.button2);
        editText = findViewById(R.id.editText);
        editText2 = findViewById(R.id.editText2);
        button.setOnClickListener(
                new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        String name = editText.getText().toString();
                        int price = Integer.parseInt(editText2.getText().toString());
                        if(editFlag){
                            for(int i =0;i<adapter.getCount();i++){
                                if(adapter.getItem(i).getId() == Selected_ID){
                                    adapter.getItem(i).setName(name);
                                    adapter.getItem(i).setPrice(price);
                                }
                            }
                            Selected_ID=0;
                            editText.setText(EMPTY_STRING);
                            editText2.setText(EMPTY_STRING);
                            adapter.notifyDataSetChanged();
                        }
                        else{
                            FoodOrder newFoodOrder = new FoodOrder(name,price,ID);
                            ID++;
                            adapter.add(newFoodOrder);
                            Intent emailIntent = new Intent(Intent.ACTION_SENDTO, Uri.fromParts(
                                    "mailto","titus.bocioc@gmail.com", null));
                            emailIntent.putExtra(Intent.EXTRA_SUBJECT, "New Food Order");
                            emailIntent.putExtra(Intent.EXTRA_TEXT, newFoodOrder.toString());
                            startActivity(Intent.createChooser(emailIntent, "Send email..."));
                        }
                    }
                }

        );

    }
}

