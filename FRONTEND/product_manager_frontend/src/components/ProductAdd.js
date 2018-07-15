import React, { Component } from 'react';
import axios from 'axios';
const addproductAxios = (product_name,product_price,images) => {
  return axios.post('/add',{product_name,product_price,images})
    .then((res) => res.data);
}
class ProductAdd extends Component {

    constructor(props){
        super(props);
        this.state = {
            product_name: '',
            product_price: '',
            images:''
        };
    }



    isChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]:value
        });
        
    }



    hanlder = () => {
        console.log(JSON.stringify(this.state));
          var {product_name,product_price,images} = this.state;
          addproductAxios(product_name,product_price,images).then((res) => {
            console.log(res);
          })
        }

    render() {
        return (
            <div className="container">
            <div className="row">
              <div className="col-12">
                <hr />
              </div>
              <div className="col-8 mx-auto">
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
                  <button type="reset" onClick={() => this.hanlder()} className="btn btn-info">Thêm mới</button>
                </form>
              </div>
            </div>
          </div>
          
        );
    }
}

export default ProductAdd;