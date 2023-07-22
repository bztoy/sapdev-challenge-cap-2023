const cds = require('@sap/cds')

class CatalogService extends cds.ApplicationService {
    init(){
        const {Rounds, Holes, Shorts} = this.entities;
        this.before ('CREATE', Holes, async req => {
            const score = req.data.score;
            const par = req.data.par;
            const intResult = score - par;

            console.log(`custom logic is calculating the result based on score: ${score} and par: ${par}`);

            let result = '';

            if (score === 1) {
                result = "hole in one";
            }

            if (!result) {
                switch (intResult) {
                    case -3:
                        result = 'albatross';
                        break;
                    case -2:
                        result = 'eagle';
                        break;
                    case -1:
                        result = 'birdie';
                        break;
                    case 0:
                        result = 'par';
                        break;
                    case 1:
                        result = 'par';
                        break;
                    case 2:
                        result = 'par';
                        break;
                    case 3:
                        result = 'par';
                        break;
                    default:
                        result = 'incorrect data!';
                        break;
                }
            }

            console.log(`the result is ${result}`);
            req.data.result = result;

            // check associated ID
            const id = req.data.round_ID;
            if (id) {
                console.log("Round id is provided, in case of the ID is valid, it will be associated by this data")
                const round = await SELECT.one.from (Rounds) .where({ID: id});
                if (round) {
                    req.data.round = round;
                    console.log(`this stat will be ascociated to hole: ${req.data.holeNumber} / round: ${round.round} of ${round.playerName}`);
                } else {
                    console.log(`round ID: ${id} was not found in Rounds entity`);
                    req.data.round_ID = null;
                }
            }

        })


        return super.init()
    }
}
module.exports = CatalogService;