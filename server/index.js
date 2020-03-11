const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors());
app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test_admin', {
  useFindAndModify: true,
  useNewUrlParser: true,
  useCreateIndex: true
});

const Article = mongoose.model('Articles', mongoose.Schema({
  title: { type: String },
  desc: { type: String }
}));

app.get('/', async (req, res) => {
  res.send('23232');
})

// 文章列表
app.get('/api/articles', async (req, res) => {
  const articles = await Article.find();
  res.send(articles);
})

// 创建文章
app.post('/api/articles', async (req, res) => {
  const articles = await Article.create(req.body);
  res.send(articles);
})

// 删除
app.delete('/api/articles/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.send({
    status: true
  });
})

// 编辑
app.get('/api/articles/:id', async (req, res) => {
  const articles = await Article.findById(req.params.id);
  res.send(articles);
})

// 编辑内容
app.put('/api/editArticle/:id', async (req, res) => {
  const articles = await Article.findByIdAndUpdate(req.params.id, req.body);
  res.send(articles);
})


const Login = mongoose.model('Login', mongoose.Schema({
  userName: { type: String },
  pwd: { type: String }
}))

// 登录
app.post('/api/login', async (req, res) => {
  await Login.find(req.body, (err, docs) => {
    if (docs.length > 0) {
      res.send({
        status: true,
        token: '6666',
        userName: docs[0].userName,
        id: docs[0]._id
      })
    } else {
      res.send({
        status: false
      });
    }
  });
})

// 注册
app.post('/api/register', async (req, res) => {
  const register = await Login.create(req.body);
  res.send(register);
})

// 退出登录
app.delete('/api/returnBack/:id', async (req, res) => {
  await Login.findOneAndDelete();
  res.send({
    status: true
  })
})


app.listen(3001, () => {
  console.log('http://localhost:3001');
});