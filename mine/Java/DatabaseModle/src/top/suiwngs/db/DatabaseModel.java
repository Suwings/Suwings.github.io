package top.suiwngs.db;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public abstract class DatabaseModel {
    //Sub Class
    private final DatabaseModel _self = getSelf();

    private DatabaseModel getSelf() {
        return this;
    }

    public DatabaseModel() {

    }

    private HashMap<String,Object> fieldsMap(){
        HashMap<String,Object> fieldsMap = new HashMap<>();
        try {
            Class clazz = this._self.getClass();

            Field[] fields = clazz.getDeclaredFields();
            for (Field f : fields) {
                fieldsMap.put(f.getName(),f.get(this._self));
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return fieldsMap;
    }

    private String getPars(int len){
        String pars = "";
        for (int i = 0; i < 999; i++) {
            if(len - 1 == i){
                pars += "?";
                break;
            }
            pars += "?,";
        }
        return  pars;
    }

    public void executeInsert(String tableName) {
        String sql = "insert into " + tableName +" ";
        HashMap<String,Object> fieldsMap = this.fieldsMap();
        String pars = this.getPars(fieldsMap.size());
        sql += "("+pars+") values ("+pars+") ";
        System.out.println("SQL:" + sql);
        for (Map.Entry<String, Object> entry : this.fieldsMap().entrySet()) {

            Object vobj = entry.getValue();
            if(vobj instanceof Integer || vobj instanceof  Long){
                System.out.println("Key = " + entry.getKey() + ", Value INT = " + entry.getValue());
                continue;
            }
            if(vobj instanceof  String){
                System.out.println("Key = " + entry.getKey() + ", Value String = " + entry.getValue());
                continue;
            }
            System.out.println("Key = " + entry.getKey() + ", Value Un = " + entry.getValue());

        }


    }
}
