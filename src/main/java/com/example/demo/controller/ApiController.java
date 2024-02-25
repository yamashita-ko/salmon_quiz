package com.example.demo.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dao.CorrectAnswerCountDao;
import com.example.demo.dao.QuizMasterDao;
import com.example.demo.dao.WeaponMasterDao;
import com.example.demo.dao.WeaponQuestionDao;
import com.example.demo.dto.QuizMasterDto;
import com.example.demo.dto.WeaponMasterDto;
import com.example.demo.dto.WeaponQuestionDto;

@RestController
public class ApiController {

    @RequestMapping(value = "/test", method = RequestMethod.GET)
	public List<String> test() {
    	List<String> res = Arrays.asList("aaa", "bbb", "ccc");
    	return res;
    }

    @RequestMapping(value = "/weapon", method = RequestMethod.GET)
	public List<WeaponMasterDto> getWeaponAll() {
    	WeaponMasterDao weaponMasterDao = new WeaponMasterDao();
    	List<WeaponMasterDto> weaponMaster = weaponMasterDao.findAll();
    	return weaponMaster;
    }

    @RequestMapping(value = "/weapon-question", method = RequestMethod.GET)
	public List<WeaponQuestionDto> getWeaponQuestionAll() {
    	WeaponQuestionDao weaponQuestionDao = new WeaponQuestionDao();
    	List<WeaponQuestionDto> weaponQuestion = weaponQuestionDao.findAll();
    	return weaponQuestion;
    }

    @RequestMapping(value = "/quiz", method = RequestMethod.GET)
	public List<QuizMasterDto> getQuiz(@RequestParam(name = "type")String type, 
			@RequestParam(name = "nanikore")Integer isNanikore, 
			@RequestParam(name = "rankaku")Integer isRankaku, 
			@RequestParam(name = "level")String level) {
    	List<String> typeList = Arrays.asList(type.split(","));
    	List<String> levelList = Arrays.asList(level.split(","));
    	QuizMasterDao quizMasterDao = new QuizMasterDao();
    	List<QuizMasterDto> quizMaster = quizMasterDao.find(typeList, isNanikore, isRankaku, levelList);
    	return quizMaster;
    }
    @RequestMapping(value = "/quiz-kentei", method = RequestMethod.GET)
	public List<QuizMasterDto> getQuiz(@RequestParam(name = "nums")Integer nums) {
    	int[] typeArray = {1, 2};
    	int[] levelArray = {1, 2, 3, 4, 5, 6, 7, 8 , 9, 10};
    	List<String> typeList = Arrays.stream(typeArray).mapToObj(String::valueOf).collect(Collectors.toList());
    	List<String> levelList = Arrays.stream(levelArray).mapToObj(String::valueOf).collect(Collectors.toList());
    	QuizMasterDao quizMasterDao = new QuizMasterDao();
    	List<QuizMasterDto> quizMaster = quizMasterDao.find(typeList, Integer.valueOf(0), Integer.valueOf(1), levelList);
    	List<QuizMasterDto> ret = new ArrayList<>();
    	Collections.shuffle(quizMaster);
    	for(int i = 1; i <= levelArray.length; i++) {
    		final int level = i;
    		List<QuizMasterDto> filter = quizMaster.stream()
	    		.filter(e -> e.getLevel() == level)
	    		.collect(Collectors.toList());
	    	ret.addAll(filter.subList(0, nums));
    	}
    	ret.stream().map(e -> "id:" + e.getId() + " level:" + e.getLevel()).forEach(System.out::println);
    	return ret;
    }
    @RequestMapping(value = "/correct-answer-count", method = RequestMethod.GET)
	public void setCorrectCount(@RequestParam(name = "id")Integer quizMasterId, 
			@RequestParam(name = "isCorrect")Integer isCorrect) {
    	CorrectAnswerCountDao correctAnswerCountDao = new CorrectAnswerCountDao();
    	correctAnswerCountDao.update(quizMasterId, isCorrect);
    	return;
    }
}
