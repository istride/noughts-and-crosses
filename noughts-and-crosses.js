var NOUGHT = 'O';
var CROSS = 'X';
var EMPTY = '-';

function Square(id, mark) {
	var self = this;

	self.id = id;
	self.mark = ko.observable(mark);
	
	self.setMark = function(mark) {
		if ( self.mark() == EMPTY )
			self.mark(mark);
	};

}

function Grid() {
	var self = this;

	self.squares = new Array();
	self.winner = ko.observable();

	for(var i = 0; i < 9; i++) {
		self.squares.push(new Square(i, '-'));
	}

	self.rows = function() {
		var rows = new Array();
		rows.push(self.squares.slice(0,3));
		rows.push(self.squares.slice(3,6));
		rows.push(self.squares.slice(6,9));
		return rows;
	};

	self.detectWinFor = function(player) {
		var win =
			(self.squares[0].mark() == player &&
			self.squares[1].mark() == player &&
			self.squares[2].mark() == player)
			||
			(self.squares[3].mark() == player &&
			self.squares[4].mark() == player &&
			self.squares[5].mark() == player)
			||
			(self.squares[6].mark() == player &&
			self.squares[7].mark() == player &&
			self.squares[8].mark() == player)
			||
			(self.squares[0].mark() == player &&
			self.squares[3].mark() == player &&
			self.squares[6].mark() == player)
			||
			(self.squares[1].mark() == player &&
			self.squares[4].mark() == player &&
			self.squares[7].mark() == player)
			||
			(self.squares[2].mark() == player &&
			self.squares[5].mark() == player &&
			self.squares[8].mark() == player)
			||
			(self.squares[0].mark() == player &&
			self.squares[4].mark() == player &&
			self.squares[8].mark() == player)
			||
			(self.squares[2].mark() == player &&
			self.squares[4].mark() == player &&
			self.squares[6].mark() == player);
		return win;
	};
	
	self.reset = function() {
		for(var i = 0; i < 9; i++) {
			self.squares[i].mark(EMPTY);
		}
	};

}

function NoughtsAndCrossesViewModel() {
	var self = this;

	self.grid = new Grid();
	self.activePlayer = ko.observable(CROSS);
	self.winner = ko.observable();
	self.scoreX = ko.observable(0);
	self.scoreO = ko.observable(0);

	self.swapActivePlayer = function() {
		if ( self.activePlayer() == NOUGHT )
			self.activePlayer(CROSS);
		else
			self.activePlayer(NOUGHT);
	};

	self.markGrid = function() {
		if ( self.winner() ) {
			return;
		}
		var square = this;
		square.setMark(self.activePlayer());
		
		if ( self.grid.detectWinFor(self.activePlayer()) ) {
			self.winner(self.activePlayer());
			self.incrementScore();
		} else {
			self.swapActivePlayer();
		}
	};

	self.incrementScore = function() {
		var scoreToIncrement = "score" + self.winner();
		self[scoreToIncrement](self[scoreToIncrement]() + 1);
	};

	self.newGame = function() {
		self.grid.reset();
		self.swapActivePlayer();
		self.winner("");
	};

	self.resetScore = function() {
		self.scoreX(0);
		self.scoreO(0);
	};


}
var nac = new NoughtsAndCrossesViewModel();
ko.applyBindings(nac);
