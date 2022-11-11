import { useEffect } from "react";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import QuoteList from "../components/quotes/QuoteList"
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import {getAllQuotes} from "../lib/api"
function AllQuotes(){
//     const dummyQuotes=[{
//         id:"a1",
//         author:"Steven Pressfield",
//         text:"Start before you’re ready."
//     },{
//         id:"a2",
//         author:"Jodi Picoult",
//         text:"You can always edit a bad page. You can’t edit a blank page"
//     },
//     {
//         id:"a3",
//         author:"Robert Frost",
//         text:"I have never started a poem yet whose end I knew. Writing a poem is discovering."
//     },
// ]
const {sendRequest, status , data:loadedQuotes, error} = useHttp(getAllQuotes, true);
useEffect(()=>{
  sendRequest();
}, [sendRequest])
if (status === 'pending'){
    return (
    <div className="centered">
     <LoadingSpinner/>
    </div>
    )
}
if (error){
    return(<p className="centered focused">{error}</p>)
}
if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)){
    return <NoQuotesFound/>
}
    return(
        <QuoteList quotes ={loadedQuotes}/>
    )
}
export default AllQuotes;