import { Hashing as hsh } from "./hashing";
( async()=>{
    const value =  hsh.Hash("password")
  const val= await hsh.CheckHash("pass@admin","$2b$10$SOhAUUjOmjWyfOcBM1yJYOrjzwfN8BNhoCSrajy97hxkymA0tMvqy")
 console.log(val , "   ", await value)
})();

