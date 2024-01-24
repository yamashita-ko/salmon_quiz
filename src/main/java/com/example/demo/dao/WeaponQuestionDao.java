package com.example.demo.dao;

import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.dto.WeaponQuestionDto;


public class WeaponQuestionDao extends BaseDao{
	public List<WeaponQuestionDto> findAll() {
		Statement stmt = null;
		ResultSet rs = null;
		List<WeaponQuestionDto> result = new ArrayList<>();
		String sql = "SELECT * FROM weapon_question";
		try {
			connect();
			stmt = con.createStatement();
			rs = stmt.executeQuery(sql);
			while(rs.next()) {
				WeaponQuestionDto dto = new WeaponQuestionDto();
				dto.setId(rs.getInt("id"));
				dto.setQuestion(rs.getString("question"));
				dto.setAnswer(rs.getString("answer"));
				dto.setVariable(rs.getString("variable"));
				dto.setNote(rs.getString("note"));
				result.add(dto);
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