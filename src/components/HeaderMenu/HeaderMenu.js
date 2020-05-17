import React, {Component} from 'react';
import {Button, ButtonGroup, Dropdown, DropdownButton} from "react-bootstrap";
import {Link} from "react-router-dom";

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
            method: 'POST'
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    loading: false,
                    categories: [...this.state.categories, ...data],
                });
            });
    }

    renderCategories(categories, path = '') {
        return <>
            {categories.map(category => {
                let locPath = path + '/' + category.slug;
                if (category.children.length > 0) {
                    return (
                        <Dropdown key={'cat' + category.id} as={ButtonGroup} className={'btn-block'} drop={'right'}
                                  id={'dropdown-group' + category.id}>
                            <Link className={'btn btn-block btn-link text-left'} to={locPath}>
                                {category.name}
                            </Link>
                            <Dropdown.Toggle split variant="link" id={"dropdown-split-basic"+category.id}/>

                            <Dropdown.Menu>
                                {this.renderCategories(category.children, path)}
                            </Dropdown.Menu>
                        </Dropdown>
                    );
                } else {
                    return (<Dropdown.Item key={category.id} as={'div'} className={'p-0'}>
                            <Link to={locPath} className={'btn btn-block btn-link text-left'}>
                                {category.name}
                            </Link>
                        </Dropdown.Item>
                    )
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
                    {this.renderCategories(this.state.categories, '/catalog')}
                </DropdownButton>
            </nav>;
        }
    }
}


