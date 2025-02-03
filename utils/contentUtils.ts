export const ContentUtils = (value: string) : {figure: string, description: string} => {

    // regular expressions
    const figregx = /src=\"(.*?)\"/;
    const desregx = /<p>(.*?)<\/p>/;

    try {
        
        const figurematch = value.match(figregx);
        const descriptionmatch = value.match(desregx);

        
        const figure = figurematch ? figurematch[1] : '';
        const description = descriptionmatch ? descriptionmatch[1].substring(0,150)+ "..." : '';

        return {figure,description}


    } catch (error) {
         console.log(error);
         return { figure: '', description: '' };
       
    }


   
}