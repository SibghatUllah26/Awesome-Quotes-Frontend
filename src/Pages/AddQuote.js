import QuoteForm from "../components/quotes/QuoteForm"
import {useHistory} from "react-router-dom"
import useHttp from "../hooks/use-http";
import {newQuote} from "../lib/api"
import { useEffect } from "react";
function AddQuote(){
    const {sendRequest,status} = useHttp(newQuote);
    const history = useHistory()
    useEffect(()=>{
      if(status === 'completed'){
     // history.push will send you to the mentioned page and you can go back as if i use history.replace we cant go back.
        history.push("/quotes")
      }
    },[status, history])
    function addQuote(quote){
        console.log(quote);
        sendRequest(quote);
    }
    return(
     <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuote}/>
    )
}
export default AddQuote;