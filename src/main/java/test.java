import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.sql.*;

public class test {
    public static void main(String[] args) throws SQLException {


        JSONArray jsonArray = new JSONArray();
        Connection conn = null;
//        Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
//            String connString = "jdbc:sqlserver://14.32.18.226:1433;database=YL;user=as;password=1234";
        String connString =
                "jdbc:sqlserver://14.32.18.226:1433;database=YL;user=as;password=1234";
        conn = DriverManager.getConnection(connString);

        if (conn == null) {
            System.out.println("conneciton");
        }
        try {
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("select ShopName, Url, PhoneNumber from Shop where StreetNameAddress like '%포천시%'");
            while (rs.next()) {
                JSONObject obj = new JSONObject();
                obj.put("place_name", rs.getString("ShopName"));
//                obj.put("lat", rs.getString("Latitude"));
//                obj.put("lng", rs.getString("Longititude"));
//                obj.put("road_address_name", rs.getString("StreetNameAddress"));
//                obj.put("address_name", rs.getString("Address"));
                obj.put("phone", rs.getString("PhoneNumber"));
                obj.put("detailpage", rs.getString("Url"));
//                    obj.put("id", rs.getString("id"));
                jsonArray.add(obj);
            }
            System.out.println(jsonArray);

        } catch (Exception e) {
            System.out.println("아무거나");
        }


    }
}
