import React, { useState } from 'react'
import axios from 'axios'
const App = () => {

  const [data, setdata] = useState(null)
  const [repos, setrepos] = useState([])
  const [search, setsearch] = useState("")
  const [loading, setloading] = useState(false)



const getdata= async ()=>{
  try{
 const response= await axios.get(`https://api.github.com/users/${search}`)
 setdata(response.data)
 console.log(response.data)

const reporesponse=await axios.get( `https://api.github.com/users/${search}/repos`)
console.log(reporesponse.data)
setrepos(reporesponse.data)
  }catch(err){
    console.log(err)
  }finally{
    setloading(false)
  }
}

  return (
    <div className=' min-h-screen  bg-[#0D1117] p-10 '>
     
     
      
    <div className='flex items-centre justify-between'>
     
     
  <h1 className='text-white text-2xl font-bold '>GITHUB PROFILE FINDER</h1>
      <input type="text" placeholder='search any github profile'
       className='w-100 h-10 rounded-xl border border-2 bg-gray-500 p-4 '
      value={search}
      onChange={(e)=>{
        setsearch(e.target.value)
      }}
      />

      <button className='w-35 h-10 bg-red-800 rounded-xl text-white px-3 py-2 ml-5 mr-8 active:scale-105' onClick={()=>{
getdata()
      }}>Get user</button>
      
      
      

</div>

{loading && (

   <div className="flex justify-center mt-10">
    <div className="w-12 h-12 border-4 border-gray-500 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
)}





{data && (
  <div className='p-6  flex justify-between items-centre bg-[#161B22] border-[#30363D] text-white mt-5'>
    <div className='flex flex-col '>
 <img
      src={data.avatar_url}
      alt={data.login}
      className="w-25 rounded-full"
    />
    </div>

    <div className='text-xl font-bold'>
    <h1> Name: {data.name || data.login}</h1>
   <br />

    <h1> Bio : {data.bio || "no bio available"}</h1>
    <br />
    <h1> Location: {data.location ||"not found"}</h1>
     </div>

     <div className='flex flex-col gap-6'>
     

    <p className='text-xl font-bold'> Followers: {data.followers}</p>
    
    <p className='text-xl font-bold'> Following: {data.following}</p>
    <p className='text-xl font-bold'>Total repos : {data.public_repos}</p>
    
  
    
</div>
  </div>
)}



<div className='grid grid-cols-3 gap-4 mt-6'>
{repos.map((repo)=>{
  <h1 className='text-2xl text-white'>REPOSITORIES</h1>
 
  return(
    
     
  <div  key={repo.id} className='p-6  w-full   bg-[#161B22] border-[#30363D] text-white rounded-xl '>
  
    <h1 className='font-bold text-gray-400 '> ID:  {repo.id}</h1>
   
    <h1 className='font-bold text-white  mt-3'> Name:  {repo.name}</h1>
    <p className='font-bold text-gray-400 '> language: {repo.language || "Not specified"}</p>
    
    <p className='font-bold text-gray-400 mt-3'> Description:   {repo.description}</p>

<a href={repo.html_url} target='_blank' className='text-blue-400 underline'>View repository</a>

  </div>
  )
})}
</div>

    
    </div>
  )
}

export default App
