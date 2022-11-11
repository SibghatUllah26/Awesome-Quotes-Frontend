import {useParams} from "react-router-dom"
import {Route} from "react-router-dom"
import { Link, useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import Comments from "../components/comments/Comments"
import HighlightedQuote from "../components/quotes/HighlightedQuote"
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import useHttp from "../hooks/use-http";
import {getSingleQuote} from "../lib/api"
import LoadingSpinner from "../components/UI/LoadingSpinner";
function DetailQuote(){
    const match =useRouteMatch();

    const params = useParams();
    const {newQuote} = params

    const {sendRequest, status, data:loadedQuote, error}= useHttp(getSingleQuote, true)
    useEffect(()=>{
     sendRequest(newQuote)
    }, [sendRequest, newQuote]);
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

// const quote =  dummyQuotes.find(quote => quote.id === params.newQuote)
if (!loadedQuote.quote){
    return <NoQuotesFound/>
}

    return(
        <>
        <HighlightedQuote text = {loadedQuote.quote} author ={loadedQuote.author}/>
        <Route path={match.path} exact>
        <div className="centered">
        <Link className="btn--flat" to={`${match.url}/comments`}>Load Comments</Link>
        </div>
        </Route>
        {/* <Route path={`/quotes/${params.newQuote}/comments`}> */}
        <Route path={`${match.path}/comments`}>
            <Comments/>
        </Route>
        </>
    )
}
export default DetailQuote;