package com.example.demo.dao;

import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.bean.WeaponMasterBean;

public class WeaponMasterDao extends BaseDao{
	public List<WeaponMasterBean> findAll() {
		Statement stmt = null;
		ResultSet rs = null;
		List<WeaponMasterBean> result = new ArrayList<>();
		String sql = "SELECT * FROM weapon_master INNER JOIN weapon_image on weapon_master.id = weapon_image.id INNER JOIN weapon_type_master on weapon_master.type = weapon_type_master.id";
		try {
			connect();
			stmt = con.createStatement();
			rs = stmt.executeQuery(sql);
			while(rs.next()) {
				WeaponMasterBean bean = new WeaponMasterBean();
				bean.setId(rs.getInt("id"));
				bean.setName(rs.getString("weapon_master.name"));
				bean.setType(rs.getString("weapon_type_master.name"));
				bean.setMaxDamage(rs.getInt("max_damage"));
				bean.setMinDamage(rs.getInt("min_damage"));
				bean.setIsCharge(rs.getInt("is_charge"));
				bean.setIsExplosion(rs.getInt("is_explosion"));
				bean.setRange(rs.getInt("range"));
				bean.setDps(rs.getInt("dps"));
				bean.setActualDps(rs.getInt("actual_dps"));
				bean.setTotalDamage(rs.getInt("total_damage"));
				bean.setInkLock(rs.getInt("ink_lock"));
				bean.setImage(rs.getString("image"));
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