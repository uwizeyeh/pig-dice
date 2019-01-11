//back-end
//this object contains the player's name, session's score and total score of the player
function myPlayer(name,winscore){
	this.name=name;
	this.score=0;
	this.session=0;
	this.winscore=winscore;
	this.sessionRolls=0;
}
//this method will enable the object player to play on the following specifications

myPlayer.prototype.roll= function(opponent){
	console.log(opponent);
	var rolledNumber=Math.floor(Math.random()*6+1);
	if(rolledNumber>1){
		this.session+=rolledNumber;
		this.sessionRolls +=1;
		if((this.session+this.score)>=this.winscore){
			this.score+=this.session;
			this.sessionRolls=0;
			newGame(this,opponent,rolledNumber);
			return 0;
		}
	}
	else{
		this.session=0;
		this.sessionRolls=0;
	}
	return rolledNumber;
}

//stops the rolls sets the new score to the sum of initial score and sessions score 
myPlayer.prototype.hold=function(){
	this.score+=this.session;
	this.session=0;
	this.sessionRolls=0;
	return this.score;
}
//sleep funtion for computer to appear to be human
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function restartgame(playerOne,playerTwo){
	playerOne.session=0;
	playerTwo.session=0;
	playerOne.score=0;
	playerTwo.score=0;
	$("#panel-p1").removeClass("panel-disable");
	$("#panel-p2").removeClass("panel-disable");
	$("#p1roll").removeClass("button-disable");
	$("#p1hold").removeClass("button-disable");
	$("#p2roll").removeClass("button-disable");
	$("#p2hold").removeClass("button-disable");
	$("#player-2-session").empty();
	$("#player-2-score").empty();
	$("#player-2-roll").empty();
	$("#player-1-session").empty();
	$("#player-1-score").empty();
	$("#player-1-roll").empty();
	$(".rolledNum2").empty();
	$(".rolledNum1").empty();
	$(".wingame").empty();
	$(".wingame").hide();
	$(".gamestats").empty();
	$(".gamestats").hide();

}
function newGame(winner,loser,winroll){
	$("#player-2-session").empty();
	$("#player-2-score").empty();
	$("#player-2-roll").empty();
	$("#player-1-session").empty();
	$("#player-1-score").empty();
	$("#player-1-roll").empty();
	$(".rolledNum1").empty();
	$(".rolledNum2").empty();
	$("#panel-p1").addClass("panel-disable");
	$("#panel-p2").addClass("panel-disable");
	$("#p1roll").addClass("button-disable");
	$("#p1hold").addClass("button-disable");
	$("#p2roll").addClass("button-disable");
	$("#p2hold").addClass("button-disable");
	$(".rolledNum2").empty();
	$(".rolledNum1").empty();
	$(".wingame").show();
	$(".wingame").append('<a href="" class="close" data-dismiss="alert" aria-label="close">&times;</a>');
	$(".wingame").append("<strong>"+winner.name+"</strong> won the game with "+winner.score+" points after rolling a "+winroll);
	$(".gamestats").show();
	$(".gamestats").append('<div class="panel-heading">Game Stats</div><div class="panel-body"><p>'+winner.name+': '+winner.score+' points</p><p>'+loser.name+': '+loser.score+' points</p></div>');
	
}
function playerOneToTwo(){
	$("#panel-p1").addClass("panel-disable")
	$("#p1roll").addClass("button-disable");
	$("#p1hold").addClass("button-disable");
	$("#panel-p2").removeClass("panel-disable")
	$("#p2roll").removeClass("button-disable");
	$("#p2hold").removeClass("button-disable");
	$(".rolledNum2").empty();
}

function playerTwoToOne(){
	$("#panel-p2").addClass("panel-disable")
	$("#p2roll").addClass("button-disable");
	$("#p2hold").addClass("button-disable");
	$("#panel-p1").removeClass("panel-disable")
	$("#p1roll").removeClass("button-disable");
	$("#p1hold").removeClass("button-disable");
	$(".rolledNum1").empty();
}

