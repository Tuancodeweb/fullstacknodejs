import React, { Component } from 'react';

class Headtitle extends Component {
    render() {
        return (
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <h1 className="display-3">Hiển thị sản phẩm</h1>
              <p className="lead">Sử dụng reactJS lấy dữ liệu từ noteJS</p>
              <hr className="my-2" />
            </div>
          </div>
        );
    }
}

export default Headtitle;