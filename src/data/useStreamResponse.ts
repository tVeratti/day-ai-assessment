import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

const useStreamResponse = (response: Response | undefined) => {
  const [text, setText] = useState<string>("");
  const [isReading, setIsReading] = useState<boolean>(false);

  const reset = () => setText("");

  useEffect(() => {
    if (response?.body) {
      setText("");

      // Stream the response and save the text delta
      const reader = response.body.getReader();
      const readStream = async () => {
        try {
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              flushSync(() => {
                setIsReading(false);
              });
              break;
            }

            const delta = new TextDecoder().decode(value);
            setText((prevText: string) => prevText + delta);
          }
        } catch (err) {
          // TODO: Add error handling
        } finally {
          setIsReading(false);
          reader.releaseLock();
        }
      };

      readStream();

      return () => {
        reader.cancel();
      };
    }
  }, [response]);

  return { text, isReading, reset };
};

export default useStreamResponse;
