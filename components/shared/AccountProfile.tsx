
"use client"; 
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import { userValidation } from '@/lib/validations/user';
import * as z from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from '../ui/button';
import { ChangeEvent } from 'react';
interface Props {
  user:{
    id:string,
    objectId:string,
    username:string,
    name:string
    imageUrl:string,
    bio:string,
  }
  btnTitle:string
}
export default function AccountProfile({user, btnTitle}:Props){
  let form = useForm({
    resolver: zodResolver(userValidation),
    defaultValues: {
      profile_photo:'',
      name: "",
      username: "",
      bio: "",
    }
  });
  const handleImage = (e:ChangeEvent, fieldChange:(value:string)=>void) => {
    e.preventDefault();

  }
  function onSubmit(values: z.infer<typeof userValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values) 
  }
  return ( 
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-10">
      <FormField

        control={form.control}
        name="profile_photo"
        render={({ field }) => (
          <FormItem className='flex items-center gap-4'>
            <FormLabel className='account-form_image-label'>Username</FormLabel>
            {field.value ? (<Image src={field.value}
                width={96}
                src={field.value}
                alt="profile photo"
                priority
                className={`rounded-full object-contain`}
                height={96}/>) :(  <Image src={field.value}
              width={96}
              src="/assets/profile.svg"
              alt="profile photo"
              priority
              className={`rounded-full object-contain`}
              height={96}/>

            )}
            <FormControl className='flex-1 text-base-semibold text-gray-200'>
              <Input
                type='file'
                accept='image/*'
                placeholder='Upload a photo'
                className='account-form_image-input'
                onChange={(e)=>handleImage(e,field.onChange)}
              />
            </FormControl>
           
            <FormMessage />
          </FormItem>
          
        )}
      />
       <FormField

control={form.control}
name="name"
render={({ field }) => (
  <FormItem className='flex items-center gap-3  w-full'>
    <FormLabel className='text-base-semibold text-light-2'>Name</FormLabel>

    <FormControl className='flex-1 text-base-semibold text-gray-200'>
      <Input
       type='text'
        placeholder='Upload a photo'
        className='account-form_input no-focus'
      
      />
    </FormControl>
   
    <FormMessage />
  </FormItem>
  
)}
/>
<FormField

control={form.control}
name="username"
render={({ field }) => (
  <FormItem className='flex items-center gap-3  w-full'>
    <FormLabel className='text-base-semibold text-light-2'>Username</FormLabel>

    <FormControl className='flex-1 text-base-semibold text-gray-200'>
      <Input
       type='text'
        placeholder='Give a unique username'
        className='account-form_input no-focus'
      
      />
    </FormControl>
   
    <FormMessage />
  </FormItem>
  
)}
/>
      <Button type="submit">Submit</Button>
    </form>
  </Form>
  )
}