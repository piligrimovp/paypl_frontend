import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {LinkContainer} from "react-router-bootstrap";

export default function AboutPage() {
    return <>
        <section className={'container p-0 mb-5'}>
            <Breadcrumb className={'mb-4'}>
                <LinkContainer to={'/'} exact={true}>
                    <Breadcrumb.Item>Главная</Breadcrumb.Item>
                </LinkContainer>
                <Breadcrumb.Item active>О Нас</Breadcrumb.Item>
            </Breadcrumb>
            <div className={'row m-0 p-0 '}>
                <div className={'col p-0'}>
                    <article className={'px-5'}>
                        <h2 className={'mb-2'}>О нас</h2>
                        <p>Vivamus ac viverra magna. Interdum et malesuada fames ac ante ipsum primis in faucibus.
                            Suspendisse ut orci gravida nisl imperdiet mattis nec et justo. Nullam at faucibus est. Ut
                            sed
                            est purus. Suspendisse bibendum vulputate nisl, nec pulvinar nunc vestibulum vehicula. Sed
                            vel
                            ante et magna condimentum ornare non porta ex. Nunc non libero maximus, fermentum sem eget,
                            fermentum risus.</p>

                        <p>Proin condimentum sodales orci, a pellentesque orci consequat ac. Nam imperdiet odio risus,
                            non
                            elementum mauris vestibulum nec. Proin lobortis leo vel semper rhoncus. Donec scelerisque
                            pulvinar erat, et posuere neque pellentesque a. Nulla pretium vel metus vitae laoreet. Cras
                            a
                            molestie tortor, at sagittis ante. Vivamus nisi quam, efficitur vel velit eu, finibus
                            rhoncus
                            mi. Fusce enim erat, pretium sit amet venenatis ut, condimentum ac metus. Mauris finibus
                            neque
                            vel sapien aliquet rhoncus.</p>
                    </article>
                    <article className={'px-5'}>
                        <h2>Покупателям</h2>
                        <article id={'buyers_info'}>
                            <h4>Небольшая информация</h4>
                            <p>Aliquam erat volutpat. Aenean hendrerit justo id ornare iaculis. Quisque a ligula at
                                magna
                                iaculis bibendum eu eget nisi. Mauris eu enim vitae nibh elementum mollis. Praesent
                                massa
                                ligula, mattis a efficitur vel, accumsan in urna. Nam facilisis pellentesque blandit.
                                Etiam
                                maximus auctor metus at iaculis. Vestibulum et volutpat massa.</p>
                        </article>
                        <article id={'buyers_more_info'}>
                            <h4>Еще информация</h4>
                            <p>Nunc vestibulum sapien sit amet massa suscipit faucibus. Suspendisse potenti. Aenean sit
                                amet
                                ipsum finibus, euismod augue sed, ultrices est. In sodales congue odio, nec ultricies
                                libero
                                finibus et. Nunc ut fermentum sapien, in congue leo. Etiam aliquam ex justo, vel
                                consectetur
                                orci placerat vitae. Morbi vehicula, sem non condimentum tempor, dolor elit lobortis mi,
                                vitae
                                sodales turpis dui nec turpis. Suspendisse vitae cursus odio. Quisque quis venenatis
                                nisi.
                                Quisque euismod dui arcu, bibendum consectetur lectus molestie nec. Nunc aliquet finibus
                                nibh id
                                iaculis.</p>
                        </article>
                    </article>
                    <article className={'px-5'}>
                        <h2>Продавцам</h2>
                        <article id={'sellers_info'}>
                            <h4>Какая-то информация</h4>
                            <p>Vivamus placerat feugiat justo, commodo commodo magna dictum et. Morbi pellentesque est
                                ut velit
                                cursus tristique. Suspendisse et scelerisque velit, vitae congue nulla. Suspendisse ex
                                est,
                                bibendum at arcu ut, tempus blandit dui. Vestibulum ante ipsum primis in faucibus orci
                                luctus et
                                ultrices posuere cubilia curae; Nulla eu diam vel erat blandit rhoncus. Aenean vitae
                                tellus
                                tellus. Mauris volutpat gravida vestibulum. Nam maximus id libero non malesuada. Nulla
                                scelerisque dui sed consectetur hendrerit.</p>

                            <p>Praesent nec ante nisl. Proin lectus nunc, molestie ut ullamcorper et, facilisis non
                                felis.
                                Morbi ac odio dictum, laoreet elit at, tristique ante. Quisque ultrices elit varius
                                sagittis
                                condimentum. Morbi dapibus nibh ac egestas faucibus. Praesent blandit dolor non turpis
                                consequat
                                vehicula. Maecenas dignissim non orci id condimentum.</p>

                            <p>Aliquam tellus lectus, sodales quis nisl at, cursus dignissim libero. Praesent pretium
                                sodales
                                arcu aliquam dignissim. Mauris ultricies vulputate diam vel faucibus. Nulla venenatis
                                nibh nisi,
                                quis eleifend mauris aliquam et. Pellentesque justo tortor, tincidunt sed ultrices
                                laoreet,
                                congue ac eros. Pellentesque aliquam faucibus risus, eu dignissim ex iaculis quis.
                                Quisque
                                elementum in dolor id elementum. Nam ac felis quis lacus cursus pellentesque.</p>

                            <p>Phasellus ut luctus lacus. Fusce feugiat sed mauris a pulvinar. Pellentesque mattis magna
                                augue,
                                in sollicitudin orci rutrum vel. Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit.
                                Vivamus hendrerit ex a porta viverra. Vivamus vitae rhoncus magna, sit amet placerat
                                massa. Ut
                                non gravida neque, a euismod arcu.</p>

                            <p>Maecenas placerat, turpis eu venenatis congue, sapien magna imperdiet purus, ac malesuada
                                lectus
                                odio eget lectus. Proin rutrum tellus in metus placerat, nec convallis velit
                                pellentesque.
                                Vivamus non vehicula quam. Cras nunc quam, tincidunt ac tellus id, mattis vestibulum
                                velit.
                                Aliquam erat volutpat. In vehicula, metus vitae aliquet facilisis, elit enim fringilla
                                eros, eu
                                pellentesque ligula enim ac odio. Vestibulum malesuada ipsum est, quis ultricies enim
                                luctus ac.
                                Etiam hendrerit, lacus a varius congue, erat dolor consequat felis, nec imperdiet nibh
                                quam ut
                                ipsum. Integer porta diam eu vehicula laoreet. In hac habitasse platea dictumst. Morbi
                                sit amet
                                ante eget quam gravida suscipit a sit amet nunc.</p>
                        </article>
                    </article>
                </div>
            </div>
        </section>
    </>
}