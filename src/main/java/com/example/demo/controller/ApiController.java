package com.example.demo.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
	public List<QuizMasterDto> getQuiz(@RequestParam(name = "type")Integer type) {
    	QuizMasterDao quizMasterDao = new QuizMasterDao();
    	List<QuizMasterDto> quizMaster = quizMasterDao.find(type);
    	return quizMaster;
    }
}
