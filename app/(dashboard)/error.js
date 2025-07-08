"use client";
import { Button } from "@/components/ui/button";

export default function Error ({error, reset}){
    return (
        <div>
            <h3>
                Something went wrong!
            </h3>
            <p>{error.message}</p>
            <Button onClick={()=>reset()}>Try Again</Button>
        </div>
    )
}