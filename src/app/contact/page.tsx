"use client";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const phoneNumberRegexp = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?(-?\s?[0-9])+$/
);

const MessageSchema = z.object({
    name: z.string().max(20),
    email: z.string().email(),
    tel: z.string().regex(phoneNumberRegexp),
    message: z.string().max(255).min(0)
});

export default function Conctact() {
    const {register, handleSubmit, formState} = useForm<z.infer<typeof MessageSchema>>({
        resolver: zodResolver(MessageSchema)
    });

    const submitHandler = (value: z.infer<typeof MessageSchema>) =>  {
        console.log(value)
    }

    return <div className={"flex w-full h-full items-center justify-center flex-col gap-4"}>
        <h1 className={"font-bold text-2xl"}>Enter your contact information</h1>
        <form className={"flex justify-center items-center flex-col gap-4"} onSubmit={handleSubmit(submitHandler)}>
            <input
                className={
                    formState.errors.name && "border-red-500"
                }
                placeholder={"Name"}
                {...register("name")}
            />
            <input
                className={
                    formState.errors.email && "border-red-500"
                }
                type={"email"}
                placeholder={"Email"}
                {...register("email")}
            />
            <input
                className={
                    formState.errors.tel && "border-red-500"
                }
                type={"tel"}
                placeholder={"Phone"}
                {...register("tel")}
            />
            <textarea
                className={"resize-y w-full"}
                placeholder={"Message"}
                {...register("message")}
            />
            <button type={"submit"} className={"bg-blue-600 p-2 rounded-md w-1/2"}>Submit</button>
        </form>
    </div>
}