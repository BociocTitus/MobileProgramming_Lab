package app.foodapplication.Adapter;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.TextView;

import java.util.ArrayList;

import app.foodapplication.DAO.FoodOrderDAO;
import app.foodapplication.Model.FoodOrder;
import app.foodapplication.R;

/**
 * Created by boti on 02.11.2017.
 */

public class FoodOrderAdapter extends BaseAdapter {

    private ArrayList<FoodOrder> items;
    private Context context;
    private FoodOrderDAO foodOrderDAO;
    private static class ViewHolder {
        private TextView itemView;
    }

    public FoodOrderAdapter(Context context, ArrayList<FoodOrder> items, FoodOrderDAO foodOrderDAO) {
        this.items=items;
        this.context=context;
        this.foodOrderDAO = foodOrderDAO;
    }

    @Override
    public int getCount() {
        return items.size();
    }

    public void add(FoodOrder foodOrder) {
        items.add(foodOrder);
        notifyDataSetChanged();
    }

    public void notifyWrapper(){
        this.notifyDataSetChanged();
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
        final int pos = position;
        //Get textviews
        TextView nameView = v.findViewById(R.id.textView);
        TextView priceView = v.findViewById(R.id.textView2);
        Button button = v.findViewById(R.id.button);
        button.setOnClickListener(
                new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(context);
                        alertDialogBuilder.setMessage("Are you sure you want to delete this item?");
                        alertDialogBuilder.setPositiveButton("YES",
                                new DialogInterface.OnClickListener() {
                                    @Override
                                    public void onClick(DialogInterface dialogInterface, int i) {
                                        foodOrderDAO.delete(items.get(pos));
                                        System.out.println(foodOrderDAO.getAll());
                                        items.remove(pos);
                                        notifyWrapper();
                                    }
                                });
                        alertDialogBuilder.setNegativeButton("NO",
                                new DialogInterface.OnClickListener() {
                                    @Override
                                    public void onClick(DialogInterface dialogInterface, int i) {
                                        return;
                                    }
                                });
                        alertDialogBuilder.create().show();
                    }

                });
        //set textviews
        nameView.setText(items.get(position).getName().toString());
        priceView.setText(Integer.toString(items.get(position).getPrice())+"$");

        v.setTag(items.get(position));
        return v;
    }
}