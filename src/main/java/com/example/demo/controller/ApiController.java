package com.example.demo.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.bean.QuizMasterBean;
import com.example.demo.bean.WeaponMasterBean;
import com.example.demo.bean.WeaponQuestionBean;
import com.example.demo.dao.QuizMasterDao;
import com.example.demo.dao.WeaponMasterDao;
import com.example.demo.dao.WeaponQuestionDao;

@RestController
public class ApiController {

    @RequestMapping(value = "/test", method = RequestMethod.GET)
	public List<String> test() {
    	List<String> res = Arrays.asList("aaa", "bbb", "ccc");
    	return res;
    }

    @RequestMapping(value = "/weapon", method = RequestMethod.GET)
	public List<WeaponMasterBean> getWeaponAll() {
    	WeaponMasterDao weaponMasterDao = new WeaponMasterDao();
    	List<WeaponMasterBean> weaponMaster = weaponMasterDao.findAll();
    	return weaponMaster;
    }

    @RequestMapping(value = "/weapon-question", method = RequestMethod.GET)
	public List<WeaponQuestionBean> getWeaponQuestionAll() {
    	WeaponQuestionDao weaponQuestionDao = new WeaponQuestionDao();
    	List<WeaponQuestionBean> weaponQuestion = weaponQuestionDao.findAll();
    	return weaponQuestion;
    }

    @RequestMapping(value = "/quiz", method = RequestMethod.GET)
	public List<QuizMasterBean> getQuiz(@RequestParam(name = "type")Integer type) {
    	QuizMasterDao quizMasterDao = new QuizMasterDao();
    	List<QuizMasterBean> quizMaster = quizMasterDao.find(type);
    	return quizMaster;
    }
}
