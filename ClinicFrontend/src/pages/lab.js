import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import Lab from "../components/lab"
const LabPage = ({ match = {}, ...props}) => {
    // define the lab names    state
    const [labsNames, setlabsNames] = useState([])
    const [lab, setLab] = useState(null);
    // use react router history
    const history = useHistory();
    const loadData = (labName) => {
        fetch(`http://localhost:4000/api/labs/${labName ? labName : ""}`, {
            method: "GET"
        }).then((res) => res.json()).then((data) => {
            console.log(data)
            setlabsNames(data.labsNames);
            if(data.lab) {
                setLab(data.lab)
            } else {
                setLab(null);
            }      
        }).catch(err => {console.log(err)})
    }
    useEffect(() => {
        loadData(match.params.labName);
    }, [])
    // handle on the section is changed
    const onSelectionChange = (e) => {
        // get the lab name from the select element
        let labName = e.target.value;
        history.push(`/labs/${labName}`);
        // call load data function
        loadData(labName);
    }
    return (
        <div>
            <u> <h1>Labs</h1> </u>
      <section className="default-section">
          <div className="information">
              <select value={lab && lab.lab_name === match.params.labName ? lab.lab_name : ""} name="nameoflabs" onChange={onSelectionChange}>
                {labsNames.map((labName) => {
                    return <option key={labName} value={labName}>{labName}</option>
                })}
            </select>
              </div>
      </section> 
      
     <Lab lab={lab}/>
                  </div>
    )
}


export default LabPage;