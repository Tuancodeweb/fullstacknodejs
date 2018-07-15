import React, { Component } from 'react';
import './App.css';
import Headtitle from './components/Headtitle';
import Reduct from './components/Reduct';
// import DataProduct from 'http://localhost:4000/apidemo1'
import axios from 'axios';
const getproductdata = () => {
  return axios.get('/apidemo1')
              .then(function(res){
                return res.data;
              })
}


const addproductAxios = (product_name,product_price,images) => {
  return axios.post('/add',{product_name,product_price,images})
    .then((res) => res.data);
}



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:null,
      product_name: '',
      product_price: '',
      images:''
    }
  }

  componentWillMount() {
    if(this.state.data === null){
      getproductdata().then((res) => {
          this.setState({
              data:res
          });
      })
    }
  }

  printfdata = () => {
    if(this.state.data !== null)
    {
       return this.state.data.map((value,key) => {
          return (
            <Reduct 
            key={key}
            product_name={value.product_name}
            product_price={value.product_price} 
            images={value.images}
            />
          )
        });
    }
  }



  isChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    this.setState({
        [name]:value
    });
    
}



  hanlder = () => {
      var {product_name,product_price,images} = this.state;



      var datatemp = [];
      var item = {};
      item.product_name = product_name;
      item.product_price = product_price;
      item.images = images;

      datatemp = this.state.data;
      if(item.product_name !== '')
      {
        datatemp.push(item);
        this.setState({
          data:datatemp
        });
        
      }


      addproductAxios(product_name,product_price,images).then((res) => {
        console.log(res);
      })
    }


  
  render() {
    console.log(this.state.data)
    return (
      <div>
        <Headtitle/>
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="row">
                    {this.printfdata()}
                </div>
              </div>



              <div className="col-4">
              <div className="row">
                <div className="col-12">
                  <hr />
                </div>
                <div>
                  <form>
                    <div className="form-group">
                      <label htmlFor="product_name">Thêm mới tên </label>
                      <input type="text" onChange={(event) => this.isChange(event) } className="form-control" name="product_name" id="product_name" aria-describedby="name_text" placeholder="Thêm mới tên" />
                      <small id="name_text" className="form-text text-muted">Nhập tên zô</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="product_price">Giá sản phẩm </label>
                      <input type="text" onChange={(event) => this.isChange(event) } className="form-control" name="product_price" id="product_price" aria-describedby="name_text" placeholder="Thêm mới tên" />
                      <small id="name_text" className="form-text text-muted">Nhập Giá zô</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="images">Ảnh cần thêm(LINK)</label>
                      <input type="text" onChange={(event) => this.isChange(event) } className="form-control" name="images" id="images" aria-describedby="name_text" placeholder="Thêm mới tên" />
                      <small id="name_text" className="form-text text-muted">Nhập link ảnh zô</small>
                    </div>
                    <button type="reset" onClick={() => this.hanlder()} className="btn btn-block btn-info">Thêm mới</button>
                  </form>
                </div>
              </div>
            </div>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
