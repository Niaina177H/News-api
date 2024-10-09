"use client";

import { Button } from "antd";

//comments for another commit
export default function Error({error, reset}){
    return <div className="fixed top-1/2 left-1/2 w-fit h-fit -translate-x-1/2 -translate-y-1/2">
        <p>Error while getting data</p>
        <Button type="link" color="danger" onClick={reset}>{error}reset</Button>
    </div>
}