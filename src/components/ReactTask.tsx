import { useEffect, useState } from "react";

export default function ReactTask() {
  const [data, setData] = useState(5);
  const [set1Boxes, setSet1Boxes] = useState(
    [...new Array(data)].map((item) => false)
  );
  const [set2Boxes, setSet2Boxes] = useState(
    [...new Array(data)].map((item) => false)
  );
  const [set1, setSet1] = useState(false);
  const [set2, setSet2] = useState(false);

  const [setAll, setSetAll] = useState(false);

  const handleChangeAll = () => {
    setSetAll((prev) => {
      const newVal = !prev;
      setSet1(() => newVal);
      setSet2(() => newVal);
      setSet1Boxes((prevArray) => prevArray.map(() => newVal));
      setSet2Boxes((prevArray) => prevArray.map(() => newVal));
      console.log(newVal);
      return newVal;
    });
  };

  function handleChangeSet1(): void {
    setSet1((prev) => {
      const newVal = !prev;
      setSet1(() => newVal);
      setSet1Boxes((prevArray) => prevArray.map(() => newVal));
      console.log(newVal);
      return newVal;
    });
  }

  function handleChangeSet2(): void {
    setSet2((prev) => {
      const newVal = !prev;
      setSet2(() => newVal);
      setSet2Boxes((prevArray) => prevArray.map(() => newVal));
      console.log(newVal);
      return newVal;
    });
  }

  function handleChangeBox1(index: number): void {
    setSet1Boxes((prevArray) =>
      prevArray.map((item, indx) => (indx == index ? !item : item))
    );
  }

  function handleChangeBox2(index: number): void {
    setSet2Boxes((prevArray) =>
      prevArray.map((item, indx) => (indx == index ? !item : item))
    );
  }

  useEffect(() => {
    if (set1 && set2) setSetAll(() => true);
    else setSetAll(() => false);

    if (set1Boxes.every((item) => item == true)) {
      setSet1(() => true);
    } else {
      setSet1(() => false);
    }
    if (set2Boxes.every((item) => item == true)) {
      setSet2(() => true);
    } else {
      setSet2(() => false);
    }
  }, [set1, set2, set1Boxes, set2Boxes]);

  return (
    <div>
      <form action="">
        <label htmlFor="">
          Select All
          <input
            type="radio"
            checked={setAll}
            onChange={handleChangeAll}
            name="sa"
            id=""
          />
        </label>
        <br />
        <label htmlFor="">
          Select Set 1
          <input
            type="radio"
            value={1}
            onChange={handleChangeSet1}
            checked={set1}
            name="s1"
            id=""
          />
        </label>
        <br />

        {set1Boxes.map((item, indx) => (
          <>
            <label htmlFor="">
              {item + ""}
              <input
                key={indx + "set1"}
                type="radio"
                onChange={() => handleChangeBox1(indx)}
                checked={set1Boxes[indx]}
                name={indx + "set1"}
                id=""
              />
            </label>
            <br />
          </>
        ))}
        <label htmlFor="">
          Select Set 2
          <input
            type="radio"
            value={1}
            onChange={handleChangeSet2}
            checked={set2}
            name="s2"
            id=""
          />
        </label>
        <br />
        {set2Boxes.map((item, indx) => (
          <>
            <label htmlFor="">
              {item + ""}
              <input
                key={indx + "set2"}
                type="radio"
                onChange={() => handleChangeBox2(indx)}
                checked={set2Boxes[indx]}
                name={indx + "set2"}
                id=""
              />
            </label>
            <br />
          </>
        ))}
      </form>
    </div>
  );
}
