import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import Insurance from "../components/insurance"
const InsurancePage = ({ match = {}, ...props}) => {
    // define the insurance names    state
    const [insurancesNames, setInsurancesNames] = useState([])
    const [insurance, setInsurance] = useState(null);
    // use react router history
    const history = useHistory();
    const loadData = (insuranceName) => {
        fetch(`http://localhost:4000/api/company/${insuranceName ? insuranceName : ""}`, {
            method: "GET"
        }).then((res) => res.json()).then((data) => {
            console.log(data)
            setInsurancesNames(data.insurancesNames);
            if(data.insurance) {
                setInsurance(data.insurance)
            } else {
                setInsurance(null);
            }      
        }).catch(err => {console.log(err)})
    }
    useEffect(() => {
        loadData(match.params.insuranceName);
    }, [])
    // handle on the section is changed
    const onSelectionChange = (e) => {
        // get the insurane name from the select element
        let insuranceName = e.target.value;
        history.push(`/insurancecompanys/${insuranceName}`);
        // call load data function
        loadData(insuranceName);
    }

    return (
        <div>
            <u> <h1>Insurance Company</h1> </u>
      <section className="default-section">
          <div className="information">
          <select value={insurance && insurance.insurance_name === match.params.insuranceName ? insurance.insurance_name : ""} name="nameofinsurance" onChange={onSelectionChange}>
                {insurancesNames.map((insuranceName) => {
                    return <option key={insuranceName} value={insuranceName}>{insuranceName}</option>
                })}
            </select>
              </div>
      </section> 
      <Insurance insurance={insurance}/>
     
                  </div>
    )
}


export default InsurancePage;