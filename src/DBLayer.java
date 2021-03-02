import java.sql.*;

public class DBLayer {
    private final String URI;
    private final String DRIVER;
    private final String USER;
    private final String PASSWORD;
    private Connection conn;
    private Statement s;
    private ResultSet rs;
    private String sql;

    public DBLayer(){
        URI = "jdbc:mysql://localhost/project_db?autoReconnect=true&useSSL=false&useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC";
        DRIVER = "com.mysql.cj.jdbc.Driver";
        USER = "root";
        PASSWORD = "AyyLmao12";
    }

    public boolean connect(){
        conn = null;
        try  {
            Class.forName (DRIVER);
        }
        catch (ClassNotFoundException cnfe) {
            cnfe.printStackTrace();
            return false;
        }

        try  {
            conn = DriverManager.getConnection(URI, USER, PASSWORD);
            return true;
        }
        catch(SQLException sqle) {
            return false;
        }// end of catch
    }

    public boolean close() {
        try {
            conn.close();
            return true;
        }//end of try
        catch(SQLException sqle) {
            return false;
        }//end of catch
    }// end of method close

    public void getUser(String _user){
        try{
            s = conn.createStatement();
            sql = "";
            rs = s.executeQuery(sql);
            if(rs.next()){
                System.out.println();
            }
            else{
                System.out.println("No results found for: "+_user);
            }
        } catch(SQLException sqle){
            System.out.println("An SQL Error has occured");
        }
    }

    public static void main(String[] args){
        DBLayer test = new DBLayer();
        System.out.println(test.connect());
    }

}