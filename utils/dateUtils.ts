export const DateUtils = (value: string) =>{
   try { 
      
   const date  =  new Date(value);

    const formatedDate = date.toLocaleString("en-US",{
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    
    return formatedDate;
    
   } catch (error) {
      console.log(error)
   }
}