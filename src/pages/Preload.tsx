import React, { useEffect, useState } from "react";
import { LoadingScreen } from "pages/LoadingScreen/LoadingScreen";
import { getUserName } from "Utility/user";

interface PreloadProps {}

export const Preload: React.FC<PreloadProps> = ({}) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      setIsFetching(true);
      let userRes = await getUserName();
      // console.log(userRes.error !== undefined);
      setIsFetching(false);
    })();
  }, []);
  if (isFetching) {
    return <LoadingScreen></LoadingScreen>;
  } else {
    return <div className="Preload"></div>;
  }
};
