const express= require("express");
const cors= require("cors");
const app=express();
const port=8080;

app.use(express.json());//json형식의 데이터 처리할수 있도록 설정하는 코드
app.use(cors()) //브라우저 이슈 막기위한것

app.get('/products', (req, res)=>{
  res.send('업로드된 상품들입니다.')
})
app.post('/products', (req, res)=>{
  res.send('상품이 등록되었습니다.')
})

app.listen(port, ()=>{
  console.log('펫샵 서버가 돌아가고 있습니다.')
})