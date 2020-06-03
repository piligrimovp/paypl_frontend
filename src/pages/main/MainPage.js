import React from "react";
import GBlockGoods from "../../components/GBlockGoods/GBlockGoods";
import GBlockGoodsLarge from "../../components/GBlockGoodsLarge/GBlockGoodsLarge";

document.title = "PayPlay";
export default function MainPage() {
    return <>
        <section className={'container p-0 pb-5'}>
            <section className={'row m-0 justify-content-between'}>
                <GBlockGoods title={'Популярное'} mode={'popular'}/>
                <GBlockGoods title={'Новинки'} mode={'novelty'}/>
                <GBlockGoods title={'Какая-то подборка'} mode={'all'}/>
            </section>
            <section className={'mt-5 shadow-sm m-0 p-0'}>
                <GBlockGoodsLarge mode={'all'}/>
            </section>
        </section>
    </>
}

