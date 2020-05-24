import React from "react";
import {createAuthProvider} from "../../../Entity/AuthProvider";
import {Image} from "react-bootstrap";

export const {getUser} = createAuthProvider();

export default function ProfilePage() {
    return <>
        <h1>{getUser().name}</h1>
        <Image src={getUser().avatar} />
    </>
}