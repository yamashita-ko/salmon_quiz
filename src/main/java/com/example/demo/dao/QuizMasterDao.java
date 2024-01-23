package com.example.demo.dao;

import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.bean.QuizMasterBean;

public class QuizMasterDao extends BaseDao{
	public List<QuizMasterBean> find(Integer type) {
		Statement stmt = null;
		ResultSet rs = null;
		List<QuizMasterBean> result = new ArrayList<>();
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
				QuizMasterBean bean = new QuizMasterBean();
				bean.setId(rs.getInt("id"));
				bean.setType(rs.getInt("type"));
				bean.setLevel(rs.getInt("level"));
				bean.setQuestion(rs.getString("question"));
				bean.setAnswerList(rs.getString("answer_list"));
				bean.setAnswerIndex(rs.getInt("answer_index"));
				bean.setNote(rs.getString("note"));
				bean.setQuestionImage(rs.getString("question_image"));
				bean.setAnswerImage(rs.getString("answer_image"));
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