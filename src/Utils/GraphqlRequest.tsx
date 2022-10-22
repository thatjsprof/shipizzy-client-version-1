import { isJSON } from "./Helpers";
import toast from "react-hot-toast";
import Lf from "./LocalForage/config";

export interface RQProps {
  variables: any;
}

export interface IRequestProps {
  payloadOptions?: RQProps;
  requestFunction: (props?: RQProps) => Promise<any>;
}

export interface IError {
  errors: Array<any>;
  networkError: string | null;
}

export interface IReturnResult {
  data: any | null;
  error: IError | null;
}

let initialReturnResult: IReturnResult = {
  data: null,
  error: null,
};

const MakeGraphQLRequest = async <ReturnType extends unknown>({
  payloadOptions,
  requestFunction,
}: IRequestProps) => {
  let initialResult = initialReturnResult;

  try {
    const data = await requestFunction({
      variables: payloadOptions?.variables,
    });

    initialResult = {
      error: null,
      data: data.data,
    };
  } catch (err: any) {
    initialResult = {
      data: null,
      error: null,
    };

    if (err.networkError) {
      initialResult = {
        ...initialResult,
        error: {
          errors: [],
          networkError: "There is a Server Connection Error",
        },
      };
    }

    const gqlErrors = err.graphQLErrors.map((error: any) => {
      let isMessage = error.message;

      if (isJSON(error.message)) {
        const parsedJSON = JSON.parse(error.message);
        isMessage = Array.isArray(parsedJSON)
          ? parsedJSON.map((val) => val.message)
          : error.message;
      }

      return isMessage;
    });

    const gqlErrorsFlat = gqlErrors.flat();

    if (gqlErrorsFlat.length > 0) {
      initialResult = {
        ...initialResult,
        error: {
          errors: gqlErrorsFlat,
          networkError: null,
        },
      };
    }
  } finally {
    return initialResult;
  }
};

export const checkError = async (error: IError | null) => {
  if (error) {
    const { networkError, errors } = error;

    if (networkError) {
      toast.error(networkError);
      Lf.removeItem("authToken");
    }

    if (errors) {
      if (errors[0] === "jwt expired") {
        Lf.removeItem("authToken");
      } else {
        errors.forEach((error) => toast.error(error));
      }
    }
  }

  return;
};

export default MakeGraphQLRequest;
