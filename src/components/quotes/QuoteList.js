import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';
const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  
  const history = useHistory();
  // use Location tells us about the location object of the URL
  const location =useLocation()
  // const queryParams = new URLSearchParams(location.search)
  const queryParams = location.search;
  // const isAscending = queryParams.get('sort') === 'asc';
  const isAscending = queryParams === '?sort=asc';
  const sortedQuotes = sortQuotes(props.quotes, isAscending)
  function clickHandler(){
    history.push(`${location.pathname}?sort=${(isAscending?"desc":"asc")}`)
  }
  return (
    <Fragment>
    <div className={classes.sorting}>
     <button onClick={clickHandler}>Sort {isAscending?"Descending":"Ascending"}</button>
    </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote._id}
            author={quote.author}
            text={quote.quote}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
