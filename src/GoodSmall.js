import React, {Component} from 'react';

class GoodSmall extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            character: {}
        }
    }

    componentDidMount() {
        this.setState({loading: true});
        fetch("http://paypl/goods")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    loading: false,
                    goods: data
                })
            })
    }

    render() {
        //if(this.state.loading) {
            return <div>тест</div>;
        //}
    }
}

export default GoodSmall;