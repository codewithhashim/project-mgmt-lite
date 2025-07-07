"use client";

import { CreateUser } from "@/lib/actions"
import SubmitButton from "./SubmitButton"
import { useRef } from "react"

export default function CreateUserForm() {

    const formRef = useRef(null)

    return(
        <div>
            <form 
            ref={formRef}
            action={
                async (formData) =>{
                    await CreateUser(formData);
                    formRef.current?.reset();
                }
            }

            >
                <input type="text" name="name" placeholder="Full Name" className="border-2"/>
                <textarea name="bio" id="" placeholder="user bio" className="border-2"></textarea>
                <SubmitButton />
            </form>
        </div>
    )
}