package top.suiwngs.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;

public class DatabaseManager {

    private ConnectDataBase connectDataBase = null;
    //单利
    private volatile static DatabaseManager databaseManager = new DatabaseManager();

    public synchronized static DatabaseManager getDatabaseManager(){
        return databaseManager;
    }

    private DatabaseManager(){
        ConnectDataBase connectDataBase = new ConnectDataBase();
        this.connectDataBase = connectDataBase;
    }

    public Connection getConnect(){
        return this.connectDataBase.getConn();
    }

    public Statement getStatement(){
        return this.connectDataBase.getState();
    }

    public PreparedStatement getPreparedStatement(String sql){
        try {
            return this.getConnect().prepareStatement(sql);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public void close(){
        this.connectDataBase.close();
    }


}
