import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.sql.*;

public class test {
    public static void main(String[] args) throws SQLException {



            JSONArray jsonArray = new JSONArray();
            Connection conn = null;
            String connString =
                    "jdbc:sqlserver://14.32.18.226:1433;database=YL;user=as;password=1234";
            conn = DriverManager.getConnection(connString);

            if(conn == null){
                System.out.println("conneciton");
            }
            try {
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery("select * from Shop where ShopId<=6710");
                while (rs.next()) {
                    JSONObject obj = new JSONObject();
                    obj.put("title", rs.getString("ShopName"));
                    obj.put("lat", rs.getString("Latitude"));
                    obj.put("lng", rs.getString("Longititude"));
                    obj.put("road_address_name", rs.getString("StreetNameAddress"));
                    obj.put("address_name", rs.getString("Address"));
                    /*obj.put("phone", rs.getString("phone"));
                    obj.put("detailpage", rs.getString("detailpage"));
                    obj.put("id", rs.getString("id"));*/
                    jsonArray.add(obj);
                }
                System.out.println(jsonArray);

            }catch (Exception e){
                System.out.println("아무거나");
            }

    }
}
