// const AWESOME_QUOTE_DOMAIN = 'http://localhost:5000';
const AWESOME_QUOTE_DOMAIN = 'https://awesome-quotes-backend.up.railway.app';

export async function getAllQuotes() {
  const response = await fetch(`${AWESOME_QUOTE_DOMAIN}/quotes`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch quotes.');
  }

  const transformedQuotes = [];

  for (const key in data) {
    const quoteObj = {
      id: key,
      ...data[key],
    };

    transformedQuotes.push(quoteObj);
  }

  return transformedQuotes;
}

export async function getSingleQuote(newQuote) {
  const response = await fetch(`${AWESOME_QUOTE_DOMAIN}/quotes/${newQuote}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch quote.');
  }

  const loadedQuote = {
    id: newQuote,
    ...data,
  };

  return loadedQuote;
}

export async function newQuote(quoteData) {
  const response = await fetch(`${AWESOME_QUOTE_DOMAIN}/postQuote`, {
    method: 'POST',
    body: JSON.stringify(quoteData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not create quote.');
  }

  return null;
}

export async function addComment(requestData) {

  const response = await fetch(`${AWESOME_QUOTE_DOMAIN}/${requestData.quoteId}/comments`, {
    method: 'POST',
    body: JSON.stringify(requestData.commentData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not add comment.');
  }

  return { commentId: data.name };
}

export async function getAllComments(quoteId) {
  const response = await fetch(`${AWESOME_QUOTE_DOMAIN}/${quoteId}/comments`);

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Could not get comments.');
  }

  const transformedComments = [];

  for (const key in data) {
    const commentObj = {
      id: key,
      ...data[key],
    };

    transformedComments.push(commentObj);
  }

  return transformedComments;
}
