var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg')
/*connect poll vs database  postGres*/
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'SanPham',
  password: 'Anhyeuemhy2408',
  port: 8080,
})
/* GET home page. */
router.get('/', function(req, res, next) {  });
// có 1 trường hợp k thể import cách cổ điển thì ai cũng vào được
// dùng axios thì nó báo lỗi ??
//tốt nhất mình nên quy định xem thằng front - endl nào được quyền trao đối dữ liệu ở back-end
// LINK : https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue/18311469#18311469
//access-control-allow-methold

// loại bỏ 1 số thành phần ngoại đạo ra khỏi web
router.get('/apidemo1', function(req, res, next) {
  
  //get data
  pool.query('SELECT * FROM product_info',(error,response) => {
    if(error)
    {
      console.log(error);
    }
    else
    {
       // cách để nó hiện API ra ngoài trang web
       //http://localhost:4000/apidemo1
       res.send(response.rows);
    }
    //pool là mở hoặc tắt cổng kết nối
     // pool.end();
  })
});

//đây là router khởi tạo đường link add
router.get('/add', function(req, res, next){ 
  res.render('add',{});
 });

 // đây là router điều hướng link để khi nhấn vào suubmit nó sẽ là POST dữ liệu
 router.post('/add', function(req, res, next){ 
   //req là resqest là dữ liệu trả về
   // nhận dữ liệu và nhận dữ liệu trước đó phải tạo 1 tập tin là add.ejs ở view để nó in ra
  var product_name = req.body.product_name,
  product_price = req.body.product_price,
  images = req.body.images;


// lệnh pgSQL thêm mới dữ liệu từ from của nodeJS
  pool.query("INSERT INTO product_info (product_name , product_price , images) VALUES ($1,$2,$3)",[product_name,product_price,images],(error,res)=>{
      if(error)
      {
        res.send(error);
      }
      else
      {
        res.send('nhập được dữ liệu sml' + product_name + product_price + images);
      }
  })
 });

module.exports = router;
