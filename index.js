const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const data = require('./data');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/', (req, res) => {
  const postCount = data.users.length;
  const perPage = 10;
  let page = 1;
  const pageCount = Math.ceil(postCount / perPage);

  res.json({
    data: data.users.slice(0, perPage),
    page: 1,
    pageCount
  });
});

app.post('/api/', (req, res) => {
  const { head, order, searchfield, currentPage } = req.body;

  const filteredUsers = data.users.filter(user => {
    return JSON.stringify(user)
      .toLowerCase()
      .includes(searchfield.toLowerCase());
  });
  const copy = [...filteredUsers];

  const postCount = copy.length;
  const perPage = 10;
  let page = currentPage;
  const pageCount = Math.ceil(postCount / perPage);

  let first = parseInt();
  if (postCount <= 10) {
    first = 0;
  } else {
    first = (page - 1) * perPage;
  }

  let second = page * perPage;

  const compareValues = (key, order = 'asc') => {
    return (a, b) => {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

      let comparision = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === 'desc' ? comparison * -1 : comparison;
    };
  };

  res.json({
    data:
      head === ''
        ? copy.slice(first, second)
        : copy.sort(compareValues(head, order)).slice(first, second),
    page,
    pageCount
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
