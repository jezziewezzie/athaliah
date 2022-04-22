module.exports = (sequelize, DataTypes) => {
	return sequelize.define('inventories', {
		user_id: DataTypes.STRING,
		item_id: DataTypes.INTEGER,
		amount: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
	});
};
