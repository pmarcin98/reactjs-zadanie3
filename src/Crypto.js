import React, {Component} from 'react';
import './Crypto.css';
import CryptoList from './CryptoList';
import axios from 'axios';

class Crypto extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cryptoList: [],
            filteredCryptoList: [],
        };
    }

    getData = () => {
        axios.get('https://blockchain.info/pl/ticker')
        .then(res => {
            const cryptoList = res.data;
            this.setState((state) => {
                let newList = [];

                for (const [ticker, crypto] of Object.entries(cryptoList)) {
                    
                    let lastObj = state.cryptoList.find((cryptoObject) => {
                        return(
                            cryptoObject.currency === ticker
                        );
                    });
                    
                    let newObj = {
                        currency: ticker,
                        lastRate: crypto.last,
                        symbol: crypto.symbol,
                    }

                    if (lastObj !== undefined) {
                        if (newObj.lastRate > lastObj.lastRate) {

                            newObj.cssClass = 'green';
                            newObj.htmlArrow = String.fromCharCode(8593);

                        } else if (newObj.lastRate < lastObj.lastRate) {

                            newObj.cssClass = 'red';
                            newObj.htmlArrow = String.fromCharCode(8595);
                            
                        } else {
                            newObj.cssClass = 'blue';
                            newObj.htmlArrow = String.fromCharCode(8596);
                        }
                    } else {
                        newObj.cssClass = 'blue';
                        newObj.htmlArrow = String.fromCharCode(8596); 
                    }

                    newList.push(newObj);
                }

                return({
                    cryptoList: newList
                })
            });

            this.filterList();
        });
    }

    filterList = () => {
        this._inputFilter.value = this._inputFilter.value.trim().toUpperCase();

        this.setState((state) => {
            let newFilterList = state.cryptoList.filter((cryptoObject) => {
                return(cryptoObject.currency.includes(this._inputFilter.value));
            });

            return({
                filteredCryptoList: newFilterList
            });
        });
    }
     
    
    componentDidMount() {

        this.getData();
        this.timerID = setInterval(
            () => this.getData(),
            5000
          );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {

        return(
            <div className="Crypto">
                <input ref={element => this._inputFilter = element} onChange={this.filterList} type="text" placeholder="Filter" />
                < CryptoList cryptoList={this.state.filteredCryptoList} />
            </div>
        );
    }
}

export default Crypto;