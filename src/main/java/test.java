import java.sql.*;

public class test {
    public static void main(String[] args) {
        Connection conn = null;
        try {
            String user = "system";
            String pw = "1234";
            String url = "jdbc:oracle:thin:@localhost:1521:XE";

            Class.forName("oracle.jdbc.driver.OracleDriver");
            conn = DriverManager.getConnection(url, user, pw);
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("select * from modum");
            while(rs.next()) {
                System.out.println(rs.getString("title"));
            }
        } catch (ClassNotFoundException cnfe) {
            System.out.println("DB 드라이버 로딩 실패");
        } catch (SQLException sqle) {
            System.out.println("DB 접속실패 : ");
        } catch (Exception e) {
            System.out.println("Unkonwn error");
            e.printStackTrace();
        }
    }
}
