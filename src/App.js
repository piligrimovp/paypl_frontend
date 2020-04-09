import React from 'react';
import './App.css';

function App() {
    let goods = [];
    for (let i=0; i < 10; i++) {
        goods.push(<div className="goods-small" key={i}>
            <img src={'https://www.colorbook.io/imagecreator.php?width=5'+ i +'&height=55'} alt="" className="goods-small_image"/>
            <div className="goods-small_info">
                <span className="medium-label">Название товара asdasdas asdasd asdasd asdasd asdasd</span>
                <span className="medium-label">{i * 10000}, руб.</span>
            </div>
        </div>);
    }
  return goods;
}

export default App;
