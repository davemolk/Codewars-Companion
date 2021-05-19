router.get("/", async (req, res) => {
  const fetchKatas = await db.kata.findAll(); // do something here
  console.log("here is fetchKatas: ", fetchKatas);
  const color = { cName: "green" };
  const big = { ...fetchKatas[0].dataValues, ...color };
  console.log("here is big: ", big);
  console.log(big.name, big.cw, big.cName);
  res.render("katas/index", { big }); // object called songs, pass in fetchSongs whcih is an array of songs
});
