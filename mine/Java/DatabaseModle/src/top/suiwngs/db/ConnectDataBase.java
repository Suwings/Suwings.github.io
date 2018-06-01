package top.suiwngs.db;

import java.sql.*;

public class ConnectDataBase {
    private Connection conn = null;
    private Statement state = null;

    public ConnectDataBase() {
        try {
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        try {
            conn = DriverManager.getConnection(
                    "jdbc:sqlserver://localhost:1433;databasename=demo", "sa", "toortoor");
            System.out.println("You has connected to SQLDatabase!!!");
            state = conn.createStatement();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void close() {
        try {
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public Connection getConn() {
        return conn;
    }

    public Statement getState() {
        return state;
    }


}