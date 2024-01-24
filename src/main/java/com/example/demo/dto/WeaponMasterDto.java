package com.example.demo.dto;

import java.io.Serializable;

public class WeaponMasterDto implements Serializable {
	private Integer id;
	private String name;
	private String type;
	private Integer maxDamage;
	private Integer minDamage;
	private Integer isCharge;
	private Integer isExplosion;
	private Integer range;
	private Integer dps;
	private Integer actualDps;
	private Integer totalDamage;
	private Integer inkLock;
	private String image;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Integer getMaxDamage() {
		return maxDamage;
	}
	public void setMaxDamage(Integer maxDamage) {
		this.maxDamage = maxDamage;
	}
	public Integer getMinDamage() {
		return minDamage;
	}
	public void setMinDamage(Integer minDamage) {
		this.minDamage = minDamage;
	}
	public Integer getIsCharge() {
		return isCharge;
	}
	public void setIsCharge(Integer isCharge) {
		this.isCharge = isCharge;
	}
	public Integer getIsExplosion() {
		return isExplosion;
	}
	public void setIsExplosion(Integer isExplosion) {
		this.isExplosion = isExplosion;
	}
	public Integer getRange() {
		return range;
	}
	public void setRange(Integer range) {
		this.range = range;
	}
	public Integer getDps() {
		return dps;
	}
	public void setDps(Integer dps) {
		this.dps = dps;
	}
	public Integer getActualDps() {
		return actualDps;
	}
	public void setActualDps(Integer actualDps) {
		this.actualDps = actualDps;
	}
	public Integer getTotalDamage() {
		return totalDamage;
	}
	public void setTotalDamage(Integer totalDamage) {
		this.totalDamage = totalDamage;
	}
	public Integer getInkLock() {
		return inkLock;
	}
	public void setInkLock(Integer inkLock) {
		this.inkLock = inkLock;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
}