import java.sql.*;

public class DBLayer {
    // Class attributes
    private final String URI;
    private final String DRIVER;
    private final String USER;
    private final String PASSWORD;
    private Connection conn;
    private Statement s;
    private ResultSet rs;
    private String sql;

    /**
     * Constructor for DBLayer
     */
    public DBLayer(){
        URI = "jdbc:mysql://localhost/mypls?autoReconnect=true&useSSL=false&useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC";
        DRIVER = "com.mysql.cj.jdbc.Driver";
        USER = "root";
        PASSWORD = "AyyLmao12";
    }

    /**
     * Connect to MySQL database using credentials from constructor
     * @return true if connected, false if an error occurs
     */
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

    /**
     * Disconnect from MySQL database
     * @return true if successful, false if an error occurs
     */
    public boolean close() {
        try {
            conn.close();
            return true;
        }//end of try
        catch(SQLException sqle) {
            return false;
        }//end of catch
    }// end of method close

    /**
     * Get role of user and print it out to the console
     * @param _user username to be used in query
     */
    public void getUserRole(String _user){
        try{
            s = conn.createStatement();
            sql = "SELECT role_name FROM roles WHERE idRoles IN (SELECT Roles_idRoles FROM user WHERE username = '"+_user+"')";
            rs = s.executeQuery(sql);
            if(rs.next()){
                System.out.println("Name: "+_user+ " Role: "+rs.getString(1));
            }
            else{
                System.out.println("No results found for: "+_user);
            }
        } catch(SQLException sqle){
            System.out.println("An SQL Error has occurred");
            sqle.printStackTrace();
        }
    }

    public static void main(String[] args){
        DBLayer test = new DBLayer();
        // Connect to DB
        test.connect();

        // Demo prints
        System.out.println("Test queries for roles");
        System.out.println("======================");
        test.getUserRole("prof123");
        test.getUserRole("stu123");
        test.getUserRole("manager");
        System.out.println("Next one should fail");
        test.getUserRole("AAAAAAA");

        // Disconnect from DB
        test.close();
    }

}