async function computerVeteran(shepherd,human){
	var roll2 = shepherd.roll(human);
	await sleep(2000);
	if (roll2===0){
		return roll2;
	}
	$(".rolledNum2").append("<li>"+roll2+"</li>");
	var session2 = shepherd.session;
	console.log("Sh3ph4rd rolled a: "  + roll2 );	
	$("#player-2-roll").text('Sh3ph4rd rolled a: '  + roll2 );
	
	if (roll2 < 2) {
		var score2 = shepherd.score;
		playerTwoToOne();
		$("#player-2-session").text("Sh3ph4rd's session score is: 0 " );
		$("#player-2-score").text("Sh3ph4rd's total score is: " + score2 );
			
	} 
	else if(session2<((shepherd.winscore-shepherd.score)/(shepherd.winscore-human.score))*15 && shepherd.sessionRolls<=3){
		$("#player-2-session").text("Sh3ph4rd's session score is: " + session2);
		computerVeteran(shepherd,human);
	}
	else{
		score2 = shepherd.hold();
		console.log("sehpherd score: "+score2);
		await sleep(1000);
		playerTwoToOne();
		$("#player-2-score").text("Sh3ph4rd's total score is: " + score2);
		$("#player-2-session").text("Sh3ph4rd's session score is: "+session2 );
	}
}
async function computerRecruit(pvtAllen,human){
	var roll2 = pvtAllen.roll(human);
	await sleep(2000);
	if (roll2===0){
		return roll2;
	}
	
	$(".rolledNum2").append("<li>"+roll2+"</li>");
	var session2 = pvtAllen.session;
	console.log("1.Pvt.Allen rolled a: "  + roll2 )
	$("#player-2-roll").text('Pvt.Allen rolled a: '  + roll2 );	
	if (roll2 < 2) {		
		playerTwoToOne();
		var score2 = pvtAllen.score;
		$("#player-2-session").text("Pvt.Allen's session score is: 0 " );
		$("#player-2-score").text("Allen's total score is: " + score2 );		
	} 
	else{
		var roll2 = pvtAllen.roll(human);
		await sleep(2000);
		if (roll2===0){
			return roll2;
		}
		$(".rolledNum2").append("<li>"+roll2+"</li>");
		var session2 = pvtAllen.session;
		console.log("2.Pvt.Allen rolled a: "  + roll2 )
		$("#player-2-roll").text('Pvt.Allen rolled a: '  + roll2 );
		if (roll2 < 2) {			
			playerTwoToOne();
			var score2 = pvtAllen.score;
			$("#player-2-session").text("Pvt.Allen's session score is: 0 " );
			$("#player-2-score").text("Allen's total score is: " + score2 );
		}
		else{
			score2 = pvtAllen.hold();
			console.log("pvtAllen score: "+score2);
			playerTwoToOne();
			$("#player-2-score").text("Allen's total score is: " +score2);
		}
	}
}
function computerGame(artificialGamer,humanGamer){
	if(artificialGamer.name==="Pvt Joseph Allen"){
		var mode="recruit";
		computerRecruit(artificialGamer,humanGamer);
	}
	else{
		var mode="Sh3ph4rd";
		computerVeteran(artificialGamer,humanGamer);
	}
}

