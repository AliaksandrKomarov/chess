/**
 * maxim 04.06.17.
 */


function GameLibrary(){
	var curGameIndex = 0;
	var curMoveIndex = -1;
	/** @type Move[][] */
	var games = [];
	var rawGames = [
		[
			'e2-e4', 'c7-c5', 'Ng1-Nf3', 'e7-e6', 'd2-d4', 'c5-d4', 'Nf3-Nd4', 'Ng8-Nf6',
			'Nb1-Nc3', 'd7-d6', 'g2-g4', 'h7-h6', 'h2-h4', 'Nb8-Nc6', 'Rh1-Rg1', 'h6-h5',
			'g4-h5', 'Nf6-Nh5', 'Bc1-Bg5', 'Nh5-Nf6', 'Qd1-Qd2', 'Qd8-Qb6', 'Nd4-Nb3', 'Bc8-Bd7',
			'Ke1:Ra1-Kc1:Rd1', 'a7-a6', 'Rg1-Rg3', 'Qb6-Qc7', 'Bf1-Bg2', 'Bf8-Be7', 'f2-f4', 'Ke8:Ra8-Kc8:Rd8',
			'Qd2-Qf2', 'Kc8-Kb8', 'f4-f5', 'Nc6-Ne5', 'Bg2-Bh3', 'Ne5-Nc4', 'Nb3-Nd2', 'Nc4-Nd2',
			'Rd1-Rd2', 'Rd8-Rc8', 'f5-fe6', 'Bd7-Be6', 'Bh3-Be6', 'f7-fe6', 'Qf2-Qg1', 'Qc7-Qa5',
			'Qg1-Qd4', 'Qa5-Qc5', 'Qd4-Qd3', 'Qc5-Qc4', 'Qd3-Qe3', 'Kb8-Ka8', 'a2-a3', 'Qc4-Qc6',
			'e4-e5', 'd6-de5', 'Qe3-Qe5', 'Rh8-Rd8', 'Rg3-Rd3', 'Rd8-Rd3', 'Rd2-Rd3', 'Qc6-Qh1',
			'Nc3-Nd1', 'Qh1-Qg2', 'Rd3-Rd2', 'Qg2-Qc6', 'Rd2-Re2', 'Be7-Bd6', 'Qe5-Qc3', 'Qc6-Qd7'
		],
        [
            'd2-d4','Ng8-Nf6', 'c2-c4', 'e7-e6', 'Ng1-Nf3', 'b7-b6', 'g2-g3', 'Bc8-Bb7', 
			'Bf1-Bg2', 'Bf8-Be7', 'Ke1:Rh1-Kg1:Rf1', 'Ke8:Rh8-Kg8:Rf8', 'd4-d5',
			'e6-d5', 'Nf3-Nh4', 'c7-c6', 'c4-d5', 'Nf6-Nd5', 'Nh4-Nf5', 'Nd5-Nc7', 'Nb1-Nc3', 'd7-d5',
			'e2-e4', 'Be7-Bf6', 'Bc1-Bf4', 'Bb7-Bc8', 'g3-g4', 'Nb8-Na6', 'Ra1-Rc1', 'Bc8-Bd7',
			'Dd1-Qd2', 'Na6-Nc5', 'e4-e5', 'Bf6-Be7', 'Nf5-Ne7', 'Qd8-Qe7', 'Bf4-Bg5', 'Qe7-Qe6',
			'h2-h3', 'Qe6-Qg6', 'f2-f4', 'f7-f6', 'e5-f6', 'g7-f6', 'Bg5-Bh4', 'f6- f5', 'b2-b4', ' f5-g4', 'h3-g4',
			'Nc5-Nd3', 'Rf1-Rf3', 'Nd3-Nc1', 'f4-f5', 'Qg6-Qg7', 'Qd2-Qc1','Ra8-Re8', 'Qc1-Qd2', 'd5-d4', 
			'Nc3-Ne2', 'Nc7-Nd5', 'Ne2-Nd4', 'Kg8-Kh8', 'g4-g5', 'Re8-Re4', 'Bh4-Bf2', 'Qg7-Qe5', 'Rf3-Rg3',
			'Re4-Rf4', 'f5-f6', 'Bd7-Be8', 'b4-b5', 'c6-c5', 'Nd4-Nc6', 'Qe5-Qa1', 'Bg2-Bf1', 'Rf4-Rf5', 'g5-g6', 
			'Be8-Bg6', 'Rg3-Rg6', 'Rf5-Rf6', 'Rg6-Rf6', 'Qa1-Qf6', 'Qd2-Qe1', 'Rf8-Rg8', 'Kg1-Kh2', 'Qf6-Qf4',
			'Bf2-Bg3', 'Rg8-Rg3', 'Qe1-Qg3', 'Qf4-Qf1', 'Qg3-Qb8', 'Kh8-Kg7', 'Qb8-Qg3'
        ],
		[
            'e2-e4', 'c7-c5', 'Ng1-Nf3', 'e7-e6', 'd2-d4', 'c5-d4', 'Nf3-Nd4', 'Nb8- Nc6',
			 'Nd4-Nb5', 'd7-d6', 'c2-c4', 'Ng8-Nf6', 'Nb1-Nc3', 'a7-a6', 'Nb5-Na3', 'Bf8-Be7',
			 'Bf1-Be2', 'Ke8:Rh8-Kg8:Rf8', 'Ke1:Rh1-Kg1:Rf1', 'b7-b6', 'Bc1-Be3', 'Bc8-Bb7', 'Qd1-Qb3', 'Nc6-Na5',
			 'Qb3-Qb6', 'Nf6-Ne4', 'Nc3-Ne4', 'Bb7-Be4', 'Qb6-Qd8', 'Be7-Bd8', 'Ra1-Rd1', 'd6-d5',
			 'f2-f3', 'Be4-Bf5', 'c4-d5', 'e6-d5', 'Rd1-Rd5', 'Bf5-Be6', 'Rd5-Rd6', 'Be6-Ba2',
			 'Rd6-Ra6', 'Ra8-Rb8', 'Be3-Bc5', 'Rf8-Re8', 'Be2-Bb5', 'Re8-Re6', 'b2-b4', 'Na5-Nb7', 'Bc5-Bf2', 'Bd8-Be7',
			 'Na3-Nc2', 'Ba2-Bd5', 'Rf1-Rd1', 'Bd5-Bb3', 'Rd1-Rd7', 'Rb8-Rd8', 'Ra6-Re6', 'Rd8-Rd7', 'Re6-Re1', 'Rd7-Rc7', 'Bf2-Bb6'
        ],
        [
            'd2-d4', 'Ng8-Nf6', 'c2-c4', 'e7-e6', 'Ng1-Nf3', 'b7-b6', 'g2-g3', 'Bc8-Ba6', 
            'b2-b3', 'Bf8-Bb4', 'Bc1-Bd2', 'Bb4-Be7', 'Bf1-Bg2', 'Ba6-Bb7', 'Nb1-Nc3', 'd7-d5',
             'c4-d5', 'e6-d5', 'Ke1:Rh1-Kg1:Rf1', 'Ke8:Rh8-Kg8:Rf8', 'Bd2-Bf4', 'Nb8-Na6', 
            'Qd1-Qc2', 'c7-c5', 'Rf1-Rd1', 'Qd8-Qc8', 'Bf4-Be5', 'Rf8-Rd8', 'Ra1-Rc1', 'Nf6-Ne4', 'Qc2-Qb2', 'Qc8-Qe6', 'Nc3-Nb5', 'Be7-Bf8', 'Be5-Bf4', 'Qe6-Qe8', 'a2-a4', 
            'Bb7-Bc6', 'd4-c5', 'b6-c5', 'Nf3-Ne5', 'Bc6-Bb5', 'a4-b5', 'Na6-Nb4', 'Qb2-Qb1',
            'Ne4-Nf6', 'Ne5-Nc6', 'Nb4-Nc6', 'b5-c6', 'Qe8-Qc6', 'Bf4-Bg5', 'a7-a5', 'Bg5-Bf6',
             'Qc6-Qf6', 'Bg2-Bd5', 'Ra8-Ra7', 'Rc1-Rc4', 'Qf6-Qb6', 'Qb1-Qc2', 'Ra7-Rd7', 'e2-e4', 'Kg8-Kh8', 'Kg1-Kg2', 'f7-f5', 'f2-f3', 'g7-g6', 'Rc4-Rc3', 'Qb6-Qc7', 'Rc3-Rd3', 'f5-e4', 'f3-e4', 'Bf8-Bg7', 'Rd1-Rc1', 'Rd8-Rc8', 'Rd3-Rf3', 'Qc7-Qe5', 
            'Rc1-Rf1', 'Qe5-Qd6', 'Qc2-Qe2', 'Rd7-Ra7', 'Qe2-Qe3', 'Qd6-Qe5', 'Rf1-Rf2', 'a5-a4', 'b3-a4', 'Ra7-Ra4', 'Rf3-Rf7', 'Ra4-Rb4' 
            ],
        [
            'e2-e4', 'c7-c5', 'Ng1-Nf3', 'e7-e6', 'd2-d4', 'c5-d4', 'Nf3-Nd4', 'Ng8-Nf6', 'Nb1-Nc3', 'd7-d6', 'Bf1-Be2', 'Bf8-Be7', 'Ke1:Rh1-Kg1:Rf1', 'Nb8-Nc6', 'Bc1-Be3', 'Ke8:Rh8-Kg8:Rf8', 'f2-f4', 'a7-a6', 'a2-a4', 'Rf8-Re8', 'Kg1-Kh1', 'Qd8-Qc7', 'Be2-Bf3', 'Ra8-Rb8', 'Rf1-Re1', 'Bc8-Bd7', 'Qd1-Qd3', 'Nc6-Nd4', 'Be3-Bd4', 'e6-e5', 'Bd4-Ba7', 'Rb8-Rc8', 'Ba7-Be3', 'Qc7-Qc4', 'a4-a5', 'h7-h6', 'h2-h3', 'Be7-Bf8', 'Be3-Bd2', 'Qc4-Qd4', 'Bd2-Be3', 'Qd4-Qb4'
            ],


	];
	
        
    
	// convert rawGames to games
	for(var g=0; g<rawGames.length; g++){
		var newGame = [];
		var rawGame = rawGames[g];
		for(var i=0; i<rawGame.length; i++){
			var move = rawGame[i].split('-');
			var from = move[0];
			var to = move[1];
			
			// check if we have castling
			var fromParts = from.split(':');
			if( fromParts.length > 1 ){
				var toParts = to.split(':');
				newGame.push( new Move(fromParts[0],toParts[0], 'castling') );
				newGame.push( new Move(fromParts[1],toParts[1], 'castling') );
			}else{
				newGame.push( new Move(from, to) );
			}
		}
		games.push(newGame);
	}
	/**
	 * @return Move
	 */
	this.nextMove = function(){
		if( curMoveIndex >= games[curGameIndex].length-1 ){
			curGameIndex += 1;
			if( curGameIndex >= games.length ) curGameIndex = 0;
			curMoveIndex = -1;
			return null;
		}
		curMoveIndex += 1;
		return games[curGameIndex][curMoveIndex];
	}
}

/**
 * @param {string} from
 * @param {string} to
 * @param {string=} type
 * @constructor
 */
function Move( from, to, type ){
	this.from = from.slice(-2);
	this.to = to.slice(-2);
	this.figure = from.length>2 ? charToFigureName( from[0] ) : 'pawn';
	this.type = type? type : 'normal';
}


function charToFigureName( char ){
	var figures = {R: 'rook', N: 'knight', B: 'bishop', Q: 'queen', K: 'king'};
	return ( figures.hasOwnProperty(char) )? figures[char] : '';
}
