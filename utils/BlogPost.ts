export async function BlogPosts(){
     try {
        
        const res = await fetch("/api/post");
        if (!res.ok) {
            new Error("Failed to fetch");
        }

        return await res.json();

     } catch (error) {
        console.log(error)
     }
}