package app.foodapplication;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.NumberPicker;

import java.util.ArrayList;

import app.foodapplication.Adapter.FoodOrderAdapter;
import app.foodapplication.Adapter.SerializableAdapter;
import app.foodapplication.DAO.FoodOrderDAO;
import app.foodapplication.Database.AppDatabase;
import app.foodapplication.Model.FoodOrder;

public class MainActivity extends Activity {
    private Button button;
    private EditText editText;
    private EditText editText2;
    private FoodOrderAdapter adapter;
    private ListView listView;
    private Button chartsButton;
    private boolean editFlag =false;
    private int Selected_ID =0;
    private NumberPicker numberPicker;
    private final String EMPTY_STRING ="";
    private String[] pickValues = {"Here","To go"};
    public static final String LIST_INFO ="LISTINFO";
    private AppDatabase appDatabase;
    private FoodOrderDAO foodOrderDAO;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        listView = findViewById(R.id.listView);
        appDatabase = AppDatabase.getAppDatabase(this);
        foodOrderDAO = appDatabase.foodOrderDAO();
        adapter = new FoodOrderAdapter(this, (ArrayList<FoodOrder>)foodOrderDAO.getAll(),foodOrderDAO);
        listView.setAdapter(adapter);
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                editText.setText(adapter.getItem(i).getName());
                editText2.setText(Integer.toString(adapter.getItem(i).getPrice()));
                editFlag = true;
                Selected_ID =adapter.getItem(i).getId();
                numberPicker.setValue(getPickerValByText(adapter.getItem(i).getOrderType()));
            }
        });
        button = findViewById(R.id.button2);
        editText = findViewById(R.id.editText);
        editText2 = findViewById(R.id.editText2);
        numberPicker = findViewById(R.id.numberPicker);
        numberPicker.setMinValue(0);
        numberPicker.setMaxValue(1);
        numberPicker.setDisplayedValues(pickValues);
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
                                    adapter.getItem(i).setOrderType(getPickerVal(numberPicker.getValue()));
                                    foodOrderDAO.update(adapter.getItem(i));
                                }
                            }
                            Selected_ID=0;
                            editText.setText(EMPTY_STRING);
                            editText2.setText(EMPTY_STRING);
                            editFlag=false;
                            adapter.notifyWrapper();
                        }
                        else{
                            FoodOrder newFoodOrder = new FoodOrder(name,getPickerVal(numberPicker.getValue()),price);
                            adapter.add(newFoodOrder);
                            adapter.notifyWrapper();
                            editText.setText(EMPTY_STRING);
                            editText2.setText(EMPTY_STRING);
                            foodOrderDAO.insertAll(newFoodOrder);
                            /*
                            Intent emailIntent = new Intent(Intent.ACTION_SENDTO, Uri.fromParts(
                                    "mailto","titus.bocioc@gmail.com", null));
                            emailIntent.putExtra(Intent.EXTRA_SUBJECT, "New Food Order");
                            emailIntent.putExtra(Intent.EXTRA_TEXT, newFoodOrder.toString());
                            startActivity(Intent.createChooser(emailIntent, "Send email..."));*/
                        }
                    }
                }

        );
        chartsButton = findViewById(R.id.button3);
        chartsButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                goToCharts();
            }
        });
    }

    public String getPickerVal(int val){
        if(val>1 || val<0){
            throw new RuntimeException("Picker Error");
        }
        return pickValues[val];
    }

    public int getPickerValByText(String text){
        if(text.equals("Here"))
            return 0;
        return 1;
    }

    public void goToCharts(){
        Intent intent = new Intent(this, Charts.class);
        SerializableAdapter serAdapter = new SerializableAdapter(adapter.getItems());
        intent.putExtra(LIST_INFO,serAdapter);
        startActivity(intent);
    }
}

