package top.suiwngs;

import top.suiwngs.db.ConnectDataBase;
import top.suiwngs.db.DatabaseManager;
import top.suiwngs.db.test.TestData;

import java.sql.*;

public class Main {

    public static void main(String[] args) throws SQLException {
        TestData testData = new TestData();
        testData.executeInsert("xxxxxxxx");
//        PreparedStatement psql = DatabaseManager.getDatabaseManager().getPreparedStatement("select * from students where class=?");
//        psql.setString(1,"95033");
//        ResultSet resultSet= psql.executeQuery();
//        while(resultSet.next()){
//            String name = resultSet.getString("sname");
//            Date sbirthday = resultSet.getDate("sbirthday");
//            System.out.println("Student Name is: "+name);
//            System.out.println("Student sbirthday is:"+sbirthday);
//        }
    }
}
