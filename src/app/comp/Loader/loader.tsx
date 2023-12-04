import { Skeleton } from "@/components/ui/skeleton";
import "./Loader.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { Separator } from "@radix-ui/react-separator";

export const Loader = () => {
  return (
    <section className="loader">
      <Skeleton className="loader__img" />
      <Skeleton className="loader__content">
        <Skeleton className="loader__title" />
        <Skeleton className="loader__date" />
        <Skeleton className="loader__btn" />
      </Skeleton>
    </section>
  );
};

export const ProgressLoader = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <section className="progress-loader">
      <div className="custom-loader"></div>
      {children}
    </section>
  );
};

export const ErrorDisplay = () => {
  return (
    <section className="error">
      <h1 className="error__title">
        <FontAwesomeIcon icon={faWarning} className="mr-2" />
        Something went wrong
      </h1>
      <p className="error__text">Please try again later or refresh the page</p>
      <hr className="divider" />
      <p className="srr__msg">We apologize for any inconvenience</p>
    </section>
  );
};
