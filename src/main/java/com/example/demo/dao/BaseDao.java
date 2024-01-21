package com.example.demo.dao;

import java.sql.Connection;
import java.sql.DriverManager;

public class BaseDao {
	private final String URL = "jdbc:mysql://localhost/salmondb";
	private final String USER = "root";
	private final String PASS = "Numerugon1";
	protected Connection con = null;

	protected void connect() {
		try {
			con = DriverManager.getConnection(URL, USER, PASS);
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	protected void disconnect() {
		try {
			if(con != null) con.close();
		} catch(Exception e) {
			e.printStackTrace();
		}
	}

}