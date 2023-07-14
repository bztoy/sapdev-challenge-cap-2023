namespace golf;
using { managed, cuid, sap } from '@sap/cds/common';

entity Rounds: managed, cuid {
  round : Integer;
  title  : String(111);
  playerName : String;
  roundScore: Integer;
  holes : Composition of many Holes on holes.round = $self;
  // holes : Composition of many {
  //   key hold : Association to Holes;
  //   score : Integer;
  // } 
}

entity Holes: cuid {
  holeNumber : Integer;
  //hole : Integer @assert.range: [1,18];
  //round : Association to Rounds
  round : Association to Rounds;
  shots : Composition of many Shots on shots.hole = $self;
  distance : Integer;
  par: Integer;
  //par: Integer @assert.range: [3,5];
  score: Integer;
}

entity Shots: cuid {
  hole : Association to Holes;
  shot : Integer;
  distanceToGo : Integer;
  ballOnTarget : Boolean;
}