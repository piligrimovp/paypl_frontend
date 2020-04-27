import React from "react";
import error from "../../../media/error-loading.png";

export default function ErrorLoading() {
    return (
        <div className="error-loading">
            <img src={error} className={'img-fluid'}  alt="Ошибка при загрузке данных"/>
        </div>
    );
}