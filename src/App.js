import React,{Suspense} from "react"
import {Route,Switch, Redirect} from "react-router-dom"
// import AddQuote from "./Pages/AddQuote";
import AllQuotes from "./Pages/AllQuotes";
// import DetailQuote from "./Pages/DetailQuote";
import Layout from "./components/layout/Layout";
// import NoPageFound from "./Pages/NoPageFound";
import LoadingSpinner from "./components/UI/LoadingSpinner";

// we can also add all quotes lazy loading as well.
const AddQuote = React.lazy(()=>import("./Pages/AddQuote"))
const DetailQuote = React.lazy(()=>import("./Pages/DetailQuote"))
const NoPageFound = React.lazy(()=>import("./Pages/NoPageFound"))
function App() {

  return (
    <div>
    <Layout>
    <Suspense fallback={
      <div className="centered">
       <LoadingSpinner/>
      </div>
    }>
    <Switch>
    <Route path="/" exact>
    <Redirect to="quotes"/>
    </Route>
    <Route path="/quotes" exact>
    <AllQuotes/>
    </Route>
    <Route path="/addQuote">
    <AddQuote/>
    </Route>
    <Route path="/quotes/:newQuote">
    <DetailQuote/>
    </Route>
    <Route path="*">
      <NoPageFound/>
    </Route>
    </Switch>
    </Suspense>
    </Layout>
    </div>
  );
}

export default App;
