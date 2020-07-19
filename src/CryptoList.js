import React from 'react';
import './CryptoList.css';

function CryptoList(props) {

    let cryptoList = props.cryptoList;

    let listItem = cryptoList.map((Obj) => {

        return(
            <li key={Obj.currency}>
                <span className="Label">Last rate: </span>
                <span className={`CryptoRate ${Obj.cssClass}`}>{Obj.lastRate}  {Obj.htmlArrow}</span>
                <span className="Currency">{Obj.currency}</span>
                <span className="CurrencySymbol">[{Obj.symbol}]</span>
            </li>
        );
    });

    return(
        <div className="CryptoList">
            <ul className="List">
                 {listItem}   
            </ul>
        </div>
    );
}

export default CryptoList;