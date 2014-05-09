var express = require('express');
var app = express();

var Sequelize = require('sequelize')							//from the sequelize website has the instrucitons for this
	, sequelize = new Sequelize('lawyer-scoreboard', 'root', null, {  //database name, user, and password
		host: 'localhost'
	});

sequelize 
	.authenticate()
	.complete(function(err) {
		if (!!err) {
			console.log('Unable to connect to the database:', err)
		} else {
			console.log('Connection has been established succesfully.')
		}
	});

	var Post = sequelize.define('Post', {	//creates the model using javascript
		name: Sequelize.STRING,
		location: Sequelize.STRING,
		record: Sequelize.ENUM('wins', 'loses'),
		hourly_rate: Sequelize.FLOAT(5, 2)
	});

sequelize
	.sync()
	.complete(function(err) {
		if (!!err) {
			console.log('An error occurred while creating the table', err)
		} else {
			console.log('it worked!')
		}
	});

	sequelize.sync();

app.get('/lawyer', function(req, res) {
	Post.all().success(function(lawyers){
		res.json(lawyers);
	})
});

app.listen(3000);