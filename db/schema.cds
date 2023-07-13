namespace golf;
using { managed, cuid, sap } from '@sap/cds/common';

entity Rounds: managed, cuid {
  round : Integer;
  title  : String(111);
  holes : Composition of many Holes on holes.round = $self;
  roundScore: Integer;
}

entity Holes: cuid {
  hole : Integer;
  //hole : Integer @assert.range: [1,18];
  round : Association to Rounds;
  shots : Composition of many Shots;
  par: Integer;
  //par: Integer @assert.range: [3,5];
  score: Integer;
}

entity Shots: cuid {
  hole : Association to Holes;
  shot : Integer;
  ballOnTarget : Boolean;
}