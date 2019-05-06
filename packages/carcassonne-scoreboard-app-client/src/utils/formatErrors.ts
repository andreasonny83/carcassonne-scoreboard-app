import get from 'lodash/get';
import { ApolloError } from 'apollo-client';
import { GraphQLError } from 'graphql';

interface CustomGraphQLError extends GraphQLError {
  errorId: string;
}

interface CustomApolloError extends ApolloError {
  graphQLErrors: ReadonlyArray<CustomGraphQLError>;
}

interface FormattedError {
  errorId: string;
  message: string;
}

export const formatErrorAndLog = (err: CustomApolloError): FormattedError => {
  let formattedError: FormattedError;

  if (err.networkError) {
    formattedError = {
      errorId: err.networkError.name,
      message: err.networkError.message,
    };
  } else if (get(err, 'graphQLErrors[0]')) {
    formattedError = {
      errorId: err.graphQLErrors[0].errorId,
      message: err.graphQLErrors[0].message,
    };
  } else {
    formattedError = {
      errorId: 'undefined error id',
      message: err.message || String(err),
    };
  }

  console.error('Error', formattedError);

  return formattedError;
};
