package com.example.demo.bean;

import java.io.Serializable;

public class WeaponQuestionBean implements Serializable {
	private Integer id;
	private String question;
	private String answer;
	private String variable;
	private String note;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	public String getAnswer() {
		return answer;
	}
	public void setAnswer(String answer) {
		this.answer = answer;
	}
	public String getVariable() {
		return variable;
	}
	public void setVariable(String variable) {
		this.variable = variable;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
}