//front-end
$(document).ready(function(){
	//select player mode
	$("#onePlayer").click(function(){
		$(".initial-screen").hide();
		$(".players-reg").show();
		$(".playerTwo").hide();
	});

	$("#twoPlayer").click(function(){
		$(".initial-screen").hide();
		$(".player1-level").hide();
		$(".players-reg").show();
	});
	$("#form_players").submit(function(event){
		event.preventDefault();
		var playerOneName=$("#player_one").val();
		var winscore=parseInt($("#winscore").val());
		if ($("#player_two").val()){
			var playerTwoName=$("#player_two").val();
			if (playerOneName && playerTwoName){
				var playerOne= new myPlayer(playerOneName,winscore);
				var playerTwo= new myPlayer(playerTwoName,winscore);
				console.log(playerTwo)
				console.log(playerOne)
		      	$(".players-reg").hide();
		      	$(".game-section").show();
		      	$(".player1name").text(playerOne.name);
		      	$(".player2name").text(playerTwo.name);
		      	$(".p1session").text(playerOne.session);
		      	$(".p2session").text(playerTwo.session);
		      	$(".p1score").text(playerOne.score);
		      	$(".p2score").text(playerTwo.score);
	    	}
			$("#p1roll").click(function(event) {
				var roll1 = playerOne.roll(playerTwo);
				if(roll1===0){
					return roll1
				}
				$(".rolledNum1").append("<li>"+roll1+"</li>");
				console.log(roll1)
				//alert("weew")
				$("#player-1-roll").text('You rolled a: '  + roll1 );
				if (roll1 < 2) {
					playerOneToTwo();
					var score1 = playerOne.score;
					$("#player-1-session").text("Your session score is: 0 " );
					$("#player-1-score").text('Your total score is: ' + score1 );
				} 
				else {
					var session1 = playerOne.session;
					$("#player-1-session").text("Your session score is: " + session1 );
				}
				});
			$("#p1hold").click(function(event) {
				score1 = playerOne.hold();
				if (score1 >= winscore) {
					$("#player-1-score").text('Your total score is: ' + score1);
					newGame(playerOne);
				} 
				else {
					playerOneToTwo();
					$("#player-1-score").text('Your total score is: ' + score1 );

				}
			});
			$("#p2roll").click(function(event) {
				var roll2 = playerTwo.roll(playerOne);
				if(roll2===0){
					return roll2
				}
				$(".rolledNum2").append("<li>"+roll2+"</li>");
				$("#player-2-roll").text('You rolled a: '  + roll2 );
				if (roll2 < 2) {
					playerTwoToOne();
					var score2 = playerTwo.score;
					$("#player-2-session").text("Your session score is: 0 " );
					$("#player-2-score").text('Your total score is: ' + score2 );
				} 
				else {
					var session2 = playerTwo.session;
					$("#player-2-session").text('Your session score is: ' + session2);
				}
				});
			$("#p2hold").click(function(event) {
				score2 = playerTwo.hold();
				if (score2 >= winscore) {
					$("#player-2-score").text('Your total score is: ' + score2);
					newGame(playerTwo);
					} 
				else {
					playerTwoToOne();
					$("#player-2-score").text('Your total score is: ' + score2);
				}
			});
		}
		else {
			var level = $("input:radio[name=level]:checked").val();
      		if (level === "recruit") {
        		playerTwoName = "Pvt Joseph Allen"
      		} 
      		else if (level === "veteran") {
        		playerTwoName = "Sh3ph4rd"
      		}
      		if (playerOneName && playerTwoName){
				var playerOne= new myPlayer(playerOneName,winscore);
				var playerTwo= new myPlayer(playerTwoName,winscore);
		      	$(".players-reg").hide();
		      	$(".game-section").show();
		      	$(".player1name").text(playerOne.name);
		      	$(".player2name").text(playerTwo.name);
		      	$(".p1session").text(playerOne.session);
		      	$(".p2session").text(playerTwo.session);
		      	$(".p1score").text(playerOne.score);
		      	$(".p2score").text(playerTwo.score);
		      	$("#p2hold").hide();
		      	$("#p2roll").hide()
	    	}
			$("#p1roll").click(function(event) {
				var roll1 = playerOne.roll(playerTwo);
				if (roll1===0){
					return roll1;
				}
				$(".rolledNum1").append("<li>"+roll1+"</li>");
				console.log(roll1)
				//alert("weew")
				$("#player-1-roll").text('You rolled a: '  + roll1 );
				if (roll1 < 2) {					
					playerOneToTwo();
					var score1 = playerOne.score;
					$("#player-1-session").text("Your session score is: 0 " );
					$("#player-1-score").text('Your total score is: ' + score1 );
					computerGame(playerTwo,playerOne);
				} 
				else {
					var session1 = playerOne.session;
					$("#player-1-session").text("Your session score is: " + session1 );
				}
				});
			$("#p1hold").click(function(event) {
				score1 = playerOne.hold();
				$("#player-1-score").text('Your total score is: ' + score1);
				playerOneToTwo();
				computerGame(playerTwo,playerOne);
			});
		}
		$("#restartgame").click(function(){
			restartgame(playerOne,playerTwo);
		});
	});
 });