function fee_create_using(param) {
	try {
		var sLoginName = $.session.getUsername();
		var dCreatedTimestamp = new Date();

		// do some operations
		var iVehicleUID, dFeeStartDate, dFeeEndDate, sFee;
		var imagePrepareStatement = param.connection.prepareStatement('SELECT  "REF_VEHICLE.UID", "FEE_START_DATE", "FEE_END_DATE","FEE" FROM "'+param.afterTableName+'"');
		var imageResultSet = imagePrepareStatement.executeQuery();
		if (imageResultSet.next()) {
           iVehicleUID = imageResultSet.getInteger(1);
           dFeeStartDate = imageResultSet.getDate(2);
           dFeeEndDate = imageResultSet.getDate(3);
           sFee = imageResultSet.getString(4);
		}
		imageResultSet.close();
		imagePrepareStatement.close();

		var uuidPrepareStatement = param.connection.prepareStatement('SELECT TO_CHAR(SYSUUID) FROM DUMMY');
		var uuidResultSet = uuidPrepareStatement.executeQuery();
		var sUUID = uuidResultSet.next() ? uuidResultSet.getString(1) : null;
		uuidResultSet.close();
		uuidPrepareStatement.close();


		var sInsertSQL = 'INSERT INTO "DrivingSafety.FEE" ("UID", "REF_VEHICLE.UID", "CREATED_ON", "CREATED_BY", "CHANGED_ON", "CHANGED_BY", "FEE_START_DATE", "FEE_END_DATE","FEE") ' 
				+ ' values (?, ?, ?, ?, ?, ?, ?, ?, ?)';
		var insertPrepareStatement = param.connection.prepareStatement(sInsertSQL);
		insertPrepareStatement.setString(1, sUUID);
		insertPrepareStatement.setInt(2, iVehicleUID);
		insertPrepareStatement.setTimestamp(3, dCreatedTimestamp); //CREATED_ON
		insertPrepareStatement.setString(4, sLoginName); //CREATED_BY
		insertPrepareStatement.setTimestamp(5, dCreatedTimestamp); //CHANGED_ON
		insertPrepareStatement.setString(6, sLoginName); //CHANGED_BY
		insertPrepareStatement.setTimestamp(7, dFeeStartDate); //FEE_START_DATE
		insertPrepareStatement.setTimestamp(8, dFeeEndDate); //FEE_END_DATE
		insertPrepareStatement.setDouble(9, parseFloat(sFee)); //FEE
		insertPrepareStatement.executeUpdate();
		insertPrepareStatement.close();
	} catch (e) {
		return {
			HTTP_STATUS_CODE : e.code,
			ERROR_MESSAGE : 'DB access exception',
			DETAILS : e.message +"--" +e.stack
		};
	}
}

function fee_delete_using(param) {
	try {
		var sLoginName = $.session.getUsername();
		var dUpdatedTimestamp = new Date();

		var sUID;
		var imagePrepareStatement = param.connection.prepareStatement('SELECT  "UID" FROM "'+param.beforeTableName+'"');
		var imageResultSet = imagePrepareStatement.executeQuery();
		if (imageResultSet.next()) {
           sUID = imageResultSet.getString(1);
		}
		imageResultSet.close();
		imagePrepareStatement.close();

		var sUpdateSQL = 'UPDATE "DrivingSafety.FEE" SET "DELETE_FLAG" = \'1\', "CHANGED_ON" = ?, "CHANGED_BY" = ? ' 
				+ ' WHERE "UID" = ?';
		var updatePrepareStatement = param.connection.prepareStatement(sUpdateSQL);
		updatePrepareStatement.setTimestamp(1, dUpdatedTimestamp);
		updatePrepareStatement.setString(2, sLoginName);
		updatePrepareStatement.setString(3, sUID);
		updatePrepareStatement.executeUpdate();
		updatePrepareStatement.close();
	} catch (e) {
		return {
			HTTP_STATUS_CODE : e.code,
			ERROR_MESSAGE : 'DB access exception',
			DETAILS : e.message +"--" +e.stack
		};
	}
}

function fee_update_using(param) {
	try {
		var sLoginName = $.session.getUsername();
		var dUpdatedTimestamp = new Date();

		var sUID, iVehicleUID, dFeeStartDate, dFeeEndDate, sFee;
		var imagePrepareStatement = param.connection.prepareStatement('SELECT "UID", "REF_VEHICLE.UID", "FEE_START_DATE", "FEE_END_DATE","FEE" FROM "' + param.afterTableName + '"');
		var imageResultSet = imagePrepareStatement.executeQuery();
		if (imageResultSet.next()) {
		   sUID = imageResultSet.getString(1);
           iVehicleUID = imageResultSet.getInteger(2);
           dFeeStartDate = imageResultSet.getDate(3);
           dFeeEndDate = imageResultSet.getDate(4);
           sFee = imageResultSet.getString(5);
		}
		imageResultSet.close();
		imagePrepareStatement.close();

		var sUpdateSQL = 'UPDATE "DrivingSafety.FEE" SET "CHANGED_ON" = ?, "CHANGED_BY" = ?, "FEE_START_DATE" = ?, "FEE_END_DATE" = ?, "FEE" = ? ' 
				+ ' WHERE "UID" = ?';
		var updatePrepareStatement = param.connection.prepareStatement(sUpdateSQL);
		updatePrepareStatement.setTimestamp(1, dUpdatedTimestamp); //CHANGED_ON
		updatePrepareStatement.setString(2, sLoginName); //CHANGED_BY
		updatePrepareStatement.setTimestamp(3, dFeeStartDate); //FEE_START_DATE
		updatePrepareStatement.setTimestamp(4, dFeeEndDate); //FEE_END_DATE
		updatePrepareStatement.setDouble(5, parseFloat(sFee)); //FEE
		updatePrepareStatement.setString(6, sUID);
		updatePrepareStatement.executeUpdate();
		updatePrepareStatement.close();

	} catch (e) {
		return {
			HTTP_STATUS_CODE : e.code,
			ERROR_MESSAGE : 'DB access exception',
			DETAILS : e.message +"--" +e.stack
		};
	}
}