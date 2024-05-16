import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import AlertModal from "./modal/AlertModal.js";
import Input from "./ui/Input.js";

export function RefComponent() {
  const alertModalRef = useRef();
  const completeModalRef = useRef();

  const [item, setItem] = useState([]);
  const itemRef = useRef();

  const onClickHandler = () => {
    const itemValue = itemRef.current.get();

    if (itemValue === "") {
      console.dir(alertModalRef.current);
      alertModalRef.current.open();

      itemRef.current.select();
      return;
    }

    /**
     * 제일 최신것이 마지막으로 가게 하는것
     * item = []
     * item[0] = "A";
     * item[1] = "B";
     * item[2] = "C";
     * item[3] = "D";
     *
     * const len = item.length - 1; // 3
     * item[item.length -1]
     */
    setItem((prevState) => [itemValue, ...prevState]);

    completeModalRef.current.open();

    itemRef.current.set("");
    itemRef.current.select();
  };

  const onCloseModalHandler = () => {
    alertModalRef.current.close();
    itemRef.current.select();
  };

  const onCloseCompleteModalHandler = () => {
    completeModalRef.current.close();
    itemRef.current.select();
  };

  return (
    <div className="main-container">
      <Input id="text" type="text" title="TEXT" ref={itemRef} />
      <button onClick={onClickHandler}>Save</button>
      <hr />
      <ul>
        {item.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      {createPortal(
        <AlertModal
          onClose={onCloseCompleteModalHandler}
          ref={completeModalRef}
        >
          <div>
            <h3>{item[0]}을 입력했습니다.</h3>
          </div>
        </AlertModal>,
        document.querySelector("#modals")
      )}
      {createPortal(
        <AlertModal onClose={onCloseModalHandler} ref={alertModalRef}>
          <div>
            <h3>텍스트를 입력하세요!</h3>
          </div>
        </AlertModal>,
        document.querySelector("#modals")
      )}
    </div>
  );
}
