import React, { use } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../Context/AuthContext'
import { Link } from 'react-router'

export default function SignUp() {

 const {createUser,signInWithGoogle}=use(AuthContext) 
const {register,formState:{errors},handleSubmit}=useForm()

const handleGoogleSignIn =()=>{
signInWithGoogle().
then(result=>{
  console.log(result.user)
}).catch(error=>{
  console.log(error)
})
}
const submit =(data)=>{
createUser(data.email,data.password)
.then(result=>{
  console.log(result)
})
.catch(error=>{
  console.error(error)
})

}
  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-400px)] my-20'>
   <form onSubmit={handleSubmit(submit)}>
    <h1 className="text-4xl font-bold">Register now!</h1>
    <fieldset className="fieldset">
          <label className="label">Name</label>
          <input type="text" required  className="input w-80" placeholder="Name" />
         <label className="label">Email</label>
          <input {...register('email',{
            required:true,

          })} type="email" className="input w-80" placeholder="Email" />
          {
            errors.email?.type == 'required'&& <p className='text-red-500'>Email is requird</p>
          }
          <label className="label">Password</label>
          <input {...register('password',{
            required:true,
            minLength:6
          })} type="password" className="input" placeholder="Password" />
          {
            errors.password?.type == 'required'&& <p className='text-red-500'>password is requird</p>
          }
          {
            errors.password?.type == 'minLength'&& <p className='text-red-500'>password must be 6 charecter or longer</p>
          }
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Register now</button>
        </fieldset>
        <p>
          <small>Already have an account? <Link to='/signin' className='btn btn-link'>login</Link></small>
        </p>
        <button onClick={handleGoogleSignIn} className="btn w-full bg-white text-black border-[#e5e5e5]">
       <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
      Login with Google
      </button>
   </form>
    </div>
  )
}
