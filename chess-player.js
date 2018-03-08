/**
 * maxim 04.06.17.
 * http://maximtyminko.com
 */

$(document).ready(function(){
	var board = new ChessBoard();
	board.init();
});

/**
 * @constructor
 */
function ChessBoard(){
	var _this = this;
	var games = new GameLibrary();
	var letters = ['a','b','c','d','e','f','g','h'];
	
	var numberOfReadyToPlayFigures = 0;
	
	var previousMove = null;
	
	/** @type {Object.<string, ChessCell>} */
	var squares = {};
	
	var $boardBox = $('<div id="board" class="board"></div>');
	$boardBox.appendTo('body');
	
	this.init = function(){
		var currentColor = 'white';
		for( var y = 8; y > 0; y -- ){
			var color = currentColor;
			for( var x = 0; x < letters.length; x ++ ){
				var id = letters[x] + y;
				currentColor = color;
				var $square = $('<div id="' + id + '" class="square ' + color + '">');
				$boardBox.append($square);
				squares[id] = new ChessCell(x, y, nextMove);
				color = color === 'white' ? 'black' : 'white';
			}
		}
		this.resetFigures();
	};
	
	function addToReadyToPlay(){
		numberOfReadyToPlayFigures += 1;
		if( numberOfReadyToPlayFigures < 32 ) return false;
		nextMove();
	}
	function nextMove(){
		var move = games.nextMove();
		if( ! move ){
			_this.resetFigures();
			return false;
			/*move = games.nextMove();
			if( ! move ) return false;*/
		}
		var $figure = null;
		if( squares.hasOwnProperty(move.from) ){
			$figure = squares[move.from].figure;
			squares[move.from].figure = null;
		}
		if( $figure && squares.hasOwnProperty(move.to) ){
			var moveTime = move.type === 'castling'? 200 : 400;
			squares[move.to].pullFigure( $figure, moveTime );
		}else{
			console.log( move );
		}
	}
	
	this.resetFigures = function(){
		var figuresOrder = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
		var pawnsOrder = ['pawn'];
		
		clearBoard();
		numberOfReadyToPlayFigures = 0;
		
		setFiguresRow( 8, figuresOrder, 'black' );
		setFiguresRow( 7, pawnsOrder, 'black' );
		setFiguresRow( 2, pawnsOrder, 'white' );
		setFiguresRow( 1, figuresOrder, 'white' );
	};
	
	/**
	 * @param {number} row
	 * @param {string[]} order
	 * @param {string} color
	 */
	function setFiguresRow( row, order, color ){
		for(var x=0; x<letters.length; x++){
			var fig, figId;
			if( order.length < letters.length ){
				fig = order[0];
			}else{
				fig = order[x];
			}
			figId = fig +'-'+ color +'-'+(x+1);

			var squareId = letters[x]+row;
			var $fig = $('#'+figId);
			if( ! $fig.length ){
				$fig = $('<div id="'+figId+'" class="figure '+fig+' '+color+'">');
				$fig.appendTo($boardBox);
			}
			var $sq = squares[squareId];
			$sq.figure = $fig;
			$fig.animate({left: $sq.positionPercentX+'%', top: $sq.positionPercentY+'%'}, 400, addToReadyToPlay );
			$fig.show();
		}
	}
	
	function clearBoard(){
		for(var id in squares){
			if( ! squares.hasOwnProperty(id)) continue;
			squares[id].figure = null;
		}
	}
}

/**
 * @param {number} xIndex
 * @param {number} yIndex
 * @param {function} onFinishMove
 * @constructor
 */
function ChessCell( xIndex, yIndex, onFinishMove ){
	this.positionPercentX = xIndex * 12.5;
	this.positionPercentY = (8-yIndex) * 12.5;
	/** @type jQuery */
	this.figure = null;
	this.onFinishMove = onFinishMove;
}

/**
 * @param {jQuery} $fig
 * @param {number=} time
 */
ChessCell.prototype.pullFigure = function( $fig, time ){
	var _this = this;
	time = time? time : 400;
	$fig.animate({left: this.positionPercentX+'%', top: this.positionPercentY+'%'}, time, function(){
		if( _this.figure ) _this.figure.hide();
		_this.figure = $fig;
		_this.figure.show();
		setTimeout( _this.onFinishMove(), time*3 );
	});
};
