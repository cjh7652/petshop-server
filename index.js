const express= require("express");
const cors= require("cors");
const app=express();
const models = require('./models');
const multer= require("multer");
const upload=multer({dest: 'uploads/'});
const port=8080;

app.use(express.json());//json형식의 데이터 처리할수 있도록 설정하는 코드
app.use(cors({
  origin: ['http://localhost:3000'], //허용하는 출처 목록
  credentials: true
}
)) //브라우저 이슈 막기위한것

app.get('/products', (req, res)=>{
  models.Product.findAll()
  .then((result)=>{
    console.log("PRODUCTS :", result);
    res.send({
      products: result
    })
  })
  .catch((error)=>{
    console.error(error)
    res.send("에러발생")
  })
})


app.post('/products', (req, res)=>{
  const body=req.body;
  const {name, description, seller, price} =body;
  if(!name|| !description|| !seller|| !price){
    res.send("모든 필드값을 입력해주세요")
  }
  models.Product.create({
    name,
    description,
    price,
    seller
  }).then((result)=>{
    console.log('상품생성결과:',result )
    res.send({result, })
  }).catch((error)=>{
    console.error(error )
    res.send('상품 업로드 실패 하였습니다')
  })
})

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  models.Product.findOne({
    where: {
      id: id,
    }
  }).then((result)=>{
    console.log('PRODUCT: ', result);
    res.send({
      product:result
    })
  }).catch((error)=>{
    console.error(error)
    res.send("상품 조회가 에러 발생함")
  })
});

app.post('/image', upload.single('image'), (req, res)=>{
  const file= req.file;
  res.send({
    imageUrl:file.path
  })
})

//회원가입
app.post('/users', (req, res)=>{
  const body=req.body;
  const {user_id, pw, name, phone, email, birth, marketingChecked}=body;
  if(!user_id || !pw || !name || !phone || !email || !birth || !marketingChecked){
    res.send('모든 필드를 입력해주세요')
  }
  models.User.create({
    user_id,
    pw,
    name,
    phone,
    email,
    birth,
    marketingChecked
  }).then((result)=>{
    console.log('회원가입성공:', result);
    res.send({result, })
  }).catch((error)=>{
    console.error(error)
    res.status(400).send('회원가입실패')
  })
})



//.sync()통해 db를 연결
app.listen(port, ()=>{
  console.log('펫샵 서버가 돌아가고 있습니다.')
  models.sequelize.sync()
  .then(()=>{
    console.log('DB연결 성공')
  })
  .catch((err)=>{
    console.error(err);
    console.log('DB연결 에러')
    process.exit();
  })
})
