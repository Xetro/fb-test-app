export default class MatchmakingCtrl {

  joinQueue = (req, res) => {
    const data = req.body;
    console.log(data);
    res.send('hej hej hej');
  }

}
