package com.example.demo.dao;

import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.bean.WeaponQuestionBean;


public class WeaponQuestionDao extends BaseDao{
	public List<WeaponQuestionBean> findAll() {
		Statement stmt = null;
		ResultSet rs = null;
		List<WeaponQuestionBean> result = new ArrayList<>();
		String sql = "SELECT * FROM weapon_question";
		try {
			connect();
			stmt = con.createStatement();
			rs = stmt.executeQuery(sql);
			while(rs.next()) {
				WeaponQuestionBean bean = new WeaponQuestionBean();
				bean.setId(rs.getInt("id"));
				bean.setQuestion(rs.getString("question"));
				bean.setAnswer(rs.getString("answer"));
				bean.setVariable(rs.getString("variable"));
				bean.setNote(rs.getString("note"));
				result.add(bean);
			}
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if(rs != null) rs.close();
				if(stmt != null) stmt.close();
			} catch(Exception e) {
				e.printStackTrace();
			}
		}
		disconnect();
		return result;
	}
}