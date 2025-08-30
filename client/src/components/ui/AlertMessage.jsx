import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { CheckCircle2Icon, AlertCircleIcon } from "lucide-react";

const AlertMessage = ({ type, title, description }) => {
  if (!type) return null; 

  return (
    <Alert variant={type === "error" ? "destructive" : "default"}>
      {type === "success" ? (
        <CheckCircle2Icon className="h-5 w-5" />
      ) : (
        <AlertCircleIcon className="h-5 w-5" />
      )}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default AlertMessage;
