package com.example.demo.dao;

import java.sql.ResultSet;
import java.sql.Statement;

public class CorrectAnswerCountDao extends BaseDao{
	public Boolean update(Integer quizMasterId, Integer isCorrect) {
		Statement stmt = null;
		ResultSet rs = null;
		final int CORRECT_COUNT_COLUMN = 2;
		final int TOTAL_COUNT_COLUMN = 3;
		Boolean result = true;
		String sql = "SELECT * FROM correct_answer_count";
		try {
			connect();
			stmt = con.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
			rs = stmt.executeQuery(sql);
			rs.absolute(quizMasterId);
			if(isCorrect == 1) {
				rs.updateString(CORRECT_COUNT_COLUMN, String.valueOf(rs.getInt("correct_count") + 1));
			}
			rs.updateString(TOTAL_COUNT_COLUMN, String.valueOf(rs.getInt("total_count") + 1));
			rs.updateRow();
		} catch(Exception e) {
			e.printStackTrace();
			result = false;
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