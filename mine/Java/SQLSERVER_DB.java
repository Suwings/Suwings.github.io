package top.suiwngs;

import java.sql.*;

public class Main {

    public static void main(String[] args) throws SQLException {
        // write your code here
        ConnectMySQL connectMySQL = new ConnectMySQL();
        ResultSet resultSet = connectMySQL.state.executeQuery("select * from students");
        while(resultSet.next()){
            String name = resultSet.getString("sname");
            Date sbirthday = resultSet.getDate("sbirthday");
            System.out.println("Student Name is: "+name);
            System.out.println("Student sbirthday is:"+sbirthday);
        }
        connectMySQL.close();
    }
}

class ConnectMySQL {
     Connection conn = null;
    Statement state = null;

    public ConnectMySQL() {
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

    void close() {
        try {
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}