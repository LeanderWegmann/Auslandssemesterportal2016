package dhbw.mwi.Auslandsemesterportal2016.db;

import dhbw.mwi.Auslandsemesterportal2016.db.DB;
import dhbw.mwi.Auslandsemesterportal2016.db.Util;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

public class SQL_queries {

//Ersetzt durch executeStatement
/*	
private static ResultSet executeQuery(String query){ //Führt Query auf Datenbankanbindung aus DB.java aus
Connection connection = DB.getInstance();
ResultSet rs = null;
try{
	Statement statement = connection.createStatement();
	rs = statement.executeQuery(query);
	}
catch (Exception e){
	e.printStackTrace();
}
return rs;
}
*/

public static ResultSet executeStatement (String query, String[] data, String[] types){//Führt Query mit Hilfe von PreparedStatements aus
	Connection connection = DB.getInstance();
	ResultSet rs = null;
	int parCount = data.length;
	
	try{
		PreparedStatement statement = connection.prepareStatement(query);
		for (int i = 0; i < parCount; i++){
			if (types[i] == "String"){
				statement.setString(i+1, data[i]);
			} else if (types[i] == "int"){
				statement.setInt(i+1, Integer.parseInt(data[i]));
			}
			}
		rs = statement.executeQuery();
		} 
	    catch (Exception e){
		e.printStackTrace();
	    }
	return rs;
}

public static int executeUpdate (String query, String[] data, String[] types){//Führt UPDATE mit Hilfe von PreparedStatements aus
	Connection connection = DB.getInstance();
	int parCount = data.length;
	int result = 0;
	try{
		PreparedStatement statement = connection.prepareStatement(query);
		for (int i = 0; i < parCount; i++){
			if (types[i] == "String"){
				statement.setString(i+1, data[i]);
			} else if (types[i] == "int"){
				statement.setInt(i+1, Integer.parseInt(data[i]));
			}
			}
		result = statement.executeUpdate();
		}
	    catch (Exception e){
		e.printStackTrace();
	    }
	return result;
}

public static boolean isMatnrUsed(int matNr){ //Prüft ob Matrikelnummer bereits verwendet wird
	String queryString = "SELECT 1 FROM user WHERE matrikelnummer = ?;";
	String[] params = new String[]{""+matNr};
	String[] types = new String[]{"int"};
	boolean resultExists = true;
	ResultSet ergebnis = executeStatement(queryString,params,types);
	try{
		resultExists = ergebnis.next();
		ergebnis.close();
	}
	catch (Exception e){
		e.printStackTrace();
	}
	return resultExists;
}

public static boolean isEmailUsed(String mail){ //Prüft ob Mailadresse bereits verwendet wird
	String queryString = "SELECT 1 FROM user WHERE email = ?;";
	boolean resultExists = true;
	String[] args = new String[]{mail};
	String[] types = new String[]{"String"};
	ResultSet ergebnis = executeStatement(queryString,args,types);
	try{
		resultExists = ergebnis.next();
		ergebnis.close();
	}
	catch (Exception e){
		e.printStackTrace();
	}
	return resultExists;
}


public static String getSalt(String mail){//Ermittelt das zur Mailadresse hinterlegte Salt
	String queryString = "SELECT salt FROM user WHERE email = ?;";
	String salt = "";
	String[] args = new String[]{mail};
	String[] types = new String[]{"String"};
	ResultSet ergebnis = executeStatement(queryString,args,types);
	try{
		if (ergebnis.next()){
			salt = ergebnis.getString(1);
		}
		ergebnis.close();
	}
	catch (Exception e){
		e.printStackTrace();
	}
	return salt;
}

public static String userLogin(String mail, String salt, String pw){
	//Prüft Logindaten. ResultCodes: 1 = Erfolgreich, 2 = Falsche Daten, 3 = nicht aktiviert, 4 = Datenbankfehler
	//Stringkette, die zurückgegeben wird: resultCode;Bezeichnung Studiengang;Matrikelnummer;Rolle (Nummer die in der DB steht)
	String hashedPw = Util.HashSha256(Util.HashSha256(pw) + salt);
	int resultCode = 4;
	String studiengang = "";
	String matrikelnummer = "";
	String rolle = "";
	String query = "SELECT verifiziert, matrikelnummer, studiengang, rolle FROM user WHERE email = ? AND passwort = ?;";
	String[] params = new String[]{mail,hashedPw};
	String[] types = new String[]{"String","String"};
	ResultSet ergebnis = executeStatement(query,params,types);
	try{
		if (ergebnis.next()){
			studiengang = ergebnis.getString("studiengang");
			matrikelnummer = ergebnis.getString("matrikelnummer");
			rolle = ergebnis.getString("rolle");
			if (ergebnis.getString("verifiziert").equals("1")){
				resultCode = 1;
			} else {
				resultCode = 3;
			}
		} else {
			resultCode = 2;
		}
	} catch (Exception e){
	 e.printStackTrace();
	}
	return "" + resultCode + ";" + studiengang + ";" + matrikelnummer + ";" + rolle;	
}

public static int userRegister(String vorname, String nachname, String passwort, String salt, int rolle, String email, String studiengang, 
		String kurs, int matrikelnummer, String tel, String mobil, String standort, String verifiziert){
	String query = "INSERT INTO user (vorname, nachname, passwort, salt, rolle, email, studiengang, kurs, matrikelnummer, tel, mobil, standort, verifiziert) VALUES " + 
			"(?,?,?,?,?,?,?,?,?,?,?,?,?)";
	String[] args = new String[]{vorname,nachname,passwort,salt,""+rolle,email,studiengang,kurs,""+matrikelnummer,tel,mobil,standort,verifiziert};
	String[] types = new String[]{"String","String","String","String","int","String","String","String","int","String","String","String","String"};
	return executeUpdate(query,args,types);
}

public static ResultSet getJson(String step, String model){
	//Gibt JSON-Dokument für die Eingabemaske zurück
	String query = "SELECT json FROM processModel WHERE step = ? AND model = ?;";
	String[] params = new String[]{step,model};
	String[] types = new String[]{"String","String"};
	ResultSet ergebnis = executeStatement(query,params,types);
	try{
	 return ergebnis;
	} catch (Exception e){
	 e.printStackTrace();
	 return null;
	}	
}

public static String getInstanceId(int matNr, String uni){
	String query = "SELECT processInstance FROM MapUserInstanz WHERE matrikelnummer = ? AND uni = ?";
	String[] params = new String[]{""+matNr,uni};
	String[] types = new String[]{"int","String"};
	ResultSet ergebnis = executeStatement(query,params,types);
	try{
		if (ergebnis.next()){
			return ergebnis.getString("processInstance");
		} else {
			return "";
		}
	} catch (Exception e){
		e.printStackTrace();
		return "";
	}
}

}
