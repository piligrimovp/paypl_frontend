import React from "react";
import ErrorPathImage from "../../../media/error-loading.png";

export default function ErrorPath() {
    return (
        <div>
            <img src={ErrorPathImage} className={'img-fluid'}  alt="Страница не найдена((("/>
        </div>
    );
}