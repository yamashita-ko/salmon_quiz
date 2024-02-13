package com.example.demo.dao;

import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.dto.QuizMasterDto;

public class QuizMasterDao extends BaseDao{
	public List<QuizMasterDto> find(Integer type) {
		Statement stmt = null;
		ResultSet rs = null;
		List<QuizMasterDto> result = new ArrayList<>();
		String typeCommand = "";
		if(type != null && type != 0) {
			typeCommand = " WHERE quiz_master.type = " + type;
		}
		String sql = "SELECT * FROM quiz_master" + typeCommand;
		try {
			connect();
			stmt = con.createStatement();
			rs = stmt.executeQuery(sql);
			while(rs.next()) {
				QuizMasterDto dto = new QuizMasterDto();
				dto.setId(rs.getInt("id"));
				dto.setIsNanikore(rs.getInt("is_nanikore"));
				dto.setIsRankaku(rs.getInt("is_rankaku"));
				dto.setType(rs.getInt("type"));
				dto.setLevel(rs.getInt("level"));
				dto.setQuestion(rs.getString("question"));
				dto.setAnswerList(rs.getString("answer_list"));
				dto.setAnswerIndex(rs.getInt("answer_index"));
				dto.setNote(rs.getString("note"));
				dto.setQuestionImage(rs.getString("question_image"));
				dto.setAnswerImage(rs.getString("answer_image"));
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