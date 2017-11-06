package app.foodapplication.Adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.textclassifier.TextClassificationManager;
import android.widget.ArrayAdapter;
import android.widget.BaseAdapter;
import android.widget.TextView;

import java.util.ArrayList;

import app.foodapplication.Model.FoodOrder;
import app.foodapplication.R;

/**
 * Created by boti on 02.11.2017.
 */

public class FoodOrderAdapter extends BaseAdapter {

    private ArrayList<FoodOrder> items;
    private Context context;
    private static class ViewHolder {
        private TextView itemView;
    }

    public FoodOrderAdapter(Context context, ArrayList<FoodOrder> items) {
        this.items=items;
        this.context=context;
    }

    @Override
    public int getCount() {
        return items.size();
    }

    public void add(FoodOrder foodOrder) {
        items.add(foodOrder);
        notifyDataSetChanged();
    }

    @Override
    public FoodOrder getItem(int i) {
        return items.get(i);
    }

    public ArrayList<FoodOrder> getItems() {
        return items;
    }

    public void setItems(ArrayList<FoodOrder> items) {
        this.items = items;
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    public View getView(int position, View convertView, ViewGroup parent) {
        View v = View.inflate(context,R.layout.order_item,null);

        //Get textviews
        TextView nameView = v.findViewById(R.id.textView);
        TextView priceView = v.findViewById(R.id.textView2);
        //set textviews
        nameView.setText(items.get(position).getName().toString());
        priceView.setText(Integer.toString(items.get(position).getPrice())+"$");

        v.setTag(items.get(position));
        return v;
    }
}