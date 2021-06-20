import React, { createRef,useState } from "react";
import {Link} from "react-router-dom"
const serverHost = "http://localhost:4000"

const Lab = ({lab}) => {
    const[errorMessage,setErrorMassege]=useState(null);
    const[successMessage,setSuccessMessage]=useState(null);
    const textArea =  createRef();

    const onFormSubmit=(e) => {
      e.preventDefault();
      const textAreaValue=textArea.current.value;
      if(textAreaValue.trim().length >0 && lab){
      let body={require_sam:textAreaValue,lab_name:lab.lab_name,lab_phone:lab.lab_phone}
      fetch(`${serverHost}/labs/message`,{
          method:"POST",
          body:JSON.stringify(body)
      }).then(res =>res.json()).then(()=> {
          setSuccessMessage("email was sent")
      }).catch(err =>{
          setErrorMassege("failed to sent ")
      })
      }
else{
    setErrorMassege("you have to write the message")
}
    
    }
    return (
        <React.Fragment>
        <section className="default-section">
            {successMessage ? 
            <p className="alert alert-success">{successMessage}</p>
            : null
            }
            {errorMessage ? 
            <p className="alert alert-error">{errorMessage}</p>
            : null
            }
        </section>
        <section className="default-section">
          {lab ? 
          <React.Fragment>
            <div className="info-section">
                <div className="info-item">
                    <img src={serverHost + "/public/images/name.png"} alt= "Avatar"/> 
                    <span>{ lab.lab_name} </span>
                </div>
                <div className="info-item">
                    <img src={serverHost + "/public/images/address.png"} alt= "Avatar"/>
                    <span>{ lab.address }</span>
                </div>
                <span className="horizintal-line"></span>
                <div className="info-item">
                    <img src={serverHost + "/public/images/phone.png"} alt= "Avatar"/>  
                    <span>{ lab.phone }</span>
                </div>
                <div className="info-item">
                    <img src={serverHost + "/public/images/email.png"} alt= "Avatar"/>
                    <span>{ lab.email }</span>
                </div>
                <span className="horizintal-line"></span>
                <div className="info-item">
                    <img src={serverHost + "/public/images/service.png"} alt= "Avatar" style={{width:"45px", borderRadius:"50px" ,borderBottom:"1px solid rgb(24, 23, 23)"}}/>
                    <span><Link to="/labs/service/{ lab.phone }"> services </Link></span>
                </div>
                <div className="info-item">
                    <img src={serverHost + "/public/images/requiredsample.png"} alt= "Avatar"/>
                    <span><Link to="/labs/Requiredsample/{ lab.phone }"> Required Sample </Link> </span>
                </div>
              </div>
              <form method="POST" onSubmit={onFormSubmit}>
                <p style={ {width: "20%",
                padding: "12px",
                border: "1px solid rgb(24, 23, 23)",
                borderRadius: "20px",
                boxSizing: "border-box",
                color: "black",
                backgroundColor: "#5a5959",
                marginTop: "6px",
                marginBottom: "16px"}}>  Send Message </p><br/> 
                <input hidden required name="lab_phone" value="{ lab.phone }"/>
                <input hidden required name="lab_name" value="{ lab.lab_name }"/>
                <label> Write the Massege...</label>
                  <textarea ref={textArea} style={{height:"150px" ,width:"700px"}} required name="require_sam" id="require_sam"/> 
                  <input type ="submit" value="send" style={{borderRadius: "20px", color: "blue", width: "70px", height: "40px"}}/>
              </form>
              </React.Fragment>
              :<p>No Selected Lab to show</p>
    }
      </section>
       </React.Fragment>
    )
}

export default Lab;