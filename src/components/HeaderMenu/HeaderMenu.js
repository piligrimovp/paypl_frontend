import React, {Component} from 'react';
import {Button, Dropdown, DropdownButton} from "react-bootstrap";

export default class HeaderMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            loading: false,
        };
    }

    componentDidMount() {
        this.setState({loading: true});
        fetch(window.HOST + "/categoryMap", {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    loading: false,
                    categories: [...this.state.categories, ...data.categories],
                });
            });
    }

    renderCategories(categories, path = '') {
        return <>
            {categories.map(category => {
                let locPath = path + '/' + category.slug;
                if (category.children.length > 0) {
                    return <DropdownButton variant={'link btn-block text-left'} key={category.id} id={category.id}
                                           title={category.name} drop={'right'}>
                        {this.renderCategories(category.children, locPath)}
                    </DropdownButton>;
                } else {
                    return <Dropdown.Item key={category.id} href={locPath}>{category.name}</Dropdown.Item>
                }
            })}
        </>;
    }

    render() {
        if (this.state.loading || this.state.categories.length === 0) {
            return <nav className="btn-group mr-4" role="group">
                <Button variant={"link"}>Каталог</Button>
            </nav>
        } else {
            return <nav className={"btn-group mr-4"} role={'group'}>
                <DropdownButton variant={'link btn-block text-left'} title={'Каталог'} id={0}>
                    {this.renderCategories(this.state.categories, 'category')}
                </DropdownButton>
            </nav>;
        }
    }
}


