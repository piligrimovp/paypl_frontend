import React from "react";
import EditorJS from "@editorjs/editorjs";
import Table from '@editorjs/table'
import Paragraph from '@editorjs/paragraph'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import {Breadcrumb, Card, Form, FormControl, FormGroup, FormLabel, Button, Alert} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import ProfileMenu from "../../../components/profileMenu/profileMenu";
import EditImage from "../../../components/Edit/EditImage/EditImage";
import CurrencyInput from 'react-currency-input-field'
import {createAuthProvider} from "../../../Entity/AuthProvider";

export const {authFetch} = createAuthProvider();

export default class CreateClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            good: {
                medias: [],
                medias_preview: [],
                price: null,
            },
            errors: [],
            category: [],
            categories: [],
            tax: null,
            errorUpload: {
                status: false,
                message: 'Ошибка загрузки'
            },
            erros: {},
            loading: false
        }
    }

    componentDidMount(): void {
        this.editor = new EditorJS({
            holder: 'js-editor',
            tools: window.TOOLS
        })
        fetch(window.HOST + "/categoryMap", {
            method: 'POST'
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    categories: [...this.state.categories, ...data],
                });
            });
    }

    fileUpload = (event) => {
        event.persist()
        let new_medias = [...this.state.good.medias, ...event.target.files];
        let new_medias_preview = this.state.good.medias_preview;
        for (var i = 0; i < event.target.files.length; i++) {
            new_medias_preview.push(URL.createObjectURL(event.target.files[i]));
        }
        this.setState({
            good: {
                ...this.state.good,
                medias: new_medias,
                medias_preview: new_medias_preview,
            }
        })
        event.target.files = null;
    }

    deleteFile = (index) => {
        let medias = this.state.good.medias;
        let medias_preview = this.state.good.medias_preview;
        medias.splice(index, 1);
        medias_preview.splice(index, 1);
        this.setState({
            good: {
                price: 0,
                quantity: 0,
                medias: medias,
                medias_preview: medias_preview
            }
        })
    }

    renderCategories = (categories, i = 0) => {
        let nextCategories = null;
        return <>
            <table className="table table-bordered d-inline table-custom">
                <tbody>
                {categories.map((item, index) => {
                    {
                        if (item.slug === this.state.category[i] && item.children.length > 0) {
                            nextCategories = item.children
                        }
                    }
                    return <tr key={index}>
                        {item.slug === this.state.category[i] ?
                            <td className={'td_active'} onClick={() => this.selectCategory(item.slug, i)}>
                                {item.name}</td>
                            :
                            <td onClick={() => this.selectCategory(item, i)}>
                                {item.name}</td>
                        }
                    </tr>
                })}
                </tbody>
            </table>
            {nextCategories && this.renderCategories(nextCategories, i + 1)}
        </>
    }

    selectCategory = (cat, index) => {
        let category = this.state.category;
        category.splice(index);
        category.push(cat.slug);
        this.setState({
            category: category,
            tax: cat.tax,
            good: {
                ...this.state.good,
                category_slug: cat.slug
            }
        })
    }

    onChange = ({target: {name, value}}: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            good: {
                ...this.state.good,
                [name]: value
            }
        })
    };

    onSubmit = (event?: React.FormEvent) => {
        if (event) {
            event.preventDefault();
        }
        this.setState({
            errors: {},
            loading: true,
            errorUpload: {
                ...this.state.errorUpload,
                status: false
            }
        });
        this.editor.save().then((outputData) => {
            let formData = new FormData()
            formData.append('description', JSON.stringify(outputData.blocks));
            let category_slug = this.state.category.pop();
            formData.append('category_slug', category_slug);
            this.state.good.medias.map((file, index) => {
                formData.append('media_' + index, file)
                return true;
            });
            this.setState({
                category: [...this.state.category, category_slug]
            });
            for (let [key, value] of Object.entries(this.state.good)) {
                formData.append(key, value);
            }
            formData.delete('medias');
            formData.append('medias', [this.state.good.medias]);
            authFetch(window.HOST + '/goods/store', {
                method: 'POST',
                body: formData
            })
                .then(r => r.json())
                .then(data => {
                    if (data.status === 'success') {
                        this.setState({
                            loading: false
                        })
                        window.location.href = '/profile/products';
                    }
                    if (data.status === 'error') {
                        this.setState({
                            loading: false,
                            errors: data.error
                        })
                    }
                })
                .catch(error => {
                    this.setState({
                        loading: false,
                        errorUpload: {
                            ...this.state.errorUpload,
                            status: true
                        }
                    })
                })
        }).catch((error) => {
            this.setState({
                loading: false,
                errorUpload: {
                    ...this.state.errorUpload,
                    status: false
                }
            })
        });
    }

    render(): React.ReactNode {
        return <section className={'container pb-5 p-0'}>
            <Breadcrumb className={'mb-4'}>
                <LinkContainer to={'/'} exact={true}>
                    <Breadcrumb.Item>Главная</Breadcrumb.Item>
                </LinkContainer>
                <LinkContainer to={'/profile'} exact={true}>
                    <Breadcrumb.Item>Профиль</Breadcrumb.Item>
                </LinkContainer>
                <LinkContainer to={'/profile/seller'} exact={true}>
                    <Breadcrumb.Item>Cтраница продавца</Breadcrumb.Item>
                </LinkContainer>
                <Breadcrumb.Item active>Добавление товара</Breadcrumb.Item>
            </Breadcrumb>
            <div className={'row m-0 justify-content-between'}>
                <div className={'col-10 p-0 justify-content-center row'}>
                    <Form className={'col-8 p-0'} onSubmit={this.onSubmit}>
                        {this.state.errorUpload.status && <Alert variant={'danger'}>
                            {this.state.errorUpload.message}</Alert>}
                        <div className={'row m-0'}>
                            <FormGroup controlId={'name'}>
                                <FormLabel>Название товара*</FormLabel>
                                {
                                    this.state.errors.hasOwnProperty('name') ?
                                        <Form.Control name='name' onChange={this.onChange} required isInvalid
                                                      type={'name'}/>
                                        : <Form.Control name={'name'} onChange={this.onChange} required type={'name'}/>
                                }
                                <Form.Control.Feedback type='invalid'>{this.state.errors.name}</Form.Control.Feedback>
                            </FormGroup>
                            <FormGroup controlId={'price'} className={'ml-3'}>
                                <FormLabel>Цена*</FormLabel>
                                {
                                    this.state.errors.hasOwnProperty('price') ?
                                        <CurrencyInput required={true} name='price'
                                                       onChange={(value, name) => this.setState({
                                                           good: {
                                                               ...this.state.good,
                                                               [name]: value
                                                           }
                                                       })}
                                                       className={'form-control is-invalid'} allowDecimals={true}
                                                       decimalsLimit={2} prefix={'₽'}/>
                                        :
                                        <CurrencyInput required={true} name='price' className={'form-control'}
                                                       allowDecimals={true} decimalsLimit={2} prefix={'₽'}
                                                       onChange={(value, name) => this.setState({
                                                           good: {
                                                               ...this.state.good,
                                                               [name]: value
                                                           }
                                                       })}/>
                                }
                                <Form.Control.Feedback type='invalid'>{this.state.errors.price}</Form.Control.Feedback>
                            </FormGroup>
                            <FormGroup controlId={'price'} className={'ml-3'}>
                                <FormLabel>Количество</FormLabel>
                                {
                                    this.state.errors.hasOwnProperty('quantity') ?
                                        <FormControl onChange={this.onChange} isInvalid type={'number'}
                                                     name={'quantity'}/>
                                        :
                                        <FormControl onChange={this.onChange} type={'number'}
                                                     name={'quantity'}/>
                                }
                                <FormControl.Feedback
                                    type={'invalid'}>{this.state.errors.quantity}</FormControl.Feedback>
                            </FormGroup>
                        </div>
                        <div className={'row m-0'}>
                            <FormGroup controlId={'price'}>
                                <FormLabel>Категория*</FormLabel>
                                <div className={'position-relative'}>
                                    {this.renderCategories(this.state.categories)}
                                </div>
                                {this.state.tax &&
                                <Alert className={'mt-3'} variant={'secondary'}>
                                    Комиссия по выбранной категории - <strong>{this.state.tax}%</strong>
                                </Alert>}
                                {this.state.errors.hasOwnProperty('category_slug') &&
                                <FormControl type={'text'} className={'d-none'} isInvalid readOnly/>
                                }
                                <FormControl.Feedback type={'invalid'}>
                                    {this.state.errors.category}</FormControl.Feedback>
                            </FormGroup>
                        </div>
                        <div className={'row m-0 mt-4'}>
                            <div className={'col-12 p-0'}>
                                <Card className={''}>
                                    <Card.Header>
                                        Описание товара*
                                    </Card.Header>
                                    <Card.Body>
                                        <div className={''} id={'js-editor'}/>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                        <div className={'row m-0 mt-4'}>
                            <div className={'row m-0 col-12'}>
                                <h4 className={'mb-3'}>Изображения</h4>
                            </div>
                            {this.state.good.medias_preview.map((item, index) => {
                                return <div className={'goods-media mx-2 mt-2'} key={index}>
                                    <EditImage name={'media'} value={item} circle={false} delete={true}
                                               deleteFunction={() => this.deleteFile(index)}/>
                                </div>
                            })}
                            <FormControl className={'mt-2'} multiple type={'file'} onChange={this.fileUpload}/>
                        </div>
                        <div className={'row m-0 mt-3'}>
                            {!this.state.loading ?
                                <Button type={'submit'}>Добавить</Button>
                                : <Button disabled>Добавление...</Button>
                            }
                        </div>
                    </Form>
                </div>
                <ProfileMenu/>
            </div>
        </section>
    }
}