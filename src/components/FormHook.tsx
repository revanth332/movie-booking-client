import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { SubmitHandler, useForm } from "react-hook-form"
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod'

const schema = z.object({
    email:z.string().email(),
    password:z.string().min(8).refine((val) => {
        const exp = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return exp.test(val)
    },"Password did meet the requirements")
});

type FormFields = z.infer<typeof schema>;

export default function FormHook() {
    const {register,handleSubmit,reset,formState:{errors}} = useForm<FormFields>({resolver:zodResolver(schema)});

    const onSubmit : SubmitHandler<FormFields> = (data) => {
        console.log(data);
        reset()
    }

  return (
    <div className="w-3/4 mx-auto mt-20">
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input {...register("email")} type="email" placeholder="email" />
            { errors.email && 
                <div className="text-red-500">{errors.email.message}</div>
            }
            <Input {...register("password")} type="password" placeholder="password"/>
            {errors.password && 
                <div className="text-red-500">{errors.password.message}</div>
            }
            <Button type="submit">Submit</Button>
        </form>
    </div>
  )
}
