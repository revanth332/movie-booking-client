import { useEffect, useState } from "react";

export default function ReactTask() {
  const [data, setData] = useState<{ set1: string[]; set2: string[] }>({
    set1: [],
    set2: [],
  });
  const [set1Boxes, setSet1Boxes] = useState(
    [...new Array(5)].map((item) => false)
  );
  const [set2Boxes, setSet2Boxes] = useState(
    [...new Array(5)].map((item) => false)
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
    setData(() => {
      data["set1"] = [...new Array(5)].map((_, indx) => "set1" + indx);
      data["set2"] = [...new Array(5)].map((_, indx) => "set2" + indx);
      return data;
    });

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data);
    console.log(data.set1.filter((item, indx) => set1Boxes[indx] === true));
    console.log(data.set2.filter((item, indx) => set2Boxes[indx] === true));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          Select All
          <input
            type="radio"
            checked={setAll}
            onClick={handleChangeAll}
            name="sa"
            id=""
            value={"sa"}
          />
        </label>
        <br />
        <label htmlFor="">
          Select Set 1
          <input
            type="radio"
            value={"set1"}
            onClick={handleChangeSet1}
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
                onClick={() => handleChangeBox1(indx)}
                checked={set1Boxes[indx]}
                name={indx + "set1"}
                value={data.set1[indx]}
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
            onClick={handleChangeSet2}
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
                onClick={() => handleChangeBox2(indx)}
                checked={set2Boxes[indx]}
                name={indx + "set2"}
                value={data.set2[indx]}
                id=""
              />
            </label>
            <br />
          </>
        ))}
        <button>submit</button>
      </form>
    </div>
  );
}
