import java.sql.Connection;
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import javax.sql.DataSource;

public class ConnectionTest {
//    private static final String DRIVER ="oracle.jdbc.driver.OracleDriver";

    private static final String DRIVER = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
    private static final String URL = "jdbc:sqlserver://14.32.18.226:1433;database=YL;";
    private static final String USER = "as";
    private static final String PW = "1234";

    @Test
    public void testConnection() throws Exception {
        Class.forName(DRIVER);

        try (Connection conn = DriverManager.getConnection(URL, USER, PW)) {
            System.out.println(conn);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

