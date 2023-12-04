import { Skeleton } from "@/components/ui/skeleton";
import "./Loader.scss";

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
