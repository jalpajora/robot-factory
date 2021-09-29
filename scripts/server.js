const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 5000;

server.use(jsonServer.bodyParser);
server.use(middlewares);
const db = router.db;

// server.use(
//   jsonServer.rewriter({
//     '/robots/:id/extinguish': '/robots/:id',
//     '/robots': '/robots?_limit=10',
//   })
// );

// server.use('/robots/:id/extinguish', router);

// server.post('/post/user', (req, res) => {
//   if (req.method === 'POST') {
//     let userId = req.body['userId'];
//     if (userId != null && userId >= 0) {
//       let result = db.users.find((user) => {
//         return user.userId == userId;
//       });

//       if (result) {
//         let { id, ...user } = result;
//         res.status(200).jsonp(user);
//       } else {
//         res.status(400).jsonp({
//           error: 'Bad userId',
//         });
//       }
//     } else {
//       res.status(400).jsonp({
//         error: 'No valid userId',
//       });
//     }
//   }
// });

server.get('/robots', (req, res) => {
  if (req.method === 'GET') {
    db.read();

    const robots = db.get('robots');
    if (robots) {
      const batchOfRobots = robots.slice(0, 10);
      res.status(200).jsonp(batchOfRobots);
      return;
    }

    res.status(200).jsonp([]);
  }
});

server.post('/robots/recycle/:id', async (req, res, next) => {
  if (req.method === 'POST') {
    db.read();
    const robots = db.get('robots') || [];
    const { id } = req.params;

    const result = robots.filter((robot) => {
      return robot.id !== Number(id);
    });

    router.db.setState({ robots: result });
    await db.write();

    res.status(200).jsonp(result);
  }
});

server.post('/robots/recycle', async (req, res, next) => {
  if (req.method === 'POST') {
    db.read();
    const robots = db.get('robots') || [];
    const recycleRobots = req.body.recycleRobots || [];

    const result = robots.filter((robot) => {
      return !recycleRobots.includes(robot.id);
    });

    router.db.setState({ robots: result });
    await db.write();

    res.status(200).jsonp(result);
  }
});

server.put('/robots/:id', async (req, res, next) => {
  if (req.method === 'PUT') {
    db.read();
    const robots = db.get('robots') || [];
    const { id } = req.params;
    const body = req.body || {};

    const result = robots.map((robot) => {
      if (robot.id === Number(id)) {
        return body;
      }

      return robot;
    });

    router.db.setState({ robots: result });
    await db.write();

    res.status(200).jsonp(result);
  }
});

server.post('/robots/:id/extinguish', async (req, res, next) => {
  if (req.method === 'POST') {
    db.read();
    const robots = db.get('robots') || [];
    const { id } = req.params;
    let updatedRobot = null;

    const newValue = robots.map((robot) => {
      if (robot.id === Number(id)) {
        updatedRobot = {
          ...robot,
          statuses: robot.statuses.filter((value) => value !== 'on fire'),
        };
        return updatedRobot;
      }
      return robot;
    });

    router.db.setState({ robots: newValue });
    await db.write();

    res.status(200).jsonp(updatedRobot);
  }
});

server.post('/shipments/create', async (req, res) => {
  if (req.method === 'POST') {
    db.read();
    const robots = db.get('robots') || [];
    const shipments = db.get('shipments') || [];
    const id = req.body.id || [];

    const dataRobots = robots.filter((robot) => {
      return robot.id !== id;
    });

    console.log(dataRobots);
    console.log([...shipments.ids, id]);
    router.db.setState({ robots: dataRobots });
    shipments.db.setState({ ids: [...shipments, id] });
    await db.write();

    res.status(200).jsonp({
      robots: dataRobots,
      shipments: [...shipments, id],
    });
  }
});

server.use(router);
server.listen(port, () => {
  console.log('listening now...', port);
});
