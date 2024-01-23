package com.example.demo.dao;

import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.dto.WeaponMasterDto;

public class WeaponMasterDao extends BaseDao{
	public List<WeaponMasterDto> findAll() {
		Statement stmt = null;
		ResultSet rs = null;
		List<WeaponMasterDto> result = new ArrayList<>();
		String sql = "SELECT * FROM weapon_master INNER JOIN weapon_image on weapon_master.id = weapon_image.id INNER JOIN weapon_type_master on weapon_master.type = weapon_type_master.id";
		try {
			connect();
			stmt = con.createStatement();
			rs = stmt.executeQuery(sql);
			while(rs.next()) {
				WeaponMasterDto dto = new WeaponMasterDto();
				dto.setId(rs.getInt("id"));
				dto.setName(rs.getString("weapon_master.name"));
				dto.setType(rs.getString("weapon_type_master.name"));
				dto.setMaxDamage(rs.getInt("max_damage"));
				dto.setMinDamage(rs.getInt("min_damage"));
				dto.setIsCharge(rs.getInt("is_charge"));
				dto.setIsExplosion(rs.getInt("is_explosion"));
				dto.setRange(rs.getInt("range"));
				dto.setDps(rs.getInt("dps"));
				dto.setActualDps(rs.getInt("actual_dps"));
				dto.setTotalDamage(rs.getInt("total_damage"));
				dto.setInkLock(rs.getInt("ink_lock"));
				dto.setImage(rs.getString("image"));
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