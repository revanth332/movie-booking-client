import { useState } from "react"

export default function ReactTask() {
    const [data,setData] = useState(5);
    const [set1Boxes,setSet1Boxes] = useState([...new Array(data)].map(item => false))
    const [set2Boxes,setSet2Boxes] = useState([...new Array(data)].map(item => false))
    const [set1,setSet1] = useState(false);
    const [set2,setSet2] = useState(false);

    const [setAll,setSetAll] = useState(false)

    const handleChange = () => {
        if(setAll){
            setSet1(true)
            setSet2(true)
        }
    }

  return (
    <div>
        <form action="">
        <label htmlFor="">
            Select All
        <input type="radio" checked={setAll} onClick={handleChange} name="sa" id="" />
        </label><br />
        <label htmlFor="">
            Select Set 1
        <input type="radio" value={1} onClick={() => setSet1(item => !item)} checked={set1} name="s1" id="" />
        </label><br />

        {
            set2Boxes.map((item,indx) => <>
            <label htmlFor="">
            {set2Boxes[indx]+""}
            <input key={indx+"set1"} type="radio" onClick={() => setSet1(item => !item)} checked={set1} name={indx+"set1"} id="" />
            </label><br />
            </>)
        }   
        <label htmlFor="">
            Select Set 2
        <input type="radio" value={1} onClick={() => setSet2(item => !item)} checked={set2} name="s2" id="" />
        </label><br />
                {
            set1Boxes.map((item,indx) => <>
            <label htmlFor="">
            {set1Boxes[indx]+""}
            <input key={indx+"set2"} type="radio" onClick={() => setSet2(item => !item)} checked={set2} name={indx+"set2"} id="" />
            </label><br />
            </>)
        }
        </form>
    </div>
  )
}
