package com.example.demo.bean;

import java.io.Serializable;

public class QuizMasterBean implements Serializable {
	private Integer id;
	private Integer type;
	private Integer level;
	private String question;
	private String answerList;
	private Integer answerIndex;
	private String note;
	private String questionImage;
	private String answerImage;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	public Integer getLevel() {
		return level;
	}
	public void setLevel(Integer level) {
		this.level = level;
	}
	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	public String getAnswerList() {
		return answerList;
	}
	public void setAnswerList(String answerList) {
		this.answerList = answerList;
	}
	public Integer getAnswerIndex() {
		return answerIndex;
	}
	public void setAnswerIndex(Integer answerIndex) {
		this.answerIndex = answerIndex;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public String getQuestionImage() {
		return questionImage;
	}
	public void setQuestionImage(String questionImage) {
		this.questionImage = questionImage;
	}
	public String getAnswerImage() {
		return answerImage;
	}
	public void setAnswerImage(String answerImage) {
		this.answerImage = answerImage;
	}
}