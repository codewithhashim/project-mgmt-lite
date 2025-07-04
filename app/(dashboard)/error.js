"use client";
import Button from "@/components/button";

export default function Error ({error, reset}){
    return (
        <div>
            <h3>
                Something went wrong!
            </h3>
            <p>{error.message}</p>
            <Button variant="primary" size="large" onClick={() => reset()}>Try again</Button>
        </div>
    )
}